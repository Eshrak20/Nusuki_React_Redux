import { useCallback, useState } from "react";

export type SortBy = "price" | "duration" | "departure_at";
export type SortOrder = "asc" | "desc";

export const useFlightDetailsUi = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAirlineCode, setSelectedAirlineCode] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortBy>("price");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [scheduleIndex, setScheduleIndex] = useState(0);

  const resetUiState = useCallback(() => {
    setCurrentPage(1);
    setSelectedAirlineCode(null);
    setSortBy("price");
    setSortOrder("asc");
    setScheduleIndex(0);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleAirlineSelect = useCallback((airlineCode: string | null) => {
    setSelectedAirlineCode(airlineCode);
    setCurrentPage(1);
  }, []);

  const handleSortChange = useCallback(
    (nextSortBy: SortBy, nextSortOrder: SortOrder) => {
      setSortBy(nextSortBy);
      setSortOrder(nextSortOrder);
      setCurrentPage(1);
    },
    []
  );

  const handlePrevSchedule = useCallback(() => {
    setScheduleIndex((prev) => Math.max(prev - 1, 0));
    setCurrentPage(1);
  }, []);

  const handleNextSchedule = useCallback((maxIndex: number) => {
    setScheduleIndex((prev) => Math.min(prev + 1, maxIndex));
    setCurrentPage(1);
  }, []);

  return {
    currentPage,
    selectedAirlineCode,
    sortBy,
    sortOrder,
    scheduleIndex,
    setScheduleIndex,
    resetUiState,
    handlePageChange,
    handleAirlineSelect,
    handleSortChange,
    handlePrevSchedule,
    handleNextSchedule,
  };
};