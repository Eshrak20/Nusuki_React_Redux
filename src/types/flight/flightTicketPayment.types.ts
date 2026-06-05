export type PaymentMethod = "CA" | "CC";

export type CardPaymentInfo = {
  card_type_code: string;
  card_number: string;
  card_security_code: string;
  expiry_date: string;
};

export type IssueAirTicketRequest = {
  pnr: string;
  payment: {
    method: PaymentMethod;
    card?: CardPaymentInfo;
  };
  ticket_country_code: string;
  hardcopy_lniata: string;
  send_email: boolean;
  contact: {
    email: string;
    phone: string;
  };
};

export type FlightPricing = {
  currency: string;
  base_amount: string;
  tax_amount: string;
  total_amount: string;
};

export type FlightPassenger = {
  id: number;
  passenger_type: string;
  title: string | null;
  given_name: string;
  surname: string;
  gender: string;
  date_of_birth: string;
  phone: string;
  email: string;
  passport_no: string;
};

export type FlightSegment = {
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

export type FlightBooking = {
  id: number;
  booking_code: string;
  pnr: string;
  airline_pnr: string | null;
  route: string;
  trip_type: string;
  travel_start_date: string;
  travel_end_date: string;
  cabin_class: string;
  traveller_count: string;
  booking_status: string;
  payment_status: string;
  is_ticketable: boolean;
  payment_ttl: string | null;
  ticketed_at: string | null;
  cancelled_at: string | null;
  pricing: FlightPricing;
  passengers: FlightPassenger[];
  segments: FlightSegment[];
  tickets?: unknown[];
};

export type IssueAirTicketResponse = {
  success: boolean;
  message: string;
  data: {
    pnr: string;
    booking: FlightBooking;
    sabre_response?: unknown;
    mail?: {
      queued: boolean;
      email: string;
    };
  };
  code: number;
};

export type CancelAirTicketRequest = {
  pnr: string;
  retrieveBooking: boolean;
  cancelAll: boolean;
  flightTicketOperation: "VOID" | "REFUND";
  errorHandlingPolicy: "ALLOW_PARTIAL_CANCEL" | "HALT_ON_ERROR";
  contact: {
    email: string;
  };
  send_email: boolean;
};

export type CancelAirTicketResponse = {
  success: boolean;
  message: string;
  data: {
    pnr: string;
    voided_tickets: unknown[];
    refunded_tickets: unknown[];
    booking: FlightBooking;
    mail?: {
      queued: boolean;
      email: string;
    };
    sabre_response?: unknown;
  };
  code: number;
};

export type InitiateFlightPaymentRequest = {
  bookingCode: string;
};

export type InitiateFlightPaymentData = {
  payment_url: string;
  tran_id: string;
  amount: number;
  currency: string;
  booking_code: string;
};

export type InitiateFlightPaymentResponse = {
  success: boolean;
  message: string;
  data: InitiateFlightPaymentData;
  code: number;
};