import { useEffect, useMemo } from "react";
import { addDays, format, isAfter, isSameDay, startOfDay } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import type { FlightSearchApiResponse } from "@/types/flight/flightResults.types";
import { setUiField, setSearchField } from "@/redux/features/flightSearchSlice";
import FlightDetailSearch from "./FlightDetailSearch";
import FlightFilter from "./filters/FlightFilter";
import FlightTimer from "./FlightTimer";
import { useFlightSearchTicketListsQuery } from "@/redux/api/flightApi/flightSearch";
import FlightResultsHeader from "./flightResult/FlightResultsHeader";
import FlightResultsList from "./FlightResultsList";
import FlightResultsPagination from "./FlightResultsPagination";
import {
  buildFlightSearchPayload,
  extractFlights,
  getClientFilteredFlights,
  paginateFlights,
  sortFlightsClientSide,
} from "./flightDetails.helpers";
import FlightFilterDrawer from "./filters/reusableComponents/FlightFilterDrawer";
import FlightResultsSortBar from "./flightResult/FlightResultsSortBar";
import { startFlightSession } from "@/redux/features/flightSessionSlice";

const API_FETCH_SIZE = 100;
const CLIENT_PAGE_SIZE = 20;

const FlightDetailsMain = () => {
  const dispatch = useDispatch();
  const searchData = useSelector((state: RootState) => state.flightSearch);
  const ui = searchData.ui;
  const expiresAt = useSelector(
    (state: RootState) => state.flightSession?.expiresAt ?? null
  );

  useEffect(() => {
    if (!expiresAt) {
      dispatch(startFlightSession(15 * 60));
    }
  }, [dispatch, expiresAt]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (ui.currentPage !== 1) {
      dispatch(setUiField({ currentPage: 1 }));
    }
  }, [dispatch, searchData.filters, ui.currentPage]);

  const apiPayload = buildFlightSearchPayload({
    searchData,
    currentPage: 1,
    pageSize: API_FETCH_SIZE,
    sortBy: "price",
    sortOrder: "asc",
  });

  const { data, isLoading, isError, isFetching, error, refetch } =
    useFlightSearchTicketListsQuery(apiPayload, {
      skip:
        searchData.tripType === "multi_way"
          ? !searchData.segments?.[0]?.fromDest ||
          !searchData.segments?.[0]?.toDest
          : !searchData.fromDest || !searchData.toDest,
      refetchOnMountOrArgChange: false,
      refetchOnFocus: false,
      refetchOnReconnect: false,
    });

  const response = data as FlightSearchApiResponse;
  const flights = useMemo(() => extractFlights(response), [response]);
  const pagination = response?.data?.pagination
  const total = pagination?.total;


  const filteredFlights = useMemo(() => {
    return getClientFilteredFlights({
      flights: flights,
      filters: searchData.filters,
      selectedAirlineCode: ui.selectedAirlineCode,
    });
  }, [flights, searchData.filters, ui.selectedAirlineCode]);

  const sortedFlights = useMemo(() => {
    return sortFlightsClientSide({
      flights: filteredFlights,
      sortBy: ui.sortBy,
      sortOrder: ui.sortOrder,
    });
  }, [filteredFlights, ui.sortBy, ui.sortOrder]);

  const totalPages = Math.max(
    1,
    Math.ceil(sortedFlights.length / CLIENT_PAGE_SIZE)
  );

  const safeCurrentPage = Math.min(ui.currentPage, totalPages);

  const paginatedFlights = useMemo(() => {
    return paginateFlights({
      flights: sortedFlights,
      currentPage: safeCurrentPage,
      pageSize: CLIENT_PAGE_SIZE,
    });
  }, [sortedFlights, safeCurrentPage]);

  const handlePageChange = (page: number) => {
    if (page === safeCurrentPage) return;
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
    if (ui.sortBy === sortBy && ui.sortOrder === sortOrder) return;
    dispatch(setUiField({ sortBy, sortOrder, currentPage: 1 }));
  };

  const selectedDate = useMemo(
    () => startOfDay(new Date(searchData.departureDate)),
    [searchData.departureDate]
  );

  const today = startOfDay(new Date());
  const disablePrevDay =
    isSameDay(selectedDate, today) || !isAfter(selectedDate, today);

  const handleNextDay = () => {
    dispatch(
      setSearchField({
        departureDate: addDays(selectedDate, 1).toISOString(),
      })
    );
    dispatch(setUiField({ currentPage: 1, selectedAirlineCode: null }));
  };

  const handlePrevDay = () => {
    if (disablePrevDay) return;

    dispatch(
      setSearchField({
        departureDate: addDays(selectedDate, -1).toISOString(),
      })
    );
    dispatch(setUiField({ currentPage: 1, selectedAirlineCode: null }));
  };

  return (
    <div className="mt-20 min-h-screen bg-slate-100/80 pb-10 dark:bg-background">
      <div className="sticky -top-6 z-20 lg:top-20">
        <div className="container mx-auto px-4 py-5">
          <FlightDetailSearch />
        </div>
      </div>

      <div className="sticky top-18 z-30 bg-slate-100/90 backdrop-blur-md dark:bg-background/90 lg:hidden">
        <div className="container mx-auto px-4 lg:py-3">
          <div className="mx-auto pt-3">
            <div className="flex justify-center">
              <div className="hidden w-full max-w-60 lg:block">
                <FlightTimer compact />
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <FlightResultsHeader
                isLoading={isLoading || isFetching}
                isError={isError}
                error={error}
                isFetching={isFetching}
                retryCount={7}
                totalFlights={sortedFlights.length}
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

              <FlightFilterDrawer
                availableFilters={response?.data?.filters}
                isLoading={isLoading || isFetching}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
          <aside className="hidden space-y-4 lg:block">
            <FlightTimer />
            <FlightFilter
              availableFilters={response?.data?.filters}
              isLoading={isLoading || isFetching}
            />
          </aside>

          <main className="space-y-4">
            <div className="hidden lg:block">
              <FlightResultsHeader
                isLoading={isLoading || isFetching}
                isError={isError}
                error={error}
                totalFlights={sortedFlights.length}
                isFetching={isFetching}
                retryCount={7}
                airlineSummary={response?.data?.airline_price_summary || []}
                selectedAirlineCode={ui.selectedAirlineCode}
                onAirlineSelect={handleAirlineSelect}
                onPrevDay={handlePrevDay}
                onNextDay={handleNextDay}
                disablePrevDay={disablePrevDay}
                disableNextDay={false}
                dateLabel={format(selectedDate, "dd MMM yyyy")}
              />
            </div>

            <div className="sticky top-32 z-20 hidden lg:block">
              <div className="rounded-2xl bg-background/95 p-3 backdrop-blur supports-backdrop-filter:bg-background/80">
                <FlightResultsSortBar
                  isLoading={isLoading || isFetching}
                  sortBy={ui.sortBy}
                  sortOrder={ui.sortOrder}
                  onSortChange={handleSortChange}
                />
              </div>
            </div>

            <FlightResultsList
              flights={paginatedFlights}
              isLoading={isLoading || isFetching}
              isError={isError}
              error={error}
              onRetry={refetch}
            />

            {
             total >= pagination?.size &&
              <FlightResultsPagination
                currentPage={response?.data?.pagination?.page || ui.currentPage}
                totalPages={response?.data?.pagination?.total_pages || 1}
                onPageChange={handlePageChange}
              />
            }

          </main>
        </div>
      </div>
    </div>
  );
};

export default FlightDetailsMain;