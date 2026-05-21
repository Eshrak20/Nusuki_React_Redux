export type PriceCheckRequest = {
  search_id: string;
  rate_key: string;
};

export type BedType = {
  code?: number;
  name: string;
};

export type CancellationPolicy = {
  is_refundable?: boolean;
  free_cancellation_before?: {
    AbsoluteDeadline?: string;
  } | null;
  description?: string | null;
};

export type RateInfo = {
  rate_key?: string;
  rate_source?: string;
  currency?: string;
  total_price?: number;
  amount_before_tax?: number;
  amount_after_tax?: number;
  average_nightly_rate?: number;
  average_nightly_rate_before_tax?: number;
  highest_nightly_rate?: number | null;
  tax_and_fees?: number;
  tax_inclusive?: boolean;
  additional_fees_inclusive?: boolean;
  cancellation_policy?: CancellationPolicy;
};

export type RatePlan = {
  name?: string;
  code?: string;
  type?: string;
  type_description?: string;
  prepaid?: boolean;
  available_quantity?: number;
  limited_availability?: string;
  rate_source?: string;
  rate_key?: string;
  product_code?: string;
  description?: string;
  meal?: {
    has_meal?: boolean;
    id?: string;
    type?: string;
    breakfast?: boolean;
    lunch?: boolean;
    dinner?: boolean;
    code?: number;
  };
  rate_info?: RateInfo;
};

export type HotelRoom = {
  room_index?: number;
  name?: string;
  type?: string | null;
  room_id?: string | null;
  adults?: number;
  children?: number | null;
  non_smoking?: boolean;
  occupancy?: {
    min?: number | null;
    max?: number | null;
  };
  bed_types?: BedType[];
  rate_plans?: RatePlan[];
};

export type HotelPriceCheckResponse = {
  success: boolean;
  message: string;
  code: number;
  data?: {
    booking_key?: string;
    can_book?: boolean;
    price_changed?: boolean;
    price_difference?: number;
    currency_code?: string;
    converted_price_changed?: boolean;
    converted_price_difference?: number;
    converted_currency_code?: string;
    selected_rate_key?: string;
    hotel?: {
      name?: string;
      star_rating?: number;
      address?: {
        full_address?: string;
      };
      contact?: {
        phone?: string;
      };
    };
    rooms?: HotelRoom[];
    stay?: {
      check_in?: string;
      check_out?: string;
      rooms?: {
        adults?: number;
        children?: number;
      }[];
    };
  };
};