import { format } from "date-fns";

import FlightDetailSearch from "./FlightDetailSearch";
import FlightFilter from "./filters/FlightFilter";
import FlightTimer from "./FlightTimer";
import FlightResultsHeader from "./flightResult/FlightResultsHeader";
import FlightResultsList from "./FlightResultsList";
import FlightResultsPagination from "./FlightResultsPagination";
import FlightFilterDrawer from "./filters/reusableComponents/FlightFilterDrawer";
import FlightResultsSortBar from "./flightResult/FlightResultsSortBar";

import { useFlightDetailsMain } from "./hooks/useFlightDetailsMain";

const FlightDetailsMain = () => {
  const {
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
  } = useFlightDetailsMain();

  const loading = isLoading || isFetching;

  return (
    <div className="mt-20 min-h-screen bg-slate-100/80 pb-10 dark:bg-background">
      <div className="sticky -top-6 z-20 lg:top-20">
        <div className="container mx-auto px-4 py-5">
          <FlightDetailSearch />
        </div>
      </div>

      <div className="sticky top-18 z-30 bg-slate-100/90 backdrop-blur-md dark:bg-background/90 lg:hidden">
        <div className="container mx-auto px-4">
          <div className="mx-auto pt-3">
            <div className="mt-3 grid grid-cols-2 gap-2">
              <FlightResultsHeader
                isLoading={loading}
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
                isLoading={loading}
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
              isLoading={loading}
            />
          </aside>

          <main className="space-y-4">
            <div className="hidden lg:block">
              <FlightResultsHeader
                isLoading={loading}
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
                  isLoading={loading}
                  sortBy={ui.sortBy}
                  sortOrder={ui.sortOrder}
                  onSortChange={handleSortChange}
                />
              </div>
            </div>

            <FlightResultsList
              flights={visibleFlights}
              isLoading={loading}
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