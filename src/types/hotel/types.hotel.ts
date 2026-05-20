export type HotelRoom = {
  adults: number;
  children: number;
  child_ages?: number[];
};

export type HotelSearchPayload = {
  check_in: string;
  check_out: string;
  latitude: number;
  longitude: number;
  radius: number;
  uom: "MI" | "KM";
  country_code: string;
  currency_code: string;
  rooms: HotelRoom[];
  page: number;
  size: number;
  sort_by: string;
  sort_order: "ASC" | "DESC";
  include_images: boolean;
};

export type HotelSearchResponse = {
  data?: unknown;
  message?: string;
  success?: boolean;
};


export type HotelDetailPayload = {
  search_id: string;
  hotel_id: string;
};

export type PlaceAutocompleteArgs = {
  keyword: string;
  limit?: number;
};

export type PlaceSuggestion = {
  type: string;
  sourceType: string;
  userHits: number;
  name: string;
  fullAddress: string;
  id: string;
  cityName: string;
  countryName: string;
  countryCode: string;
  isSearchable: boolean;
  popularity: number;
  searchHint: {
    latitude: number;
    longitude: number;
    country_code: string;
  };
};

export type PlaceAutocompleteResponse = {
  code: string;
  message: string;
  response: PlaceSuggestion[];
  traceId: string;
  meta: {
    keyword: string;
    country_code: string | null;
    sabre_status: number;
    sabre_q_time: number;
  };
};