import type {
  AirlinePriceSummaryItem,
  ApiFilters,
} from "@/types/flight/flightResults.types";
import FlightResultsSummaryBar from "./FlightResultsSummaryBar";
import { Card, CardContent } from "@/components/ui/card";
import FlightResultsAirlineRow from "./FlightResultsAirlineRow";
import FlightResultsSortBar from "./FlightResultsSortBar";

export type SortBy = "price" | "duration" | "departure_at";
export type SortOrder = "asc" | "desc";

interface Props {
  isLoading: boolean;
  isError: boolean;
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
  isError,
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
  if (isError) {
    return (
      <Card className="rounded-2xl border bg-card shadow-sm">
        <CardContent className="p-4 text-sm text-destructive">
          Failed to load flights.
        </CardContent>
      </Card>
    );
  }

  return (
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

      <FlightResultsAirlineRow
        isLoading={isLoading}
        airlineSummary={airlineSummary}
        selectedAirlineCode={selectedAirlineCode}
        onAirlineSelect={onAirlineSelect}
      />

      <FlightResultsSortBar
        isLoading={isLoading}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSortChange={onSortChange}
      />
    </div>
  );
};

export default FlightResultsHeader;