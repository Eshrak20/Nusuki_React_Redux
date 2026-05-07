export type FlightBookingStatus =
  | "pnr_created"
  | "cancelled"
  | "ticketed"
  | "pending"
  | string;

export type FlightPaymentStatus =
  | "unpaid"
  | "paid"
  | "voided"
  | "refunded"
  | string;

export type FlightTripType = "one_way" | "round_way" | "multi_way" | string;

export type FlightBookingPricing = {
  currency: string;
  base_amount: string;
  tax_amount: string;
  total_amount: string;
};

export type FlightBookingPassenger = {
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

export type FlightBookingSegment = {
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

export type FlightBookingTicket = {
  id: number;
  ticket_number: string;
  status: string;
  issued_at: string;
  currency: string;
  total_amount: string;
};

export type FlightBookingItem = {
  id: number;
  booking_code: string;
  pnr: string;
  airline_pnr: string | null;
  route: string;
  trip_type: FlightTripType;
  travel_start_date: string;
  travel_end_date: string;
  cabin_class: string;
  traveller_count: string;
  booking_status: FlightBookingStatus;
  payment_status: FlightPaymentStatus;
  is_ticketable: boolean;
  ttl_at: string | null;
  ticketed_at: string | null;
  cancelled_at: string | null;
  pricing: FlightBookingPricing;
  passengers: FlightBookingPassenger[];
  segments: FlightBookingSegment[];
  tickets: FlightBookingTicket[];
};

export type FlightBookingPagination = {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
};

export type FlightBookingHistoryData = {
  items: FlightBookingItem[];
  pagination: FlightBookingPagination;
};

export type FlightBookingHistoryResponse = {
  success: boolean;
  message: string;
  data: FlightBookingHistoryData;
  code: number;
};

export type GetFlightBookingsParams = {
  page?: number;
  size?: number;
};



export type FlightBookingDetailResponse = {
  success: boolean;
  message: string;
  data: FlightBookingItem;
  code: number;
};

