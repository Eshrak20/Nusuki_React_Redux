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

export type CreatePnrBookingPricing = {
  currency: string;
  base_amount: string;
  tax_amount: string;
  total_amount: string;
};

export type CreatePnrBookingPassenger = {
  id: number;
  passenger_type: PassengerType | string;
  title: Title | string;
  given_name: string;
  surname: string;
  gender: Gender | string;
  date_of_birth: string;
  phone: string;
  email: string;
  passport_no: string;
};

export type CreatePnrBookingSegment = {
  id: number;
  segment_order: string;
  airline_code: string;
  airline_name: string;
  flight_number: string;
  origin: string;
  destination: string;
  departure_at: string;
  arrival_at: string;
  duration_minutes: number;
  booking_class: string;
  cabin_class: string | null;
  baggage: string | null;
};

export type CreatePnrBooking = {
  id: number;
  booking_code: string;
  pnr: string;
  airline_pnr: string | null;
  route: string;
  trip_type: string;
  travel_start_date: string;
  travel_end_date: string;
  cabin_class: string;
  traveller_count: number;
  booking_status: string;
  payment_status: string;
  is_ticketable: boolean;
  payment_ttl: string;
  ticketed_at: string | null;
  cancelled_at: string | null;
  pricing: CreatePnrBookingPricing;
  passengers: CreatePnrBookingPassenger[];
  segments: CreatePnrBookingSegment[];
  tickets: unknown[];
};

export type CreatePnrResponse = {
  success: boolean;
  message: string;
  data?: {
    pnr: string;
    is_ticketable: boolean;
    price_quote_numbers?: number[];
    booking: CreatePnrBooking;
    mail?: {
      queued: boolean;
      email: string;
    };
    search_id?: string;
    flight_id?: string;
  };
  code: number;
};