import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useCreatePnrMutation } from "@/redux/api/fligtBookingApi/flightBookingApi";
import { useGetMyTravellersQuery } from "@/redux/api/flightApi/myTravellersApi";

import PnrPassengerAccordion from "./PnrPassengerAccordion";
import PnrSubmitFooter from "./PnrSubmitFooter";
import PnrCreatingLoader from "../PnrCreatingLoader";

import { buildPnrPayload } from "@/lib/pnrPayloadBuilder";
import { buildInitialPnrTravellers } from "@/lib/pnrTravelerUtils";

import type { RootState } from "@/redux/store";
import type {
  PnrFormState,
  PnrTravellerForm,
} from "@/types/flight/myTravellers.types";
import { setFlightBookingCode } from "@/redux/features/flightPaymentSlice";

type BookingFlightPNRFormProps = {
  flightId: string;
  searchId: string;
  initialForm: PnrFormState;
  showPassportFields: boolean;
  documentRequirementMessage?: string;
};

const getStringValue = (value: unknown): string => {
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  return "";
};

const BookingFlightPNRForm = ({
  flightId,
  searchId,
  initialForm,
  showPassportFields,
  documentRequirementMessage,
}: BookingFlightPNRFormProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const searchTravelers = useSelector(
    (state: RootState) => state.flightSearch.travelers,
  );

  const loggedUser = useSelector((state: RootState) => state.auth.user);

  const loggedUserPhone = useMemo(() => {
    const user = loggedUser as {
      phone?: unknown;
      phone_number?: unknown;
      mobile?: unknown;
    } | null;

    return (
      getStringValue(user?.phone) ||
      getStringValue(user?.phone_number) ||
      getStringValue(user?.mobile)
    );
  }, [loggedUser]);

  const loggedUserEmail = useMemo(() => {
    const user = loggedUser as {
      email?: unknown;
    } | null;

    return getStringValue(user?.email);
  }, [loggedUser]);

  const safeInitialForm = useMemo<PnrFormState>(() => {
    const searchBasedTravellers = buildInitialPnrTravellers(searchTravelers);

    return {
      travelers: searchBasedTravellers,

      contactPhone: loggedUserPhone || initialForm.contactPhone || "",
      contactEmail: loggedUserEmail || initialForm.contactEmail || "",

      sendBookingEmail: initialForm.sendBookingEmail ?? true,
      paymentMethod: initialForm.paymentMethod || "CK",
      receivedFrom: initialForm.receivedFrom || "NUSUKI WEB",

      saveTravellers: initialForm.saveTravellers ?? true,
    };
  }, [initialForm, searchTravelers, loggedUserPhone, loggedUserEmail]);

  const [form, setForm] = useState<PnrFormState>(() => safeInitialForm);

  const [fileUploaded, setFileUploaded] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [fileName, setFileName] = useState("No file chosen");

  const { data: savedTravellersResponse, isLoading: isLoadingSavedTravellers } =
    useGetMyTravellersQuery();

  const savedTravellers = savedTravellersResponse?.data || [];

  const [createPnr, { isLoading: isCreatingPnr }] = useCreatePnrMutation();

  const updateForm = <K extends keyof PnrFormState>(
    field: K,
    value: PnrFormState[K],
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateTraveller = <K extends keyof PnrTravellerForm>(
    travellerIndex: number,
    field: K,
    value: PnrTravellerForm[K],
  ) => {
    setForm((prev) => ({
      ...prev,
      travelers: Array.isArray(prev.travelers)
        ? prev.travelers.map((traveller, index) =>
            index === travellerIndex
              ? {
                  ...traveller,
                  [field]: value,
                }
              : traveller,
          )
        : [],
    }));
  };

  const replaceTraveller = (
    travellerIndex: number,
    traveller: PnrTravellerForm,
  ) => {
    setForm((prev) => ({
      ...prev,
      travelers: Array.isArray(prev.travelers)
        ? prev.travelers.map((item, index) =>
            index === travellerIndex
              ? {
                  ...traveller,
                  passengerType: item.passengerType,
                }
              : item,
          )
        : [],
    }));
  };

  const isFormInvalid = useMemo(() => {
    if (!flightId || !searchId) return true;

    if (!form.contactEmail || !form.contactPhone) return true;

    const travelers = Array.isArray(form.travelers) ? form.travelers : [];

    if (travelers.length === 0) return true;

    return travelers.some((traveller) => {
      const basicInfoMissing =
        !traveller.givenName ||
        !traveller.surname ||
        !traveller.title ||
        !traveller.passengerType ||
        !traveller.gender ||
        !traveller.dateOfBirth ||
        !traveller.travelerPhone;

      if (basicInfoMissing) return true;

      if (!showPassportFields) return false;

      return (
        !traveller.passportNumber ||
        !traveller.passportNationality ||
        !traveller.passportIssuingCountry ||
        !traveller.passportExpiryDate
      );
    });
  }, [flightId, searchId, form, showPassportFields]);

  const handleCreatePnr = async () => {
    if (isFormInvalid) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      const payload = buildPnrPayload({
        form,
        flightId,
        searchId,
      });

      const response = await createPnr(payload).unwrap();

      if (!response.success) {
        alert(response.message || "PNR create failed.");
        return;
      }

      const booking = response.data?.booking;

      if (!booking?.booking_code) {
        alert("Booking code not found from PNR response.");
        return;
      }

      dispatch(setFlightBookingCode(booking.booking_code));

      navigate("/dashboard/flight-bookings");
    } catch (error: unknown) {
      console.error("Create PNR Error:", error);

      const apiError = error as {
        data?: {
          data?: {
            friendly_reason?: string;
          };
          message?: string;
        };
      };

      const friendlyReason =
        apiError?.data?.data?.friendly_reason ||
        apiError?.data?.message ||
        "PNR creation failed. Please search again.";

      alert(friendlyReason);
    }
  };

  return (
    <>
      <PnrCreatingLoader show={isCreatingPnr} />

      <div className="space-y-6">
        <PnrPassengerAccordion
          form={form}
          savedTravellers={savedTravellers}
          isLoadingSavedTravellers={isLoadingSavedTravellers}
          fileUploaded={fileUploaded}
          fileName={fileName}
          isScanning={isScanning}
          setFileUploaded={setFileUploaded}
          setFileName={setFileName}
          setIsScanning={setIsScanning}
          updateTraveller={updateTraveller}
          replaceTraveller={replaceTraveller}
          showPassportFields={showPassportFields}
          documentRequirementMessage={documentRequirementMessage}
        />
      </div>
      <div className="rounded-sm border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-slate-950/70">
        <div className="mb-5">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Contact Information
          </h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            This contact information will be used for booking communication.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-600 dark:text-slate-300">
              Contact Phone
            </label>
            <input
              type="tel"
              value={form.contactPhone}
              onChange={(event) =>
                updateForm("contactPhone", event.target.value)
              }
              className="h-12 w-full rounded-sm border border-slate-200 bg-white px-4 text-sm text-slate-900 shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-slate-950 dark:text-white"
              placeholder="+8801712345678"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-600 dark:text-slate-300">
              Contact Email
            </label>
            <input
              type="email"
              value={form.contactEmail}
              onChange={(event) =>
                updateForm("contactEmail", event.target.value)
              }
              className="h-12 w-full rounded-sm border border-slate-200 bg-white px-4 text-sm text-slate-900 shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-slate-950 dark:text-white"
              placeholder="example@gmail.com"
            />
          </div>
        </div>

        <div className="mt-5 flex items-center gap-2 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 dark:border-white/10 dark:bg-slate-900/50">
          <input
            id="saveTravellers"
            type="checkbox"
            checked={form.saveTravellers}
            onChange={(event) =>
              updateForm("saveTravellers", event.target.checked)
            }
            className="h-4 w-4 accent-primary"
          />

          <label
            htmlFor="saveTravellers"
            className="cursor-pointer text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Save traveller information for future booking
          </label>
        </div>
      </div>
      <PnrSubmitFooter
        isCreatingPnr={isCreatingPnr}
        isScanning={isScanning}
        isFormInvalid={isFormInvalid}
        onSubmit={handleCreatePnr}
      />
    </>
  );
};

export default BookingFlightPNRForm;
