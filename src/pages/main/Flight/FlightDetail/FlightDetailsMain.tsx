import { useEffect, useMemo, useReducer } from "react";
import { addDays, format, isAfter, isSameDay, startOfDay } from "date-fns";
import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "@/redux/store";
import type {
  FlightResultItem,
  FlightSearchApiResponse,
} from "@/types/flight/flightResults.types";

import { setSearchField, setUiField } from "@/redux/features/flightSearchSlice";
import { startFlightSession } from "@/redux/features/flightSessionSlice";

import FlightDetailSearch from "./FlightDetailSearch";
import FlightFilter from "./filters/FlightFilter";
import FlightTimer from "./FlightTimer";
import FlightResultsHeader from "./flightResult/FlightResultsHeader";
import FlightResultsList from "./FlightResultsList";
import FlightResultsPagination from "./FlightResultsPagination";
import FlightFilterDrawer from "./filters/reusableComponents/FlightFilterDrawer";
import FlightResultsSortBar from "./flightResult/FlightResultsSortBar";

import { useFlightSearchTicketListsQuery } from "@/redux/api/flightApi/flightSearch";
import {
  buildFlightSearchPayload,
  buildSearchResetKey,
  getClientFilteredFlights,
  paginateFlights,
  sortFlightsClientSide,
} from "./flightDetails.helpers";

const DEFAULT_PAGE_SIZE = 20;
const DEFAULT_SERVER_SORT_BY = "price" as const;
const DEFAULT_SERVER_SORT_ORDER = "asc" as const;
const EMPTY_FILTERS = {
  refundability: [] as string[],
  stops: [] as number[],
  airlines: [] as string[],
  layover_cities: [] as string[],
  flight_schedules: {
    departure: [] as string[],
    arrival: [] as string[],
  },
  aircraft: [] as string[],
  price_min: null as number | null,
  price_max: null as number | null,
  layover_duration_min: null as number | null,
  layover_duration_max: null as number | null,
};

type CacheState = {
  searchKey: string;
  serverPage: number;
  serverTotalPages: number;
  serverTotalFlights: number;
  pageCache: Record<number, FlightResultItem[]>;
};

type CacheAction =
  | {
      type: "SET_SERVER_PAGE";
      payload: {
        searchKey: string;
        page: number;
      };
    }
  | {
      type: "MERGE_RESPONSE";
      payload: {
        searchKey: string;
        page: number;
        flights: FlightResultItem[];
        totalPages: number;
        totalFlights: number;
      };
    };

const createInitialCacheState = (searchKey: string): CacheState => ({
  searchKey,
  serverPage: 1,
  serverTotalPages: 1,
  serverTotalFlights: 0,
  pageCache: {},
});

const cacheReducer = (state: CacheState, action: CacheAction): CacheState => {
  switch (action.type) {
    case "SET_SERVER_PAGE": {
      const { searchKey, page } = action.payload;

      if (state.searchKey !== searchKey) {
        return {
          searchKey,
          serverPage: page,
          serverTotalPages: 1,
          serverTotalFlights: 0,
          pageCache: {},
        };
      }

      if (state.serverPage === page) return state;

      return {
        ...state,
        serverPage: page,
      };
    }

    case "MERGE_RESPONSE": {
      const { searchKey, page, flights, totalPages, totalFlights } =
        action.payload;

      const baseState =
        state.searchKey === searchKey
          ? state
          : {
              searchKey,
              serverPage: page,
              serverTotalPages: 1,
              serverTotalFlights: 0,
              pageCache: {},
            };

      return {
        searchKey,
        serverPage: page,
        serverTotalPages: totalPages,
        serverTotalFlights: totalFlights,
        pageCache: {
          ...baseState.pageCache,
          [page]: flights,
        },
      };
    }

    default:
      return state;
  }
};

const FlightDetailsMain = () => {
  const dispatch = useDispatch();

  const searchData = useSelector((state: RootState) => state.flightSearch);
  const ui = searchData.ui;

  const expiresAt = useSelector(
    (state: RootState) => state.flightSession?.expiresAt ?? null,
  );

  useEffect(() => {
    if (!expiresAt) {
      dispatch(startFlightSession(15 * 60));
    }
  }, [dispatch, expiresAt]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const searchResetKey = useMemo(
    () => buildSearchResetKey(searchData),
    [searchData],
  );

  const [cacheState, cacheDispatch] = useReducer(
    cacheReducer,
    searchResetKey,
    createInitialCacheState,
  );

  const isSameSearch = cacheState.searchKey === searchResetKey;

  const serverPage = isSameSearch ? cacheState.serverPage : 1;
  const serverTotalPages = isSameSearch ? cacheState.serverTotalPages : 1;
  const serverTotalFlights = isSameSearch ? cacheState.serverTotalFlights : 0;
  const pageCache = useMemo(() => cacheState.pageCache, [cacheState.pageCache]);

  const serverQuerySearchData = useMemo(() => {
    return {
      ...searchData,
      filters: EMPTY_FILTERS,
      ui: {
        ...searchData.ui,
        selectedAirlineCode: null,
      },
    };
  }, [searchData]);

  const apiPayload = useMemo(() => {
    return buildFlightSearchPayload({
      searchData: serverQuerySearchData,
      currentPage: serverPage,
      pageSize: DEFAULT_PAGE_SIZE,
      sortBy: DEFAULT_SERVER_SORT_BY,
      sortOrder: DEFAULT_SERVER_SORT_ORDER,
    });
  }, [serverPage, serverQuerySearchData]);

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

  const response = data as FlightSearchApiResponse | undefined;

  useEffect(() => {
    if (!response) return;

    const incomingFlights = response?.data?.flights ?? [];
    const incomingPagination = response?.data?.pagination;
    const totalPages = incomingPagination?.total_pages ?? 1;
    const totalFlights = incomingPagination?.total ?? 0;

    cacheDispatch({
      type: "MERGE_RESPONSE",
      payload: {
        searchKey: searchResetKey,
        page: serverPage,
        flights: incomingFlights,
        totalPages,
        totalFlights,
      },
    });
  }, [response, searchResetKey, serverPage]);

  const cachedFlights = useMemo(() => {
    const pages = Object.keys(pageCache)
      .map(Number)
      .sort((a, b) => a - b);

    return pages.flatMap((page) => pageCache[page] ?? []);
  }, [pageCache]);

  const filteredFlights = useMemo(() => {
    return getClientFilteredFlights({
      flights: cachedFlights,
      filters: searchData.filters,
      selectedAirlineCode: ui.selectedAirlineCode,
    });
  }, [cachedFlights, searchData.filters, ui.selectedAirlineCode]);

  const sortedFlights = useMemo(() => {
    return sortFlightsClientSide({
      flights: filteredFlights,
      sortBy: ui.sortBy,
      sortOrder: ui.sortOrder,
    });
  }, [filteredFlights, ui.sortBy, ui.sortOrder]);

  const visibleFlights = useMemo(() => {
    return paginateFlights({
      flights: sortedFlights,
      currentPage: ui.currentPage,
      pageSize: DEFAULT_PAGE_SIZE,
    });
  }, [sortedFlights, ui.currentPage]);

  const loadedPageNumbers = useMemo(() => {
    return Object.keys(pageCache).map(Number);
  }, [pageCache]);

  const highestLoadedPage = loadedPageNumbers.length
    ? Math.max(...loadedPageNumbers)
    : 0;

  const totalFlightsForHeader =
    response?.data?.pagination?.total ??
    response?.data?.statistics?.available_flights ??
    serverTotalFlights;

  const totalPagesForPagination =
    response?.data?.pagination?.total_pages ?? serverTotalPages;

  const shouldShowPagination =
    totalPagesForPagination > 1 && totalFlightsForHeader > DEFAULT_PAGE_SIZE;

  const handlePageChange = (page: number) => {
    if (page === ui.currentPage) return;

    dispatch(setUiField({ currentPage: page }));

    const hasThisPageCached = !!pageCache[page];
    const shouldFetchFromApi =
      !hasThisPageCached &&
      page > highestLoadedPage &&
      page <= totalPagesForPagination;

    if (shouldFetchFromApi) {
      cacheDispatch({
        type: "SET_SERVER_PAGE",
        payload: {
          searchKey: searchResetKey,
          page,
        },
      });
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAirlineSelect = (airlineCode: string | null) => {
    dispatch(
      setUiField({
        selectedAirlineCode: airlineCode,
        currentPage: 1,
      }),
    );
  };

  const handleSortChange = (
    sortBy: "price" | "duration" | "departure_at",
    sortOrder: "asc" | "desc",
  ) => {
    if (ui.sortBy === sortBy && ui.sortOrder === sortOrder) return;

    dispatch(
      setUiField({
        sortBy,
        sortOrder,
        currentPage: 1,
      }),
    );
  };

  const selectedDate = useMemo(
    () => startOfDay(new Date(searchData.departureDate)),
    [searchData.departureDate],
  );

  const today = startOfDay(new Date());
  const disablePrevDay =
    isSameDay(selectedDate, today) || !isAfter(selectedDate, today);

  const handleNextDay = () => {
    dispatch(
      setSearchField({
        departureDate: addDays(selectedDate, 1).toISOString(),
      }),
    );

    dispatch(
      setUiField({
        currentPage: 1,
        selectedAirlineCode: null,
      }),
    );
  };

  const handlePrevDay = () => {
    if (disablePrevDay) return;

    dispatch(
      setSearchField({
        departureDate: addDays(selectedDate, -1).toISOString(),
      }),
    );

    dispatch(
      setUiField({
        currentPage: 1,
        selectedAirlineCode: null,
      }),
    );
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
                totalFlights={totalFlightsForHeader}
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
                totalFlights={totalFlightsForHeader}
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
              flights={visibleFlights}
              isLoading={isLoading || isFetching}
              isError={isError}
              error={error}
              onRetry={refetch}
            />

            {shouldShowPagination && (
              <FlightResultsPagination
                currentPage={ui.currentPage}
                totalPages={totalPagesForPagination}
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
