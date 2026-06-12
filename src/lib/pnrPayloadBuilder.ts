import type {
  CreatePnrPayload,
  PnrFormState,
} from "@/types/flight/myTravellers.types";

type BuildPnrPayloadArgs = {
  form: PnrFormState;
  flightId: string;
  searchId: string;
  includePassport?: boolean;
};

export const buildPnrPayload = ({
  form,
  flightId,
  searchId,
  includePassport = true,
}: BuildPnrPayloadArgs): CreatePnrPayload => {
  return {
    search_id: searchId,
    flight_id: flightId,

    travelers: form.travelers.map((traveller) => {
      const baseTraveller = {
        given_name: traveller.givenName.trim().toUpperCase(),
        surname: traveller.surname.trim().toUpperCase(),
        title: traveller.title,
        passenger_type: traveller.passengerType,
        gender: traveller.gender,
        date_of_birth: traveller.dateOfBirth,
        phone: traveller.travelerPhone,
      };

      if (!includePassport) {
        return baseTraveller;
      }

      return {
        ...baseTraveller,
        passport: {
          number: traveller.passportNumber.trim().toUpperCase(),
          nationality: traveller.passportNationality || traveller.nationality,
          issuing_country: traveller.passportIssuingCountry,
          expiry_date: traveller.passportExpiryDate,
        },
      };
    }),

    contact: {
      phone: form.contactPhone,
      email: form.contactEmail,
    },

    send_booking_email: form.sendBookingEmail,

    payment: {
      method: form.paymentMethod || "CK",
    },

    received_from: form.receivedFrom || "NUSUKI WEB",

    save_travellers: form.saveTravellers,
  };
};