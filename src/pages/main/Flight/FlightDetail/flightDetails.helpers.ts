import type {
  FlightSearchApiResponse,
  FlightSearchRequest,
  FlightResultItem,
  ScheduleFilterOption,
} from "@/types/flight/flightResults.types";
import type { RootState } from "@/redux/store";
import { mapCabinClass } from "@/lib/utils";
import type { SortBy, SortOrder } from "./useFlightDetailsUi";

type SearchData = RootState["flightSearch"];
type FlightFilters = RootState["flightSearch"]["filters"];

type JourneySummaryAirport = {
  airport?: string;
  airport_name?: string;
  city?: string;
  city_name?: string;
};

type JourneySummary = {
  origin?: JourneySummaryAirport;
  destination?: JourneySummaryAirport;
  departure_at?: string;
  arrival_at?: string;
  duration_minutes?: number;
  stops?: number;
  is_direct?: boolean;
};

type JourneyItem = {
  journey_index?: number;
  summary?: JourneySummary;
  segments?: Array<{
    elapsed_time?: number;
    destination?: JourneySummaryAirport;
  }>;
};

const normalizeText = (value: unknown): string =>
  String(value ?? "").trim().toLowerCase();

const normalizeCode = (value: unknown): string =>
  String(value ?? "").trim().toUpperCase();

const normalizeToken = (value: unknown): string =>
  String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ");

const safeDateMs = (value?: string | null): number | null => {
  if (!value) return null;
  const ms = new Date(value).getTime();
  return Number.isNaN(ms) ? null : ms;
};

export const buildSearchResetKey = (searchData: SearchData) =>
  JSON.stringify({
    tripType: searchData.tripType,
    fareType: searchData.fareType,
    flightClass: searchData.cabin,
    fromDest: searchData.fromDest?.iata_code ?? "",
    toDest: searchData.toDest?.iata_code ?? "",
    departureDate: searchData.departureDate,
    returnDate: searchData.returnDate,
    travelers: searchData.travelers,
    segments: searchData.segments.map((seg) => ({
      from: seg.fromDest?.iata_code ?? "",
      to: seg.toDest?.iata_code ?? "",
      departureDate: seg.departureDate,
    })),
  });

export const isTimeInSlotByHours = (
  dateTime: string,
  start: number,
  end: number
): boolean => {
  const date = new Date(dateTime);

  if (!Number.isNaN(date.getTime())) {
    const hour = date.getHours();
    return hour >= start && hour < end;
  }

  const timeMatch = String(dateTime).match(/(\d{1,2}):(\d{2})/);
  if (!timeMatch) return false;

  const hour = Number(timeMatch[1]);
  return hour >= start && hour < end;
};

export const buildFlightSearchPayload = ({
  searchData,
  currentPage,
  pageSize,
  sortBy,
  sortOrder,
}: {
  searchData: SearchData;
  currentPage: number;
  pageSize: number;
  sortBy: SortBy;
  sortOrder: SortOrder;
}): FlightSearchRequest => {
  const formatDate = (isoString: string) =>
    isoString ? isoString.split("T")[0] : "";

  const isStudent = searchData.fareType === "student";
  const adultsCount = searchData.travelers?.adults || 1;
  const infantsCount = isStudent ? 0 : searchData.travelers?.infants || 0;
  const childAgesArray = isStudent ? [] : searchData.travelers?.children || [];
  const childrenCount = childAgesArray.length;

  const commonPayload = {
    fare_type: searchData.fareType || "regular",
    adults: adultsCount,
    children: childrenCount,
    infants: infantsCount,
    child_ages: childAgesArray,
    cabin: mapCabinClass(searchData.cabin),
    max_stops: 0,
    page: currentPage,
    size: pageSize,
    sort_by: sortBy,
    sort_order: sortOrder,

    refundability: [],
    stops: [],
    airlines: [],
    layover_cities: [],
    flight_schedule_departure: [],
    flight_schedule_arrival: [],
    aircraft: [],
    price_min: null,
    price_max: null,
    layover_duration_min: null,
    layover_duration_max: null,
  };

  if (searchData.tripType === "multi_way") {
    return {
      ...commonPayload,
      trip_type: "multi_way",
      segments: searchData.segments.map((seg) => ({
        origin: seg.fromDest?.iata_code ?? "",
        destination: seg.toDest?.iata_code ?? "",
        departure_date: formatDate(seg.departureDate),
      })),
    };
  }

  if (searchData.tripType === "round_way") {
    return {
      ...commonPayload,
      trip_type: "round_way",
      origin: searchData.fromDest?.iata_code ?? "",
      destination: searchData.toDest?.iata_code ?? "",
      departure_date: formatDate(searchData.departureDate),
      return_date: formatDate(searchData.returnDate),
    };
  }

  return {
    ...commonPayload,
    trip_type: "one_way",
    origin: searchData.fromDest?.iata_code ?? "",
    destination: searchData.toDest?.iata_code ?? "",
    departure_date: formatDate(searchData.departureDate),
  };
};

export const extractFlights = (
  response?: FlightSearchApiResponse
): FlightResultItem[] => {
  return response?.data?.flights ?? [];
};

export const getScheduleSlots = (
  response?: FlightSearchApiResponse
): ScheduleFilterOption[] => {
  const filters = response?.data?.filters;
  const departure = filters?.flight_schedules?.departure ?? [];
  const arrival = filters?.flight_schedules?.arrival ?? [];

  return departure.length ? departure : arrival;
};

export const getFlightDepartureRaw = (
  flight: FlightResultItem
): string | null | undefined => {
  return flight.summary?.departure_at || flight.segments?.[0]?.departure_at;
};

const getFlightArrivalRaw = (
  flight: FlightResultItem
): string | null | undefined => {
  return (
    flight.summary?.arrival_at ||
    flight.segments?.[flight.segments.length - 1]?.arrival_at
  );
};

const getFlightPrice = (flight: FlightResultItem): number => {
  return flight.pricing?.total ?? 0;
};

const getFlightDuration = (flight: FlightResultItem): number => {
  return flight.summary?.duration_minutes ?? 0;
};

const getFlightStopCount = (flight: FlightResultItem): number => {
  return flight.summary?.stops ?? Math.max((flight.segments?.length ?? 1) - 1, 0);
};

const getFlightRefundabilityValues = (flight: FlightResultItem): string[] => {
  const values = new Set<string>();

  if (flight.fare?.refundable === true) {
    values.add("refundable");
    values.add("refund");
    values.add("yes");
    values.add("true");
  } else {
    values.add("non refundable");
    values.add("non_refundable");
    values.add("non-refundable");
    values.add("not refundable");
    values.add("false");
    values.add("no");
  }

  return Array.from(values).map(normalizeToken);
};

const getFlightAirlineCodes = (flight: FlightResultItem): string[] => {
  const codes = new Set<string>();

  if (flight.airline?.code) {
    codes.add(normalizeCode(flight.airline.code));
  }

  flight.segments?.forEach((segment) => {
    if (segment.airline?.code) {
      codes.add(normalizeCode(segment.airline.code));
    }
  });

  return Array.from(codes);
};

const getFlightAircraftValues = (flight: FlightResultItem): string[] => {
  const values = new Set<string>();

  flight.segments?.forEach((segment) => {
    if (segment.aircraft?.code) values.add(normalizeText(segment.aircraft.code));
    if (segment.aircraft?.name) values.add(normalizeText(segment.aircraft.name));
  });

  return Array.from(values);
};

const getJourneyList = (flight: FlightResultItem): JourneyItem[] => {
  return (
    (flight as FlightResultItem & { journeys?: JourneyItem[] }).journeys ?? []
  );
};

const getJourneyGapLayoverMinutes = (flight: FlightResultItem): number[] => {
  const journeys = getJourneyList(flight);
  const result: number[] = [];

  for (let i = 0; i < journeys.length - 1; i += 1) {
    const currentArrival = safeDateMs(journeys[i]?.summary?.arrival_at);
    const nextDeparture = safeDateMs(journeys[i + 1]?.summary?.departure_at);

    if (currentArrival !== null && nextDeparture !== null && nextDeparture > currentArrival) {
      result.push(Math.round((nextDeparture - currentArrival) / 60000));
    }
  }

  return result;
};

const getSegmentTransitLayoverMinutes = (flight: FlightResultItem): number[] => {
  const segments = flight.segments ?? [];
  const result: number[] = [];

  for (let i = 0; i < segments.length - 1; i += 1) {
    const currentArrival = safeDateMs(segments[i]?.arrival_at);
    const nextDeparture = safeDateMs(segments[i + 1]?.departure_at);

    if (currentArrival !== null && nextDeparture !== null && nextDeparture > currentArrival) {
      result.push(Math.round((nextDeparture - currentArrival) / 60000));
    }
  }

  return result;
};

const getFlightLayoverDuration = (flight: FlightResultItem): number => {
  const journeyGapLayovers = getJourneyGapLayoverMinutes(flight);
  if (journeyGapLayovers.length > 0) {
    return Math.max(...journeyGapLayovers);
  }

  const segmentLayovers = getSegmentTransitLayoverMinutes(flight);
  if (segmentLayovers.length > 0) {
    return Math.max(...segmentLayovers);
  }

  const totalDuration = flight.summary?.duration_minutes ?? 0;
  const flyingDuration = (flight.segments ?? []).reduce(
    (sum, segment) => sum + (segment.elapsed_time ?? 0),
    0
  );

  return Math.max(totalDuration - flyingDuration, 0);
};

const getFlightLayoverCities = (flight: FlightResultItem): string[] => {
  const values = new Set<string>();

  const journeys = getJourneyList(flight);

  /**
   * For round-trip / multi-journey data like your sample,
   * layover city comes from the destination of journey[i]
   * before journey[i+1] starts.
   */
  for (let i = 0; i < journeys.length - 1; i += 1) {
    const stop = journeys[i]?.summary?.destination;

    if (stop?.airport) values.add(normalizeText(stop.airport));
    if (stop?.airport_name) values.add(normalizeText(stop.airport_name));
    if (stop?.city) values.add(normalizeText(stop.city));
    if (stop?.city_name) values.add(normalizeText(stop.city_name));
  }

  /**
   * For normal connecting segments in a one-way itinerary,
   * layover happens at destination of each segment except the last one.
   */
  const segments = flight.segments ?? [];
  for (let i = 0; i < segments.length - 1; i += 1) {
    const stop = segments[i]?.destination;

    if (stop?.airport) values.add(normalizeText(stop.airport));
    if (stop?.airport_name) values.add(normalizeText(stop.airport_name));
    if (stop?.city) values.add(normalizeText(stop.city));
    if (stop?.city_name) values.add(normalizeText(stop.city_name));
  }

  return Array.from(values);
};

const matchesScheduleSlots = (
  flight: FlightResultItem,
  slots: string[],
  type: "departure" | "arrival"
): boolean => {
  if (!slots.length) return true;

  const dateTime =
    type === "departure" ? getFlightDepartureRaw(flight) : getFlightArrivalRaw(flight);

  if (!dateTime) return false;

  return slots.some((slot) => {
    const [startText, endText] = slot.split("-");
    const start = Number(startText);
    const end = Number(endText);

    if (Number.isNaN(start) || Number.isNaN(end)) return false;
    return isTimeInSlotByHours(dateTime, start, end);
  });
};

export const getClientFilteredFlights = ({
  flights,
  filters,
  selectedAirlineCode,
}: {
  flights: FlightResultItem[];
  filters: FlightFilters;
  selectedAirlineCode?: string | null;
}): FlightResultItem[] => {
  return flights.filter((flight) => {
    const airlineCodes = getFlightAirlineCodes(flight);
    const aircraftValues = getFlightAircraftValues(flight);
    const layoverCities = getFlightLayoverCities(flight);
    const refundabilityValues = getFlightRefundabilityValues(flight);

    const price = getFlightPrice(flight);
    const stopCount = getFlightStopCount(flight);
    const layoverDuration = getFlightLayoverDuration(flight);

    const matchSelectedAirline =
      !selectedAirlineCode ||
      airlineCodes.includes(normalizeCode(selectedAirlineCode));

    const matchAirlines =
      filters.airlines.length === 0 ||
      filters.airlines.some((code) =>
        airlineCodes.includes(normalizeCode(code))
      );

    const matchStops =
      filters.stops.length === 0 || filters.stops.includes(stopCount);

    const matchRefundability =
      filters.refundability.length === 0 ||
      filters.refundability.some((item) =>
        refundabilityValues.includes(normalizeToken(item))
      );

    const matchAircraft =
      filters.aircraft.length === 0 ||
      filters.aircraft.some((item) =>
        aircraftValues.includes(normalizeText(item))
      );

    const matchLayoverCities =
      filters.layover_cities.length === 0 ||
      filters.layover_cities.some((item) => {
        const normalized = normalizeText(item);
        return layoverCities.includes(normalized);
      });

    const matchPriceMin =
      filters.price_min === null || price >= filters.price_min;

    const matchPriceMax =
      filters.price_max === null || price <= filters.price_max;

    const matchLayoverDurationMin =
      filters.layover_duration_min === null ||
      layoverDuration >= filters.layover_duration_min;

    const matchLayoverDurationMax =
      filters.layover_duration_max === null ||
      layoverDuration <= filters.layover_duration_max;

    const matchDepartureSchedule = matchesScheduleSlots(
      flight,
      filters.flight_schedules.departure,
      "departure"
    );

    const matchArrivalSchedule = matchesScheduleSlots(
      flight,
      filters.flight_schedules.arrival,
      "arrival"
    );

    return (
      matchSelectedAirline &&
      matchAirlines &&
      matchStops &&
      matchRefundability &&
      matchAircraft &&
      matchLayoverCities &&
      matchPriceMin &&
      matchPriceMax &&
      matchLayoverDurationMin &&
      matchLayoverDurationMax &&
      matchDepartureSchedule &&
      matchArrivalSchedule
    );
  });
};

export const sortFlightsClientSide = ({
  flights,
  sortBy,
  sortOrder,
}: {
  flights: FlightResultItem[];
  sortBy: SortBy;
  sortOrder: SortOrder;
}): FlightResultItem[] => {
  const sorted = [...flights];

  sorted.sort((a, b) => {
    let aValue = 0;
    let bValue = 0;

    if (sortBy === "price") {
      aValue = getFlightPrice(a);
      bValue = getFlightPrice(b);
    } else if (sortBy === "duration") {
      aValue = getFlightDuration(a);
      bValue = getFlightDuration(b);
    } else {
      const aTime = getFlightDepartureRaw(a);
      const bTime = getFlightDepartureRaw(b);

      aValue = aTime ? new Date(aTime).getTime() : 0;
      bValue = bTime ? new Date(bTime).getTime() : 0;
    }

    return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
  });

  return sorted;
};

export const paginateFlights = ({
  flights,
  currentPage,
  pageSize,
}: {
  flights: FlightResultItem[];
  currentPage: number;
  pageSize: number;
}): FlightResultItem[] => {
  const start = (currentPage - 1) * pageSize;
  return flights.slice(start, start + pageSize);
};

export const filterFlightsByAirlineAndSchedule = ({
  flights,
  selectedAirlineCode,
  selectedScheduleSlot,
}: {
  flights: FlightResultItem[];
  selectedAirlineCode: string | null;
  selectedScheduleSlot: ScheduleFilterOption | null;
}): FlightResultItem[] => {
  const airlineFilteredFlights = selectedAirlineCode
    ? flights.filter((flight) => {
        const mainAirlineCode = flight.airline?.code ?? null;

        const segmentAirlineMatch =
          flight.segments?.some(
            (segment) => segment.airline?.code === selectedAirlineCode
          ) ?? false;

        return mainAirlineCode === selectedAirlineCode || segmentAirlineMatch;
      })
    : flights;

  if (!selectedScheduleSlot) return airlineFilteredFlights;
  if (selectedScheduleSlot.count <= 0) return airlineFilteredFlights;

  return airlineFilteredFlights.filter((flight) => {
    const departureRaw = getFlightDepartureRaw(flight);
    if (!departureRaw) return false;

    return isTimeInSlotByHours(
      departureRaw,
      selectedScheduleSlot.start_hour,
      selectedScheduleSlot.end_hour
    );
  });
};