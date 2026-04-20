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
type TripType = "one_way" | "round_way" | "multi_way";

export const buildSearchResetKey = (searchData: SearchData) =>
  JSON.stringify({
    tripType: searchData.tripType,
    fareType: searchData.fareType,
    flightClass: searchData.flightClass,
    fromDest: searchData.fromDest?.iata_code ?? "",
    toDest: searchData.toDest?.iata_code ?? "",
    departureDate: searchData.departureDate,
    returnDate: searchData.returnDate,
    travelers: searchData.travelers,
    filters: searchData.filters,
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
    cabin: mapCabinClass(searchData.flightClass),
    max_stops: 0,
    page: currentPage,
    size: pageSize,
    sort_by: sortBy,
    sort_order: sortOrder,
    refundability: searchData.filters.refundability ?? [],
    stops: searchData.filters.stops ?? [],
    airlines: searchData.filters.airlines ?? [],
    layover_cities: searchData.filters.layover_cities ?? [],
    flight_schedule_departure:
      searchData.filters.flight_schedules?.departure ?? [],
    flight_schedule_arrival:
      searchData.filters.flight_schedules?.arrival ?? [],
    aircraft: searchData.filters.aircraft ?? [],
    price_min: searchData.filters.price_min ?? null,
    price_max: searchData.filters.price_max ?? null,
    layover_duration_min: searchData.filters.layover_duration_min ?? null,
    layover_duration_max: searchData.filters.layover_duration_max ?? null,
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
  return (
    flight.summary?.departure_at ||
    flight.segments?.[0]?.departure_at
  );
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

  // avoid filtering with an empty-count slot like 00-06
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