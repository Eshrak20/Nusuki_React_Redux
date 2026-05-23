export type HotelBookingDetailStatus =
  | "pnr_created"
  | "confirmed"
  | "cancelled"
  | "failed"
  | "pending"
  | string;

export type HotelBookingDetailPaymentStatus =
  | "guaranteed"
  | "paid"
  | "unpaid"
  | "pending"
  | "failed"
  | string;

export type HotelBookingDetailHotel = {
  hotel_code: string | null;
  sabre_hotel_code: string | null;
  name: string | null;
  chain_code: string | null;
  chain_name: string | null;
  city: string | null;
  country_code: string | null;
  address: string | null;
};

export type HotelBookingDetailGuest = {
  room_index: string;
  guest_index: string;
  type: string;
  name: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  lead_guest: boolean;
};

export type HotelBookingDetailPricing = {
  currency: string;
  base_amount: number;
  tax_amount: number;
  total_amount: number;
  supplier_currency: string;
  supplier_base_amount: number;
  supplier_tax_amount: number;
  supplier_total_amount: number;
};

export type HotelBookingDetail = {
  id: number;
  booking_code: string;
  pnr: string;
  supplier_confirmation_number: string;
  status: HotelBookingDetailStatus;
  payment_status: HotelBookingDetailPaymentStatus;
  payment_type: string;
  search_id: string;
  booking_key: string;
  hotel: HotelBookingDetailHotel;
  check_in: string;
  check_out: string;
  room_count: string;
  guest_count: string;
  guests: HotelBookingDetailGuest[];
  pricing: HotelBookingDetailPricing;
  support_phone: string;
  support_hours: string;
  created_at: string;
};

export type HotelBookingDetailResponse = {
  success: boolean;
  message: string;
  data: HotelBookingDetail;
  code: number;
};