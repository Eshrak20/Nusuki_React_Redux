import { useEffect, useMemo } from "react";
import { addDays, isAfter, isSameDay, startOfDay } from "date-fns";
import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "@/redux/store";
import type { FlightSearchApiResponse } from "@/types/flight/flightResults.types";

import { setSearchField, setUiField } from "@/redux/features/flightSearchSlice";
import { startFlightSession } from "@/redux/features/flightSessionSlice";
import { useFlightSearchTicketListsQuery } from "@/redux/api/flightApi/flightSearch";

import { buildFlightSearchPayload } from "../flightDetails.helpers";

const DEFAULT_PAGE_SIZE = 20;

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

  const apiPayload = useMemo(() => {
    return buildFlightSearchPayload({
      searchData,
      currentPage: searchData.ui.currentPage,
      pageSize: DEFAULT_PAGE_SIZE,
      sortBy: searchData.ui.sortBy,
      sortOrder: searchData.ui.sortOrder,
    });
  }, [searchData]);

  const shouldSkip =
    searchData.tripType === "multi_way"
      ? !searchData.segments?.[0]?.fromDest || !searchData.segments?.[0]?.toDest
      : !searchData.fromDest || !searchData.toDest;

  const { data, isLoading, isError, isFetching, error, refetch } =
    useFlightSearchTicketListsQuery(apiPayload, {
      skip: shouldSkip,
      refetchOnMountOrArgChange: true,
      refetchOnFocus: false,
      refetchOnReconnect: false,
    });

  const response = data as FlightSearchApiResponse | undefined;

  const visibleFlights = useMemo(() => {
    return response?.data?.flights ?? [];
  }, [response]);

  const totalFlightsForHeader =
    response?.data?.pagination?.total ??
    response?.data?.statistics?.available_flights ??
    0;

  const totalPagesForPagination =
    response?.data?.pagination?.total_pages ?? 1;

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
    if (page < 1 || page > totalPagesForPagination) return;

    dispatch(setUiField({ currentPage: page }));

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