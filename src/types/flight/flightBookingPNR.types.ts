import type { Gender, PassengerType, Title } from "./myTravellers.types";

export type PaymentMethod = "CK" | "CA" | "CARD" | "BKASH" | "NAGAD";

export type TravelerPassport = {
  number: string;
  nationality: string;
  issuing_country: string;
  expiry_date: string;
};

export type PnrTraveler = {
  given_name: string;
  surname: string;
  title: Title;
  passenger_type: PassengerType;
  date_of_birth: string;
  gender: Gender;
  phone: string;
  passport: TravelerPassport;
};

export type PnrContact = {
  email: string;
  phone: string;
};

export type PnrPayment = {
  method: PaymentMethod | string;
};

export type CreatePnrRequest = {
  flight_id: string;
  search_id: string;
  travelers: PnrTraveler[];
  contact: PnrContact;
  send_booking_email: boolean;
  payment: PnrPayment;
  received_from: string;
  save_travellers: boolean;
};

export type CreatePnrResponse = {
  success: boolean;
  message: string;
  data?: {
    id?: number;
    booking_code?: string;
    pnr?: string;
    airline_pnr?: string | null;
    booking_status?: string;
    payment_status?: string;
    route?: string;
    trip_type?: string;
    travel_start_date?: string;
    travel_end_date?: string;
    ttl_at?: string;
  };
};