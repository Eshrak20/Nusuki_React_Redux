import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { PnrFormState } from "./PassengerForm";
import type { CreatePnrRequest } from "@/types/flight/flightBookingPNR.types";
import { useCreatePnrMutation } from "@/redux/api/fligtBookingApi/flightBookingApi";
import BookingStepIndicator from "./BookingStepIndicator";
import PassengerForm from "./PassengerForm";

const initialFormState: PnrFormState = {
  givenName: "Eshrak",
  surname: "Gazi",
  dateOfBirth: "2004-04-24",
  gender: "M",
  passengerType: "ADT",
  travelerPhone: "01309176398",

  contactEmail: "eshrakg62@gmail.com",
  contactPhone: "01712131223",

  passportNumber: "A1234567",
  nationality: "BD",
  issuingCountry: "BD",
  passportExpiryDate: "2030-12-31",

  sendBookingEmail: true,
};
const BookingFlightPNR = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const flightId = searchParams.get("flight_id") ?? "";
  const searchId = searchParams.get("search_id") ?? "";

  const [form, setForm] = useState<PnrFormState>(initialFormState);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [fileName, setFileName] = useState("No file chosen");

  const [createPnr, { isLoading }] = useCreatePnrMutation();

  const updateForm = <K extends keyof PnrFormState>(
    field: K,
    value: PnrFormState[K],
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  // console.log("PNR query ids", {
  //   flightId,
  //   searchId,
  // });
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

  const buildPayload = (): CreatePnrRequest => {
    return {
      flight_id: flightId,
      search_id: searchId,
      travelers: [
        {
          given_name: form.givenName.trim(),
          surname: form.surname.trim(),
          passenger_type: form.passengerType,
          date_of_birth: form.dateOfBirth,
          gender: form.gender,
          phone: form.travelerPhone.trim(),
          passport: {
            number: form.passportNumber.trim().toUpperCase(),
            nationality: form.nationality,
            issuing_country: form.issuingCountry,
            expiry_date: form.passportExpiryDate,
          },
        },
      ],
      contact: {
        email: form.contactEmail.trim(),
        phone: form.contactPhone.trim(),
      },
      send_booking_email: form.sendBookingEmail,
      payment: {
        method: "CA",
      },
      received_from: "UTRAVEL WEB",
    };
  };

  const handleCreatePnr = async () => {
    if (isFormInvalid) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      const payload = buildPayload();

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
    <div className="mt-24 min-h-screen bg-background py-4 text-foreground md:py-8">
      <div className="mx-auto max-w-7xl space-y-8 px-4">
        <BookingStepIndicator />

        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            Add Passenger Details
          </h1>
          <p className="text-muted-foreground">
            Enter passenger information and create PNR booking
          </p>
        </div>

        {!flightId || !searchId ? (
          <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
            Missing flight_id or search_id. Please come from flight details
            page.
          </div>
        ) : null}

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Passenger Details</h2>

            <div className="flex items-center gap-2">
              <Label
                htmlFor="expand-all"
                className="cursor-pointer text-sm font-medium"
              >
                Expand All
              </Label>

              <Checkbox id="expand-all" checked onCheckedChange={() => {}} />
            </div>
          </div>

          <Accordion
            type="single"
            collapsible
            defaultValue="adult-1"
            className="w-full"
          >
            <AccordionItem
              value="adult-1"
              className="rounded-lg border bg-card"
            >
              <AccordionTrigger className="rounded-t-lg px-4 transition-colors hover:bg-muted/50 hover:no-underline">
                <span className="font-semibold uppercase text-card-foreground">
                  Adult 1: (12 + yrs)
                </span>
              </AccordionTrigger>

              <AccordionContent className="space-y-6 p-4">
                <PassengerForm
                  form={form}
                  fileUploaded={fileUploaded}
                  fileName={fileName}
                  isScanning={isScanning}
                  setFileUploaded={setFileUploaded}
                  setFileName={setFileName}
                  setIsScanning={setIsScanning}
                  updateForm={updateForm}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="border-t border-black/5 bg-[#eef1f5] px-6 py-4 dark:border-white/10 dark:bg-[#0b1220]">
          <div className="mx-auto flex max-w-7xl justify-center">
            <Button
              onClick={handleCreatePnr}
              disabled={isLoading || isScanning || isFormInvalid}
              className="h-11 min-w-[230px] rounded-md bg-[#17306f] px-8 text-[16px] font-bold text-white hover:bg-[#102558] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#1f4fa3] dark:hover:bg-[#1a438b]"
            >
              {isLoading ? "Creating PNR..." : "Next - Continue Booking"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingFlightPNR;
