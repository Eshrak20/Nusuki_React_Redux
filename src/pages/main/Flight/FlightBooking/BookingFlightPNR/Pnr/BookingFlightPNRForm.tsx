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

  const safeInitialForm = useMemo<PnrFormState>(() => {
    const searchBasedTravellers = buildInitialPnrTravellers(searchTravelers);

    return {
      // Important:
      // Only create empty travellers from flight search count/type.
      // Do not merge logged-in user profile data here.
      travelers: searchBasedTravellers,

      // Important:
      // Keep contact fields empty.
      // User will type manually or select traveller from dropdown.
      contactPhone: "",
      contactEmail: "",

      sendBookingEmail: initialForm.sendBookingEmail ?? true,
      paymentMethod: initialForm.paymentMethod || "CK",
      receivedFrom: initialForm.receivedFrom || "NUSUKI WEB",

      saveTravellers: initialForm.saveTravellers ?? true,
    };
  }, [initialForm, searchTravelers]);

  const [form, setForm] = useState<PnrFormState>(safeInitialForm);

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
        <div className="rounded-sm border bg-card p-4">
          <h3 className="mb-4 text-base font-semibold text-card-foreground">
            Contact Information
          </h3>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">
                Contact Phone
              </label>
              <input
                type="tel"
                value={form.contactPhone}
                onChange={(event) =>
                  updateForm("contactPhone", event.target.value)
                }
                className="w-full rounded-sm border px-3 py-2"
                placeholder="+8801712345678"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Contact Email
              </label>
              <input
                type="email"
                value={form.contactEmail}
                onChange={(event) =>
                  updateForm("contactEmail", event.target.value)
                }
                className="w-full rounded-sm border px-3 py-2"
                placeholder="example@gmail.com"
              />
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <input
              id="saveTravellers"
              type="checkbox"
              checked={form.saveTravellers}
              onChange={(event) =>
                updateForm("saveTravellers", event.target.checked)
              }
              className="h-4 w-4"
            />

            <label
              htmlFor="saveTravellers"
              className="cursor-pointer text-sm font-medium"
            >
              Save traveller information for future booking
            </label>
          </div>
        </div>

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
