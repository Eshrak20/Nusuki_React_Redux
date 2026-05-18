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