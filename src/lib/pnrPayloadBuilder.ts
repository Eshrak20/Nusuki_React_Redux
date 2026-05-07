import type { PnrFormState } from "@/pages/main/Flight/FlightBooking/BookingFlightPNR/PassengerForm";
import type { CreatePnrRequest } from "@/types/flight/flightBookingPNR.types";

type BuildPnrPayloadParams = {
  form: PnrFormState;
  flightId: string;
  searchId: string;
};

export const buildPnrPayload = ({
  form,
  flightId,
  searchId,
}: BuildPnrPayloadParams): CreatePnrRequest => {
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