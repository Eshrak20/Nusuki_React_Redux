export type RoomSearch = {
  adults: number;
  children: number;
  child_ages?: number[];
};

export type HotelSearchResponse = {
  success: boolean;
  message: string;
  code: number;
  data: HotelSearchData;
};

export type HotelSearchData = {
  search_id: string;
  search_finished: boolean;
  total_hotels_in_region: number;
  total_available_hotels_without_filter: number;
  total_available_hotels_with_filter: number;
  is_last_page: boolean;
  expires_at: string;
  search: {
    check_in: string;
    check_out: string;
    currency_code: string;
    country_code: string;
    location: {
      latitude: number;
      longitude: number;
    };
    radius: number;
    uom: string;
    rooms: RoomSearch[];
    page: number;
    size: number;
  };
  available_hotels: HotelItem[];
  filters: HotelFilters;
  raw_meta?: {
    shop_key?: string;
    offset?: number;
    messages?: {
      code: string;
      text: string;
    }[];
  };
};

export type HotelLocationPoint = {
  type?: string;
  coordinates?: number[];
  latitude?: number;
  longitude?: number;
};

export type HotelAddress = {
  location?: HotelLocationPoint;
  full_address?: string;
  line1?: string;
  line2?: string;
  city?: {
    code?: string;
    name?: string;
  };
  state?: {
    code?: string;
    name?: string;
  };
  postal_code?: string;
  country?: {
    code?: string;
    name?: string;
  };
  neighborhoods?: string[];
};

export type HotelAmenity = {
  id?: string;
  code: number;
  name: string;
  complimentary?: boolean | null;
  value?: string | null;
};

export type HotelRate = {
  currency?: string;
  total_price?: number;
  average_nightly_rate?: number;
  amount_before_tax?: number;
  amount_after_tax?: number;
  tax_and_fees?: number;
  prepaid?: boolean;
  cancellation_policy?: {
    is_refundable?: boolean;
    free_cancellation_before?: unknown;
    description?: string | null;
  };
  meal?: {
    has_meal?: boolean;
    id?: string;
    type?: string;
    breakfast?: boolean;
    lunch?: boolean;
    dinner?: boolean;
  };
};

export type HotelItem = {
  id?: string | number;
  hotel_id?: string | number;
  hotel_code?: string;
  sabre_hotel_code?: string;
  name?: string;
  hotel_name?: string;
  star_rating?: number;
  rating?: number;
  distance?: number;
  direction?: string;
  distance_uom?: string;
  logo?: string;
  images?: string[];
  image?: string;

  address?: HotelAddress;
  location?: string;
  city?: string;
  country?: string;

  chain?: {
    code?: string;
    name?: string;
  };
  brand?: {
    code?: string;
    name?: string;
  };

  amenities?: HotelAmenity[];
  promotional_amenities?: HotelAmenity[];

  rate?: HotelRate;

  // fallback old flat fields
  chain_code?: string;
  chain_name?: string;
  meal_plan?: string;
  meal_plans?: string[];
  refundable?: boolean;
  prepaid?: boolean;
  average_nightly_rate?: number;
  total_price?: number;
  currency_code?: string;
};

export type FilterOption<T = string | number | boolean> = {
  value: T;
  label: string;
  count: number;
  request_key?: string;
};

export type ChainFilterOption = {
  code: string;
  name: string;
  count: number;
  request_key?: string;
};

export type AmenityFilterOption = {
  code: number;
  name: string;
  count: number;
  request_key?: string;
};

export type MealPlanFilterOption = {
  id: string;
  name: string;
  count: number;
  request_key?: string;
};

export type HotelFilters = {
  price_range: {
    min: number | null;
    max: number | null;
    request_min_key: string;
    request_max_key: string;
  };
  star_ratings: FilterOption<number>[];
  chains: ChainFilterOption[];
  amenities: AmenityFilterOption[];
  meal_plans: MealPlanFilterOption[];
  refundability: FilterOption<boolean>[];
  payment_types: FilterOption<boolean>[];
};