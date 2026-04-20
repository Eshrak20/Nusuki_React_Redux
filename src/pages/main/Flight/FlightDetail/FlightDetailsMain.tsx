import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import type {
  FlightSearchApiResponse,
  FlightSearchRequest,
} from "@/types/flight/flightResults.types";
import FlightDetailSearch from "./FlightDetailSearch";
import FlightFilter from "./filters/FlightFilter";
import FlightTimer from "./FlightTimer";
import { useFlightSearchTicketListsQuery } from "@/redux/api/flightApi/flightSearch";
import { mapCabinClass } from "@/lib/utils";
import FlightResultsHeader from "./FlightResultsHeader";
import FlightResultsList from "./FlightResultsList";
import FlightResultsPagination from "./FlightResultsPagination";

const FlightDetailsMain = () => {
  const searchData = useSelector((state: RootState) => state.flightSearch);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // 👇 1. FIRST: search key (must be before state)
  const searchResetKey = useMemo(
    () =>
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
      }),
    [searchData],
  );

  // 👇 2. THEN: states
  const [currentPage, setCurrentPage] = useState(1);
  const [lastSearchKey, setLastSearchKey] = useState(searchResetKey);

  // 👇 3. derived page
  const effectivePage = lastSearchKey === searchResetKey ? currentPage : 1;

  const pageSize = 20;

  const apiPayload = useMemo<FlightSearchRequest>(() => {
    const formatDate = (isoString: string) =>
      isoString ? isoString.split("T")[0] : "";

    const isStudent = searchData.fareType === "student";
    const adultsCount = searchData.travelers?.adults || 1;
    const infantsCount = isStudent ? 0 : searchData.travelers?.infants || 0;
    const childAgesArray = isStudent
      ? []
      : searchData.travelers?.children || [];
    const childrenCount = childAgesArray.length;

    const commonPayload = {
      fare_type: searchData.fareType || "regular",
      adults: adultsCount,
      children: childrenCount,
      infants: infantsCount,
      child_ages: childAgesArray,
      cabin: mapCabinClass(searchData.flightClass),
      max_stops: 0, //!Remove max_stops: 0 unless you intentionally want to lock everything to non-stop.
      page: currentPage,
      size: pageSize,
      sort_by: "price",
      sort_order: "asc",
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

    if (searchData.tripType === "multi-way") {
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

    if (searchData.tripType === "round-way") {
      return {
        ...commonPayload,
        trip_type: "round_way",
        origin: searchData.fromDest?.iata_code,
        destination: searchData.toDest?.iata_code,
        departure_date: formatDate(searchData.departureDate),
        return_date: formatDate(searchData.returnDate),
      };
    }

    return {
      ...commonPayload,
      trip_type: "one_way",
      origin: searchData.fromDest?.iata_code,
      destination: searchData.toDest?.iata_code,
      departure_date: formatDate(searchData.departureDate),
    };
  }, [searchData, currentPage]);
  const { data, isLoading, isError } = useFlightSearchTicketListsQuery(
    apiPayload,
    {
      skip:
        searchData.tripType === "multi-way"
          ? !searchData.segments?.[0]?.fromDest ||
            !searchData.segments?.[0]?.toDest
          : !searchData.fromDest || !searchData.toDest,
    },
  );

  const response = data as FlightSearchApiResponse | undefined;
  const result = response?.data;

  const handlePageChange = (page: number) => {
    setLastSearchKey(searchResetKey); // 🔥 important
    setCurrentPage(page);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="mt-20 min-h-screen bg-slate-100/80 pb-10">
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-5">
          <FlightDetailSearch />
        </div>
      </div>

      <div className="container mx-auto px-4 pt-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
          <aside className="space-y-4">
            <FlightTimer />
            <FlightFilter
              availableFilters={result?.filters}
              isLoading={isLoading}
            />
          </aside>

          <main className="space-y-4">
            <FlightResultsHeader
              isLoading={isLoading}
              isError={isError}
              totalFlights={
                result?.pagination?.total || result?.flights?.length || 0
              }
              airlineSummary={result?.airline_price_summary || []}
            />

            <FlightResultsList
              flights={result?.flights || []}
              isLoading={isLoading}
              isError={isError}
            />

            {!isLoading &&
              !isError &&
              (result?.pagination?.total_pages || 0) > 1 && (
                <FlightResultsPagination
                  currentPage={result?.pagination?.page || effectivePage}
                  totalPages={result?.pagination?.total_pages || 1}
                  onPageChange={handlePageChange}
                />
              )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default FlightDetailsMain;
