import type {
  AirlinePriceSummaryItem,
  ApiFilters,
} from "@/types/flight/flightResults.types";
import FlightResultsSummaryBar from "./FlightResultsSummaryBar";
import { Card, CardContent } from "@/components/ui/card";
import FlightResultsAirlineRow from "./FlightResultsAirlineRow";
import FlightResultsSortBar from "./FlightResultsSortBar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SlidersHorizontal } from "lucide-react";
import { MAX_RETRY_COUNT, shouldShowFlightLoadingState } from "@/lib/utils";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { SerializedError } from "@reduxjs/toolkit";
import { FlightMiniLoader } from "@/components/skeletons/FlightMiniLoader";

export type SortBy = "price" | "duration" | "departure_at";
export type SortOrder = "asc" | "desc";

interface Props {
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  error?: FetchBaseQueryError | SerializedError;
  retryCount: number;
  totalFlights: number;
  airlineSummary: AirlinePriceSummaryItem[];
  availableFilters?: ApiFilters;
  selectedAirlineCode?: string | null;
  onAirlineSelect?: (airlineCode: string | null) => void;
  onPrevDay?: () => void;
  onNextDay?: () => void;
  disablePrevDay?: boolean;
  disableNextDay?: boolean;
  dateLabel?: string;
  sortBy?: SortBy;
  sortOrder?: SortOrder;
  onSortChange?: (sortBy: SortBy, sortOrder: SortOrder) => void;
}

const FlightResultsHeader = ({
  isLoading,
  isFetching = false,
  isError,
  error,
  retryCount = 0,
  totalFlights,
  airlineSummary,
  selectedAirlineCode = null,
  onAirlineSelect,
  onPrevDay,
  onNextDay,
  disablePrevDay = false,
  disableNextDay = false,
  dateLabel,
  sortBy = "price",
  sortOrder = "asc",
  onSortChange,
}: Props) => {
  const isRateLimitError =
    isError && !!error && "status" in error && error.status === 429;

  const activeRetryCount = isRateLimitError ? retryCount : 0;

  const shouldShowLoadingState = shouldShowFlightLoadingState({
    isLoading,
    isFetching,
    isRateLimitError,
    activeRetryCount,
    maxRetryCount: MAX_RETRY_COUNT,
  });

  if (shouldShowLoadingState) {
    return <FlightMiniLoader />;
  }

  if (isError) {
    return (
      <Card className="rounded-sm border bg-card shadow-sm">
        <CardContent className="p-4 text-sm text-destructive">
          Failed to load flights.
        </CardContent>
      </Card>
    );
  }

  const headerContent = (
    <div className="space-y-4">
      <FlightResultsSummaryBar
        isLoading={isLoading}
        totalFlights={totalFlights}
        selectedAirlineCode={selectedAirlineCode}
        onClearAirline={() => onAirlineSelect?.(null)}
        dateLabel={dateLabel}
        onPrevDay={onPrevDay}
        onNextDay={onNextDay}
        disablePrevDay={disablePrevDay}
        disableNextDay={disableNextDay}
      />
      <div className="">
        <FlightResultsAirlineRow
          isLoading={isLoading}
          airlineSummary={airlineSummary}
        />
      </div>

      <div className="md:hidden bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
        <FlightResultsSortBar
          isLoading={isLoading}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortChange={onSortChange}
        />
      </div>
    </div>
  );

  return (
    <>
      <div className="w-full lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="h-11 w-full justify-center rounded-sm bg-background px-3 text-sm font-medium shadow-sm"
            >
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              <h1 className="text-[12px]">Flight Options</h1>
            </Button>
          </SheetTrigger>

          <SheetContent
            side="left"
            className="w-[92vw] max-w-sm overflow-y-auto p-4"
          >
            <SheetHeader className="mb-4">
              <SheetTitle>Flight Options</SheetTitle>
            </SheetHeader>

            {headerContent}
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden lg:block">{headerContent}</div>
    </>
  );
};

export default FlightResultsHeader;
