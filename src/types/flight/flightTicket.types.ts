import type { FlightResultItem, FlightSearchRequest } from "./flightResults.types";

export interface FlightDetailRequest {
  flight_id: string;
  search_id: string;
}

export interface RevalidationMessage {
  severity: string;
  type: string;
  code: string;
  text: string;
}

export interface FlightRevalidation {
  valid: boolean;
  checked_at: string;
  price_changed: boolean;
  price_difference: number;
  original_total: number;
  latest_total: number;
  currency: string;
  messages: RevalidationMessage[];
}

export interface FlightDetailMeta {
  version: string;
  cache: {
    store: string;
    search_cached_until: string;
    detail_cached_until: string;
    detail_cache_hit: boolean;
  };
}

export interface FlightDetailResponseData {
  search_id: string;
  flight_id: string;
  search: FlightSearchRequest;
  flight: FlightResultItem;
  original_flight: FlightResultItem;
  revalidation: FlightRevalidation;
  meta: FlightDetailMeta;
}

export interface FlightDetailApiResponse {
  success: boolean;
  message: string;
  data: FlightDetailResponseData;
  code: number;
}