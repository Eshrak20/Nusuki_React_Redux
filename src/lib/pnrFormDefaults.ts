import type { PnrFormState } from "@/pages/main/Flight/FlightBooking/BookingFlightPNR/PassengerForm";

export const initialPnrFormState: PnrFormState = {
  givenName: "",
  surname: "",
  dateOfBirth: "",
  gender: "M",
  passengerType: "ADT",
  travelerPhone: "",

  contactEmail: "",
  contactPhone: "",

  passportNumber: "",
  nationality: "BD",
  issuingCountry: "BD",
  passportExpiryDate: "",

  sendBookingEmail: true,
};