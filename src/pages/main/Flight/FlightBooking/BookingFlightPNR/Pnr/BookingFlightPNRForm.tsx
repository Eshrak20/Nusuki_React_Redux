import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCreatePnrMutation } from "@/redux/api/fligtBookingApi/flightBookingApi";

import PnrPassengerAccordion from "./PnrPassengerAccordion";
import PnrSubmitFooter from "./PnrSubmitFooter";
import type { PnrFormState } from "../PassengerForm";
import { buildPnrPayload } from "@/lib/pnrPayloadBuilder";
import PnrCreatingLoader from "../PnrCreatingLoader";

type BookingFlightPNRFormProps = {
  flightId: string;
  searchId: string;
  initialForm: PnrFormState;
};

const BookingFlightPNRForm = ({
  flightId,
  searchId,
  initialForm,
}: BookingFlightPNRFormProps) => {
  const navigate = useNavigate();

  const [form, setForm] = useState<PnrFormState>(initialForm);

  const [fileUploaded, setFileUploaded] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [fileName, setFileName] = useState("No file chosen");

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

  const isFormInvalid = useMemo(() => {
    return (
      !flightId ||
      !searchId ||
      !form.givenName ||
      !form.surname ||
      !form.dateOfBirth ||
      !form.travelerPhone ||
      !form.contactEmail ||
      !form.contactPhone ||
      !form.passportNumber ||
      !form.passportExpiryDate
    );
  }, [flightId, searchId, form]);

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

      console.log("PNR Payload:", JSON.stringify(payload, null, 2));

      const response = await createPnr(payload).unwrap();

      if (!response.success) {
        alert(response.message || "PNR creation failed.");
        return;
      }

      const bookingCode = response.data?.booking_code;
      const bookingId = response.data?.id;

      if (bookingCode) {
        navigate(`/dashboard/flight-bookings/${bookingCode}`);
        return;
      }

      if (bookingId) {
        navigate(`/dashboard/flight-bookings/${bookingId}`);
        return;
      }

      navigate("/dashboard/flight-bookings");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Create PNR Error:", error);

      const friendlyReason =
        error?.data?.data?.friendly_reason ||
        error?.data?.message ||
        "PNR creation failed. Please search again.";

      alert(friendlyReason);
    }
  };

  return (
    <>
      <PnrCreatingLoader show={isCreatingPnr} />

      <PnrPassengerAccordion
        form={form}
        fileUploaded={fileUploaded}
        fileName={fileName}
        isScanning={isScanning}
        setFileUploaded={setFileUploaded}
        setFileName={setFileName}
        setIsScanning={setIsScanning}
        updateForm={updateForm}
      />

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
