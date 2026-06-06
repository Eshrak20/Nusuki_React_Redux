import type {
  FlightResultItem,
  FlightSearchSegmentRequest,
  FlightSegmentItem,
  FlightSummary,
} from "./flightResults.types";

export interface FlightDetailRequest {
  flight_id: string;
  search_id: string;
}

export interface FlightSearchSnapshotFilters {
  price_min: number | null;
  price_max: number | null;
  layover_duration_min: number | null;
  layover_duration_max: number | null;
  refundability: string[];
  stops: number[];
  airlines: string[];
  layover_cities: string[];
  flight_schedule_departure: string[];
  flight_schedule_arrival: string[];
  aircraft: string[];
}

export interface FlightSearchSnapshot {
  trip_type: "one_way" | "round_way" | "multi_way";
  fare_type: string;
  origin?: string;
  destination?: string;
  departure_date?: string;
  return_date?: string;
  segments?: FlightSearchSegmentRequest[];
  adults: number;
  children: number;
  child_ages: number[];
  infants: number;
  cabin: string;
  max_stops: number;
  limit: number;
  page: number;
  size: number;
  sort_by: string;
  sort_order: string;
  filters: FlightSearchSnapshotFilters;
}

export interface FlightJourneyRequested {
  origin: string;
  destination: string;
  departure_date: string;
}

export interface FlightPassportRequirement {
  required: boolean;
  message: string;
}

export interface FlightDocumentRequirements {
  route_type: "domestic" | "international" | string;
  is_domestic: boolean;
  passport: FlightPassportRequirement;
}

export interface FlightJourneyItem {
  journey_index: number;
  requested: FlightJourneyRequested;
  summary: FlightSummary;
  segments: FlightSegmentItem[];
}

export interface FlightRawInfo {
  governing_carrier: string;
  validating_carrier: string;
  diversity_score: number | null;
}

export interface FlightDetailResultItem extends FlightResultItem {
  document_requirements?: FlightDocumentRequirements;
  pricing_source?: string;
  distribution_model?: string;
  journeys: FlightJourneyItem[];
  raw?: FlightRawInfo;
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

  is_bookable: boolean;
  document_requirements: FlightDocumentRequirements;

  search: FlightSearchSnapshot;
  flight: FlightDetailResultItem;
  original_flight: FlightDetailResultItem;
  revalidation: FlightRevalidation;
  meta: FlightDetailMeta;
}

export interface FlightDetailApiResponse {
  success: boolean;
  message: string;
  data: FlightDetailResponseData;
  code: number;
}

export interface PriceSummaryItem {
  label: string;
  value: number;
  valueClassName?: string;
  labelClassName?: string;
}

export type CountdownParts = {
  minutes: string;
  seconds: string;
};