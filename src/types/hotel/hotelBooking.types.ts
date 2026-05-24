export type HotelGuestType = "adult" | "child";

export type HotelPaymentType = "GUARANTEE" | "DEPOSIT" | "PAY_LATER";

export type CreateHotelBookingGuest = {
  type: HotelGuestType;
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
};

export type CreateHotelBookingPayment = {
  type: HotelPaymentType;
  card_code: string;
  card_number: string;
  expiry_month: number;
  expiry_year: string;
  cvv: string;
  holder_first_name: string;
  holder_last_name: string;
};

export type CreateHotelBookingRequest = {
  search_id: string;
  booking_key: string;
  contact: {
    email: string;
    phone: string;
  };
  guests: CreateHotelBookingGuest[];
  payment: CreateHotelBookingPayment;
};

export type HotelBookingGuestResponse = {
  room_index: string;
  guest_index: string;
  type: string;
  name: string;
  first_name: string;
  last_name: string;
  email: string | null;
  phone: string | null;
  lead_guest: boolean;
};
export type Hotel = {
  hotel_code: string;
  sabre_hotel_code: string | null;
  name: string;
  chain_code: string | null;
  chain_name: string | null;
  city: string;
  country_code: string;
  address: string;
};

export type HotelBookingResponse = {
  success: boolean;
  message: string;
  data: {
    booking: {
      id: number;
      booking_code: string;
      pnr: string;
      supplier_confirmation_number: string;
      status: string;
      payment_status: string;
      payment_type: string;
      search_id: string;
      booking_key: string;
      hotel: Hotel;
      check_in: string;
      check_out: string;
      room_count: number;
      guest_count: number;
      guests: HotelBookingGuestResponse[];
      pricing: {
        currency: string;
        base_amount: number;
        tax_amount: number;
        total_amount: number;
        supplier_currency: string;
        supplier_base_amount: number;
        supplier_tax_amount: number;
        supplier_total_amount: number;
      };
      support_phone: string;
      support_hours: string;
      created_at: string;
    };
    pnr: string;
    supplier_confirmation_number: string;
    mail: {
      queued: boolean;
      to: string;
    };
    sabre_response: unknown;
  };
  code: number;
};