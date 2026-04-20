import { ChevronLeft, ChevronRight, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FlightMiniLoader } from "@/components/skeletons/FlightResultsSkeleton";

interface Props {
  isLoading: boolean;
  totalFlights: number;
  selectedAirlineCode: string | null;
  onClearAirline?: () => void;
  dateLabel?: string;
  onPrevDay?: () => void;
  onNextDay?: () => void;
  disablePrevDay: boolean;
  disableNextDay: boolean;
}

const FlightResultsSummaryBar = ({
  isLoading,
  totalFlights,
  selectedAirlineCode,
  onClearAirline,
  dateLabel,
  onPrevDay,
  onNextDay,
  disablePrevDay,
  disableNextDay,
}: Props) => {
  return (
    <Card className="overflow-hidden rounded-2xl border bg-card shadow-sm">
      <CardContent className="flex flex-col gap-4 p-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          {isLoading ? (
            <FlightMiniLoader />
          ) : (
            <h2 className="text-lg font-bold text-foreground sm:text-xl">
              {totalFlights} Available Flights
            </h2>
          )}

          {selectedAirlineCode && !isLoading && (
            <Button
              variant="secondary"
              size="sm"
              onClick={onClearAirline}
              className="h-8 rounded-full px-3"
            >
              <XCircle className="mr-1 h-4 w-4" />
              Clear filter
            </Button>
          )}

          {dateLabel && !isLoading && (
            <Badge variant="outline" className="rounded-full px-3 py-1 text-xs">
              {dateLabel}
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-2 self-start lg:self-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={onPrevDay}
            disabled={disablePrevDay || isLoading}
            className="h-10 rounded-full px-4"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Previous
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={onNextDay}
            disabled={disableNextDay || isLoading}
            className="h-10 rounded-full px-4"
          >
            Next
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FlightResultsSummaryBar;