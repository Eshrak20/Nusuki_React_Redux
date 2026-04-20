import { useEffect, useMemo } from "react";
import { addDays, format, isAfter, isSameDay, startOfDay } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import type { FlightSearchApiResponse } from "@/types/flight/flightResults.types";
import {
  setUiField,
  resetFlightUiState,
  setSearchField,
} from "@/redux/features/flightSearchSlice";
import FlightDetailSearch from "./FlightDetailSearch";
import FlightFilter from "./filters/FlightFilter";
import FlightTimer from "./FlightTimer";
import { useFlightSearchTicketListsQuery } from "@/redux/api/flightApi/flightSearch";
import FlightResultsHeader from "./flightResult/FlightResultsHeader";
import FlightResultsList from "./FlightResultsList";
import FlightResultsPagination from "./FlightResultsPagination";
import {
  buildFlightSearchPayload,
  buildSearchResetKey,
  extractFlights,
} from "./flightDetails.helpers";

const FlightDetailsMain = () => {
  const dispatch = useDispatch();
  const searchData = useSelector((state: RootState) => state.flightSearch);
  const ui = searchData.ui;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const searchResetKey = useMemo(
    () => buildSearchResetKey(searchData),
    [searchData],
  );

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
    [searchData, ui.currentPage, ui.sortBy, ui.sortOrder],
  );

  const { data, isLoading, isError, isFetching } =
    useFlightSearchTicketListsQuery(apiPayload, {
      skip:
        searchData.tripType === "multi-way"
          ? !searchData.segments?.[0]?.fromDest ||
            !searchData.segments?.[0]?.toDest
          : !searchData.fromDest || !searchData.toDest,
      refetchOnMountOrArgChange: false,
      refetchOnFocus: false,
      refetchOnReconnect: false,
    });

  const response = data as FlightSearchApiResponse | undefined;
  const flights = useMemo(() => extractFlights(response), [response]);

  const processedFlights = useMemo(() => {
    if (!ui.selectedAirlineCode) return flights;

    return flights.filter(
      (flight) => flight.airline?.code === ui.selectedAirlineCode,
    );
  }, [flights, ui.selectedAirlineCode]);

  const handlePageChange = (page: number) => {
    if (isFetching || page === ui.currentPage) return;
    dispatch(setUiField({ currentPage: page }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAirlineSelect = (airlineCode: string | null) => {
    dispatch(setUiField({ selectedAirlineCode: airlineCode, currentPage: 1 }));
  };

  const handleSortChange = (
    sortBy: "price" | "duration" | "departure_at",
    sortOrder: "asc" | "desc",
  ) => {
    if (isFetching) return;
    if (ui.sortBy === sortBy && ui.sortOrder === sortOrder) return;

    dispatch(setUiField({ sortBy, sortOrder, currentPage: 1 }));
  };

  const selectedDate = useMemo(
    () => startOfDay(new Date(searchData.departureDate)),
    [searchData.departureDate],
  );

  const today = startOfDay(new Date());
  const disablePrevDay =
    isSameDay(selectedDate, today) || !isAfter(selectedDate, today);

  const handleNextDay = () => {
    if (isFetching) return;

    dispatch(
      setSearchField({
        departureDate: addDays(selectedDate, 1).toISOString(),
      }),
    );
    dispatch(setUiField({ currentPage: 1, selectedAirlineCode: null }));
  };

  const handlePrevDay = () => {
    if (isFetching || disablePrevDay) return;

    dispatch(
      setSearchField({
        departureDate: addDays(selectedDate, -1).toISOString(),
      }),
    );
    dispatch(setUiField({ currentPage: 1, selectedAirlineCode: null }));
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
            <FlightResultsHeader
              isLoading={isLoading || isFetching}
              isError={isError}
              totalFlights={response?.data?.pagination?.total || flights.length}
              airlineSummary={response?.data?.airline_price_summary || []}
              selectedAirlineCode={ui.selectedAirlineCode}
              onAirlineSelect={handleAirlineSelect}
              onPrevDay={handlePrevDay}
              onNextDay={handleNextDay}
              disablePrevDay={disablePrevDay}
              disableNextDay={false}
              dateLabel={format(selectedDate, "dd MMM yyyy")}
              sortBy={ui.sortBy}
              sortOrder={ui.sortOrder}
              onSortChange={handleSortChange}
            />

            <FlightResultsList
              flights={processedFlights}
              isLoading={isLoading || isFetching}
              isError={isError}
            />

            {!isLoading &&
              !isError &&
              (response?.data?.pagination?.total_pages || 0) > 1 && (
                <FlightResultsPagination
                  currentPage={
                    response?.data?.pagination?.page || ui.currentPage
                  }
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
