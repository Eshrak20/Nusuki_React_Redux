export type HotelBookingSuccessResponse = {
  success?: boolean;
  message?: string;
  data?: {
    booking?: {
      id?: number;
      booking_code?: string;
      pnr?: string;
      supplier_confirmation_number?: string;
      status?: string;
      payment_status?: string;
      payment_type?: string;
      hotel?: {
        name?: string;
        city?: string;
        country?: string;
        address?: string;
      };
    };
  };
};

export type HotelPNRSuccessModalProps = {
  open: boolean;
  data: HotelBookingSuccessResponse | null;
  onClose: () => void;
};
