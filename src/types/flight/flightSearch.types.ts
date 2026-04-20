import type { SearchDests } from "./flightHome.types";

export interface FlightSearchRequest {
    trip_type: "one_way" | "round_way" | "multi_way";
    origin?: string; // Required for one_way/round_way
    destination?: string;
    departure_date?: string;
    return_date?: string; // Required for round_way
    segments?: {
        origin: string;
        destination: string;
        departure_date: string;
    }[];
    fare_type: string;
    adults: number;
    children: number;
    infants: number;
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


export interface FlightSegment {
    fromDest: SearchDests | null;
    toDest: SearchDests | null;
    departureDate: string;
}

export interface FlightSearchState {
    tripType: string;
    fareType: string;
    searchDest: string;
    // Single trip data (used for One-Way/Round-Trip)
    fromDest: SearchDests | null;
    toDest: SearchDests | null;
    departureDate: string;
    returnDate: string;
    // Multi-way data
    segments: FlightSegment[];
    travelers: {
        adults: number;
        children: number[];
        infants: number;
        child_ages?: number[];
    };
    flightClass: string;
    // ✅ Filters added
    filters: FlightFilters;
}
export interface FlightFilters {
    airlines: string[];
    aircraft: string[];
    stops: number[];
    refundability: string[];

    price_min: number | null;
    price_max: number | null;

    flight_schedules: {
        departure: string[];
        arrival: string[];
    };

    layover_cities: string[];
    layover_duration_min: number | null;
    layover_duration_max: number | null;
}
export type UpdateTravelerPayload = Partial<FlightSearchState["travelers"]> & {
    childrenCount?: number;
    childAgeUpdate?: { index: number; age: number };
};