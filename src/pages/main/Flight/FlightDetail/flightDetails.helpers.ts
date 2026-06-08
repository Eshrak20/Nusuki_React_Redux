import type { RootState } from "@/redux/store";
import type { FlightSearchRequest } from "@/types/flight/flightResults.types";
import { mapCabinClass } from "@/lib/utils";
import type { SortBy, SortOrder } from "./useFlightDetailsUi";

type SearchData = RootState["flightSearch"];

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
  const formatDate = (isoString?: string | null) =>
    isoString ? isoString.split("T")[0] : "";

  const isStudent = searchData.fareType === "student";

  const adultsCount = searchData.travelers?.adults || 1;
  const infantsCount = isStudent ? 0 : searchData.travelers?.infants || 0;
  const childAgesArray = isStudent ? [] : searchData.travelers?.children || [];
  const childrenCount = childAgesArray.length;

  const selectedAirlineCode = searchData.ui?.selectedAirlineCode ?? null;

  const airlines = Array.from(
    new Set([
      ...(searchData.filters?.airlines ?? []),
      ...(selectedAirlineCode ? [selectedAirlineCode] : []),
    ]),
  );

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

    refundability: searchData.filters?.refundability ?? [],
    stops: searchData.filters?.stops ?? [],
    airlines,
    layover_cities: searchData.filters?.layover_cities ?? [],
    flight_schedule_departure:
      searchData.filters?.flight_schedules?.departure ?? [],
    flight_schedule_arrival:
      searchData.filters?.flight_schedules?.arrival ?? [],
    aircraft: searchData.filters?.aircraft ?? [],

    price_min: searchData.filters?.price_min ?? null,
    price_max: searchData.filters?.price_max ?? null,
    layover_duration_min: searchData.filters?.layover_duration_min ?? null,
    layover_duration_max: searchData.filters?.layover_duration_max ?? null,
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