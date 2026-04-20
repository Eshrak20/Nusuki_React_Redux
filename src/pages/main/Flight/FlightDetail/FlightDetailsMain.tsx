import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import type { FlightSearchApiResponse } from "@/types/flight/flightResults.types";
import {
  setUiField,
  resetFlightUiState,
} from "@/redux/features/flightSearchSlice";
import FlightDetailSearch from "./FlightDetailSearch";
import FlightFilter from "./filters/FlightFilter";
import FlightTimer from "./FlightTimer";
import { useFlightSearchTicketListsQuery } from "@/redux/api/flightApi/flightSearch";
import FlightResultsHeader from "./FlightResultsHeader";
import FlightResultsList from "./FlightResultsList";
import FlightResultsPagination from "./FlightResultsPagination";
import {
  FlightResultsHeaderSkeleton,
  FlightResultsListSkeleton,
} from "@/components/skeletons/FlightResultsSkeleton";
import {
  buildFlightSearchPayload,
  buildSearchResetKey,
  extractFlights,
  filterFlightsByAirlineAndSchedule,
  getScheduleSlots,
} from "./flightDetails.helpers";

const FlightDetailsMain = () => {
  const dispatch = useDispatch();
  const searchData = useSelector((state: RootState) => state.flightSearch);
  const ui = searchData.ui;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const searchResetKey = useMemo(() => buildSearchResetKey(searchData), [searchData]);

  useEffect(() => {
    dispatch(resetFlightUiState());
  }, [dispatch, searchResetKey]);

  const pageSize = 20;

  const apiPayload = useMemo(
    () =>
      buildFlightSearchPayload({
        searchData,
        currentPage: ui.currentPage,
        pageSize,
        sortBy: ui.sortBy,
        sortOrder: ui.sortOrder,
      }),
    [searchData, ui.currentPage, ui.sortBy, ui.sortOrder]
  );

  const { data, isLoading, isError, isFetching } =
    useFlightSearchTicketListsQuery(apiPayload, {
      skip:
        searchData.tripType === "multi-way"
          ? !searchData.segments?.[0]?.fromDest ||
            !searchData.segments?.[0]?.toDest
          : !searchData.fromDest || !searchData.toDest,
    });

  const response = data as FlightSearchApiResponse | undefined;
  const flights = useMemo(() => extractFlights(response), [response]);
  const scheduleSlots = useMemo(() => getScheduleSlots(response), [response]);

  const selectedScheduleSlot =
    scheduleSlots.length > 0 && ui.scheduleIndex < scheduleSlots.length
      ? scheduleSlots[ui.scheduleIndex]
      : null;

  const processedFlights = useMemo(
    () =>
      filterFlightsByAirlineAndSchedule({
        flights,
        selectedAirlineCode: ui.selectedAirlineCode,
        selectedScheduleSlot,
      }),
    [flights, ui.selectedAirlineCode, selectedScheduleSlot]
  );

  const handlePageChange = (page: number) => {
    dispatch(setUiField({ currentPage: page }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAirlineSelect = (airlineCode: string | null) => {
    dispatch(setUiField({ selectedAirlineCode: airlineCode, currentPage: 1 }));
  };

  const handleSortChange = (
    sortBy: "price" | "duration" | "departure_at",
    sortOrder: "asc" | "desc"
  ) => {
    dispatch(setUiField({ sortBy, sortOrder, currentPage: 1 }));
  };

  const handlePrevDay = () => {
    dispatch(
      setUiField({
        scheduleIndex: Math.max(ui.scheduleIndex - 1, 0),
        currentPage: 1,
      })
    );
  };

  const handleNextDay = () => {
    dispatch(
      setUiField({
        scheduleIndex: Math.min(
          ui.scheduleIndex + 1,
          Math.max(scheduleSlots.length - 1, 0)
        ),
        currentPage: 1,
      })
    );
  };

  return (
    <div className="mt-20 min-h-screen bg-slate-100/80 pb-10 dark:bg-background">
      <div className="border-b bg-white dark:bg-card">
        <div className="container mx-auto px-4 py-5">
          <FlightDetailSearch />
        </div>
      </div>

      <div className="container mx-auto px-4 pt-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
          <aside className="space-y-4">
            <FlightTimer />
            <FlightFilter
              availableFilters={response?.data?.filters}
              isLoading={isLoading || isFetching}
            />
          </aside>

          <main className="space-y-4">
            {isLoading ? (
              <FlightResultsHeaderSkeleton />
            ) : (
              <FlightResultsHeader
                availableFilters={response?.data?.filters}
                isLoading={isLoading || isFetching}
                isError={isError}
                totalFlights={processedFlights.length}
                airlineSummary={response?.data?.airline_price_summary || []}
                selectedAirlineCode={ui.selectedAirlineCode}
                onAirlineSelect={handleAirlineSelect}
                onPrevDay={handlePrevDay}
                onNextDay={handleNextDay}
                disablePrevDay={ui.scheduleIndex <= 0}
                disableNextDay={
                  scheduleSlots.length === 0 ||
                  ui.scheduleIndex >= scheduleSlots.length - 1
                }
                dateLabel={
                  selectedScheduleSlot
                    ? `Schedule: ${selectedScheduleSlot.label}`
                    : undefined
                }
                sortBy={ui.sortBy}
                sortOrder={ui.sortOrder}
                onSortChange={handleSortChange}
              />
            )}

            {isLoading ? (
              <FlightResultsListSkeleton count={5} />
            ) : (
              <FlightResultsList
                flights={processedFlights}
                isLoading={isLoading || isFetching}
                isError={isError}
              />
            )}

            {!isLoading &&
              !isError &&
              (response?.data?.pagination?.total_pages || 0) > 1 && (
                <FlightResultsPagination
                  currentPage={response?.data?.pagination?.page || ui.currentPage}
                  totalPages={response?.data?.pagination?.total_pages || 1}
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