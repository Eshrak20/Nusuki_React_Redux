import type { FlightDocumentRequirements } from "./flightTicket.types";

export interface AirlineInfo {
    code: string;
    name: string;
    logo: string;
}
export interface AirlineFilterOption {
    code: string;
    name: string;
    logo: string;
    count: number;
    request_key?: string;
}

export interface AircraftFilterOption {
    code: string;
    name: string;
    count: number;
    request_key?: string;
}

export interface ScheduleFilterOption {
    value: string;
    label: string;
    start_hour: number;
    end_hour: number;
    count: number;
}

export interface PricingBreakdownItem {
    code: string;
    amount: number;
    currency: string;
    description: string;
}

export interface PassengerBreakdownItem {
    type: string;
    label: string;
    quantity: number;
    cabin_code: string;
    cabin_name: string;
    fare_basis: string;
    currency: string;
    base: number;
    tax: number;
    total: number;
    tax_breakdown: PricingBreakdownItem[];
}
export interface FlightBaggageGrouped {
    checked?: FlightBaggage;
    hand?: FlightBaggage;
}
export interface FlightPricing {
    discount: number;
    currency: string;
    total: number;
    base: number;
    base_currency: string;
    tax: number;
    published_base_fare?: number;
    published_base_currency?: string;
    tax_breakdown: PricingBreakdownItem[];
    passenger_breakdown: PassengerBreakdownItem[];
}

export interface FlightFare {
    cabin: string;
    cabin_name: string;
    fare_basis: string;
    booking_code: string;
    refundable: boolean;
    seats_available: number;
    last_ticket_date?: string;
    last_ticket_time?: string;
}
export interface AirportInfo {
    airport: string;
    airport_name: string;
    city: string;
    city_name: string;
    country?: string;
    country_code?: string;
    country_name?: string;
    terminal?: string | null;
}

export interface AircraftInfo {
    code: string;
    name: string;
}

export interface FlightSegmentItem {
    airline: AirlineInfo;
    flight_number: string;
    operating_flight_number: string;
    origin: AirportInfo;
    destination: AirportInfo;
    departure_at: string;
    arrival_at: string;
    elapsed_time: number;
    elapsed_time_text: string;
    stop_count: number;
    booking_code: string;
    cabin_code: string;
    cabin_name: string;
    meal_code?: string | null;
    seats_available: number;
    aircraft: AircraftInfo;
    journey_index: number;
}
export interface FlightSummary {
    origin: AirportInfo;
    destination: AirportInfo;
    departure_at: string;
    arrival_at: string;
    duration_minutes: number;
    duration_text: string;
    stops: number;
    is_direct: boolean;
}
export interface FlightBaggage {
    airline_code: string;
    passenger_type: string;
    passenger_label: string;
    provision_type: string;
    category: string;
    pieces: number | null;
    weight: number;
    unit: string;
    label: string;
}


export interface FlightJourneyItem {
    journey_index: number;
    requested?: {
        origin?: string;
        destination?: string;
        departure_date?: string;
    };
    summary: FlightSummary;
    segments: FlightSegmentItem[];
}

export interface FlightResultItem {
  id: number;
  document_requirements?: FlightDocumentRequirements;
  airline: AirlineInfo;
  segments: FlightSegmentItem[];
  journeys?: FlightJourneyItem[];
  summary: FlightSummary;
  pricing: FlightPricing;
  fare: FlightFare;
  baggage: FlightBaggage;
  baggage_allowances: FlightBaggage[];
  flight_id: string;
  search_id: string;
}


export interface FilterOptionString {
    value: string;
    label: string;
    count: number;
    request_key?: string;
}

export interface FilterOptionNumber {
    value: number;
    label: string;
    count: number;
    request_key?: string;
}

export interface ApiFilters {
    price_range?: {
        min: number;
        max: number;
        absolute_min: number;
        absolute_max: number;
    };
    layover_duration?: {
        min_minutes: number;
        max_minutes: number;
        min_text: string;
        max_text: string;
    };
    refundability?: FilterOptionString[];
    stops?: FilterOptionNumber[];
    airlines?: AirlineFilterOption[];
    layover_cities?: FilterOptionString[];
    flight_schedules?: {
        departure: ScheduleFilterOption[];
        arrival: ScheduleFilterOption[];
    };
    aircraft?: AircraftFilterOption[];
}

export interface ApiPagination {
    page: number;
    size: number;
    total: number;
    total_pages: number;
    from: number;
    to: number;
    has_next_page: boolean;
    has_previous_page: boolean;
}

export interface AirlinePriceSummaryItem {
    code: string;
    name: string;
    logo: string;
    total_price: number;
    currency: string;
}

export interface FlightSearchResponseData {
    flights: FlightResultItem[];
    filters: ApiFilters;
    pagination: ApiPagination;
    airline_price_summary?: AirlinePriceSummaryItem[];
    statistics: FlightSearchStatistics;
}
export interface FlightSearchStatisticsMessage {
    severity: string;
    type: string;
    code: string;
    text: string;
}

export interface FlightSearchStatistics {
    itinerary_count: number;
    quality_filtered_count: number;
    returned_count: number;
    available_flights: number;
    messages: FlightSearchStatisticsMessage[];
}
export interface FlightSearchApiResponse {
    success: boolean;
    message: string;
    data: FlightSearchResponseData;
}

export interface FlightSearchSegmentRequest {
    origin: string;
    destination: string;
    departure_date: string;
}

interface FlightSearchRequestBase {
    fare_type: string;
    adults: number;
    children: number;
    infants: number;
    child_ages: number[];
    cabin: string;
    max_stops: number;
    page: number;
    size: number;
    sort_by: string;
    sort_order: string;
    refundability: string[];
    stops: number[];
    airlines: string[];
    layover_cities: string[];
    flight_schedule_departure: string[];
    flight_schedule_arrival: string[];
    aircraft: string[];
    price_min: number | null;
    price_max: number | null;
    layover_duration_min: number | null;
    layover_duration_max: number | null;
}

export interface OneWayFlightSearchRequest extends FlightSearchRequestBase {
    trip_type: "one_way";
    origin?: string;
    destination?: string;
    departure_date: string;
}

export interface RoundWayFlightSearchRequest extends FlightSearchRequestBase {
    trip_type: "round_way";
    origin?: string;
    destination?: string;
    departure_date: string;
    return_date: string;
}

export interface MultiWayFlightSearchRequest extends FlightSearchRequestBase {
    trip_type: "multi_way";
    segments: FlightSearchSegmentRequest[];
}

export type FlightSearchRequest =
    | OneWayFlightSearchRequest
    | RoundWayFlightSearchRequest
    | MultiWayFlightSearchRequest;