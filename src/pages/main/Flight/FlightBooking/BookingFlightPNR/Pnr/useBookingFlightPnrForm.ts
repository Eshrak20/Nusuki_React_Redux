import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useCreatePnrMutation } from "@/redux/api/fligtBookingApi/flightBookingApi";
import { useGetMyTravellersQuery } from "@/redux/api/flightApi/myTravellersApi";
import { setFlightBookingCode } from "@/redux/features/flightPaymentSlice";

import { buildPnrPayload } from "@/lib/pnrPayloadBuilder";
import { buildInitialPnrTravellers } from "@/lib/pnrTravelerUtils";
import { getApiErrorMessage } from "@/lib/getApiErrorMessage";

import type { RootState } from "@/redux/store";
import type {
  PnrFormState,
  PnrTravellerForm,
} from "@/types/flight/myTravellers.types";

import {
  dropdownLikeFields,
  getStringValue,
  getTravellerFieldKey,
  isEmpty,
  type MissingFieldTarget,
} from "./pnrFormHelpers";

type UseBookingFlightPnrFormParams = {
  flightId: string;
  searchId: string;
  initialForm: PnrFormState;
  showPassportFields: boolean;
};

const useBookingFlightPnrForm = ({
  flightId,
  searchId,
  initialForm,
  showPassportFields,
}: UseBookingFlightPnrFormParams) => {
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
  const [showValidationErrors, setShowValidationErrors] = useState(false);
  const [openTravellerAccordion, setOpenTravellerAccordion] =
    useState("traveller-0");
  const [autoOpenFieldKey, setAutoOpenFieldKey] = useState<string | null>(null);

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
    if (isEmpty(flightId) || isEmpty(searchId)) return true;

    if (isEmpty(form.contactEmail) || isEmpty(form.contactPhone)) return true;

    const travelers = Array.isArray(form.travelers) ? form.travelers : [];

    if (travelers.length === 0) return true;

    return travelers.some((traveller) => {
      const basicInfoMissing =
        isEmpty(traveller.givenName) ||
        isEmpty(traveller.surname) ||
        isEmpty(traveller.title) ||
        isEmpty(traveller.passengerType) ||
        isEmpty(traveller.gender) ||
        isEmpty(traveller.dateOfBirth) ||
        isEmpty(traveller.travelerPhone);

      if (basicInfoMissing) return true;

      if (!showPassportFields) return false;

      return (
        isEmpty(traveller.passportNumber) ||
        isEmpty(traveller.passportNationality) ||
        isEmpty(traveller.passportIssuingCountry) ||
        isEmpty(traveller.passportExpiryDate)
      );
    });
  }, [flightId, searchId, form, showPassportFields]);

  const getFirstMissingFieldTarget = (): MissingFieldTarget | null => {
    const travelers = Array.isArray(form.travelers) ? form.travelers : [];

    for (let index = 0; index < travelers.length; index++) {
      const traveller = travelers[index];

      const fieldsToCheck: Array<{
        field: keyof PnrTravellerForm;
        value?: string | null;
      }> = [
        { field: "title", value: traveller.title },
        { field: "givenName", value: traveller.givenName },
        { field: "surname", value: traveller.surname },
        { field: "gender", value: traveller.gender },
        { field: "dateOfBirth", value: traveller.dateOfBirth },
        { field: "travelerPhone", value: traveller.travelerPhone },
      ];

      if (showPassportFields) {
        fieldsToCheck.push(
          { field: "passportNumber", value: traveller.passportNumber },
          {
            field: "passportNationality",
            value: traveller.passportNationality,
          },
          {
            field: "passportIssuingCountry",
            value: traveller.passportIssuingCountry,
          },
          {
            field: "passportExpiryDate",
            value: traveller.passportExpiryDate,
          },
        );
      }

      const missingField = fieldsToCheck.find((item) => isEmpty(item.value));

      if (missingField) {
        const fieldKey = getTravellerFieldKey(index, missingField.field);

        return {
          accordionValue: `traveller-${index}`,
          fieldId: fieldKey,
          autoOpenKey: dropdownLikeFields.includes(missingField.field)
            ? fieldKey
            : null,
        };
      }
    }

    if (isEmpty(form.contactPhone)) {
      return {
        fieldId: "contactPhone",
        autoOpenKey: null,
      };
    }

    if (isEmpty(form.contactEmail)) {
      return {
        fieldId: "contactEmail",
        autoOpenKey: null,
      };
    }

    return null;
  };

  const scrollToMissingField = (fieldId?: string) => {
    if (!fieldId) return;

    window.setTimeout(() => {
      const targetElement = document.getElementById(fieldId);

      if (!targetElement) return;

      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      targetElement.focus();
    }, 150);
  };

  const openFirstMissingField = () => {
    const target = getFirstMissingFieldTarget();

    if (!target) return;

    setAutoOpenFieldKey(null);

    if (target.accordionValue) {
      setOpenTravellerAccordion(target.accordionValue);
    }

    window.setTimeout(() => {
      scrollToMissingField(target.fieldId);

      if (target.autoOpenKey) {
        setAutoOpenFieldKey(target.autoOpenKey);
      }
    }, 220);
  };

  const handleCreatePnr = async () => {
    setShowValidationErrors(true);

    if (isFormInvalid) {
      openFirstMissingField();
      return;
    }

    try {
      const payload = buildPnrPayload({
        form,
        flightId,
        searchId,
        includePassport: showPassportFields,
      });

      const response = await createPnr(payload).unwrap();

      if (!response.success) {
        alert(getApiErrorMessage(response, "PNR create failed."));
        return;
      }

      const booking = response.data?.booking;

      if (!booking?.booking_code) {
        alert("Booking code not found from PNR response.");
        return;
      }

      setShowValidationErrors(false);
      setAutoOpenFieldKey(null);

      dispatch(setFlightBookingCode(booking.booking_code));

      navigate("/dashboard/flight-bookings");
    } catch (error: unknown) {
      console.error("Create PNR Error:", error);

      const errorMessage = getApiErrorMessage(
        error,
        "PNR creation failed. Please search again.",
      );

      alert(errorMessage);
    }
  };

  return {
    form,
    showValidationErrors,

    openTravellerAccordion,
    setOpenTravellerAccordion,

    autoOpenFieldKey,
    setAutoOpenFieldKey,

    fileUploaded,
    setFileUploaded,

    isScanning,
    setIsScanning,

    fileName,
    setFileName,

    savedTravellers,
    isLoadingSavedTravellers,

    isCreatingPnr,
    isFormInvalid,

    updateForm,
    updateTraveller,
    replaceTraveller,
    handleCreatePnr,
  };
};

export default useBookingFlightPnrForm;