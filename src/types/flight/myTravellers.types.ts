export type PassengerType = "ADT" | "CHD" | "INF";
export type Gender = "M" | "F";
export type Title = "MR" | "MRS" | "MS" | "MSTR" | "MISS";

export type TravellerTitle = Title;
export type TravellerGender = Gender;

export type SavedTraveller = {
  id: number;
  passenger_type: PassengerType;
  title: Title;
  given_name: string;
  surname: string;
  gender: Gender;
  date_of_birth: string;
  phone: string | null;
  nationality: string | null;
  passport_no: string | null;
  passport_nationality: string | null;
  passport_issuing_country: string | null;
  passport_expire_date: string | null;
};

/**
 * Use same API response type everywhere.
 * Because GET api/my-travellers can return null values like phone, passport_no etc.
 */
export type MyTraveller = SavedTraveller;

export type PnrTravellerForm = {
  selectedSavedTravellerId: number | null;

  givenName: string;
  surname: string;
  title: Title;
  passengerType: PassengerType;
  gender: Gender;
  dateOfBirth: string;
  travelerPhone: string;

  passportNumber: string;
  nationality: string;
  passportNationality: string;
  passportIssuingCountry: string;
  passportExpiryDate: string;
};

export type PnrFormState = {
  travelers: PnrTravellerForm[];

  contactPhone: string;
  contactEmail: string;

  sendBookingEmail: boolean;
  paymentMethod: string;
  receivedFrom: string;

  saveTravellers: boolean;
};

export type MyTravellersResponse = {
  success: boolean;
  message: string;
  data: MyTraveller[];
};

export type MyTravellerResponse = {
  success: boolean;
  message: string;
  data: MyTraveller;
};

export type MyTravellerFormPayload = {
  passenger_type: PassengerType;
  title: Title;
  given_name: string;
  surname: string;
  gender: Gender;
  date_of_birth: string;
  phone: string;
  nationality: string;
  passport_no: string;
  passport_nationality: string;
  passport_issuing_country: string;
  passport_expire_date: string;
};

export type CreatePnrPayload = {
  search_id: string;
  flight_id: string;
  travelers: {
    given_name: string;
    surname: string;
    title: Title;
    passenger_type: PassengerType;
    gender: Gender;
    date_of_birth: string;
    phone: string;
    passport: {
      number: string;
      nationality: string;
      issuing_country: string;
      expiry_date: string;
    };
  }[];
  contact: {
    phone: string;
    email: string;
  };
  send_booking_email: boolean;
  payment: {
    method: string;
  };
  received_from: string;
  save_travellers: boolean;
};