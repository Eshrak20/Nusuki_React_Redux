import { useEffect, useMemo, useReducer } from "react";
import { addDays, isAfter, isSameDay, startOfDay } from "date-fns";
import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "@/redux/store";
import type { FlightSearchApiResponse } from "@/types/flight/flightResults.types";

import { setSearchField, setUiField } from "@/redux/features/flightSearchSlice";
import { startFlightSession } from "@/redux/features/flightSessionSlice";
import { useFlightSearchTicketListsQuery } from "@/redux/api/flightApi/flightSearch";

import {
  buildFlightSearchPayload,
  buildSearchResetKey,
  getClientFilteredFlights,
  paginateFlights,
  sortFlightsClientSide,
} from "../flightDetails.helpers";

import {
  cacheReducer,
  createInitialCacheState,
} from "../flightDetails.cache";

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

export const useFlightDetailsMain = () => {
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
  const pageCache = cacheState.pageCache;

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

  const shouldSkip =
    searchData.tripType === "multi_way"
      ? !searchData.segments?.[0]?.fromDest || !searchData.segments?.[0]?.toDest
      : !searchData.fromDest || !searchData.toDest;

  const { data, isLoading, isError, isFetching, error, refetch } =
    useFlightSearchTicketListsQuery(apiPayload, {
      skip: shouldSkip,
      refetchOnMountOrArgChange: false,
      refetchOnFocus: false,
      refetchOnReconnect: false,
    });

  const response = data as FlightSearchApiResponse | undefined;

  useEffect(() => {
    if (!response) return;

    const incomingFlights = response?.data?.flights ?? [];
    const incomingPagination = response?.data?.pagination;

    cacheDispatch({
      type: "MERGE_RESPONSE",
      payload: {
        searchKey: searchResetKey,
        page: serverPage,
        flights: incomingFlights,
        totalPages: incomingPagination?.total_pages ?? 1,
        totalFlights: incomingPagination?.total ?? 0,
      },
    });
  }, [response, searchResetKey, serverPage]);

  const cachedFlights = useMemo(() => {
    return Object.keys(pageCache)
      .map(Number)
      .sort((a, b) => a - b)
      .flatMap((page) => pageCache[page] ?? []);
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

  const selectedDate = useMemo(
    () => startOfDay(new Date(searchData.departureDate)),
    [searchData.departureDate],
  );

  const today = startOfDay(new Date());

  const disablePrevDay =
    isSameDay(selectedDate, today) || !isAfter(selectedDate, today);

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

  return {
    ui,
    response,
    isLoading,
    isError,
    isFetching,
    error,
    refetch,

    visibleFlights,
    totalFlightsForHeader,
    totalPagesForPagination,
    shouldShowPagination,

    selectedDate,
    disablePrevDay,

    handlePageChange,
    handleAirlineSelect,
    handleSortChange,
    handleNextDay,
    handlePrevDay,
  };
};