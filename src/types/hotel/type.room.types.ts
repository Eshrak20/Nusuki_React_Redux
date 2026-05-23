import type {
  HotelAvailableRoom,
  HotelRatePlan,
} from "./hotelDetail.types";

export type PriceCheckRequest = {
  search_id: string;
  rate_key: string;
};

export type HotelPriceCheckHotel = {
  name?: string;
  star_rating?: number | null;
  address?: {
    full_address?: string;
  };
  contact?: {
    phone?: string | null;
  };
};

export type HotelPriceCheckStayRoom = {
  adults?: number;
  children?: number;
};

export type HotelPriceCheckStay = {
  check_in?: string;
  check_out?: string;
  rooms?: HotelPriceCheckStayRoom[];
};

/**
 * Price check room response is similar to hotel detail room,
 * but API may return partial room data.
 */
export type HotelPriceCheckRoom = Partial<
  Omit<HotelAvailableRoom, "rate_plans">
> & {
  rate_plans?: HotelRatePlan[];
};

export type HotelPriceCheckData = {
  booking_key?: string;
  can_book?: boolean;
  price_changed?: boolean;
  price_difference?: number;
  currency_code?: string;

  converted_price_changed?: boolean;
  converted_price_difference?: number;
  converted_currency_code?: string;

  selected_rate_key?: string;

  hotel?: HotelPriceCheckHotel;
  rooms?: HotelPriceCheckRoom[];
  stay?: HotelPriceCheckStay;
};

export type HotelPriceCheckResponse = {
  success: boolean;
  message: string;
  code: number;
  data?: HotelPriceCheckData;
};