import { ChevronLeft, ChevronRight, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FlightMiniLoader } from "@/components/skeletons/FlightMiniLoader";

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
    <Card className="overflow-hidden rounded-3xl border bg-card shadow-sm">
      <CardContent className="p-4 sm:p-5">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0 space-y-2">
              {isLoading ? (
                <FlightMiniLoader />
              ) : (
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-lg font-bold leading-tight text-foreground sm:text-xl">
                    {totalFlights} Available Flights
                  </h2>

                  {dateLabel && (
                    <Badge
                      variant="outline"
                      className="rounded-full px-3 py-1 text-xs font-medium"
                    >
                      {dateLabel}
                    </Badge>
                  )}
                </div>
              )}

              {selectedAirlineCode && !isLoading && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={onClearAirline}
                  className="h-8 rounded-full px-3 text-xs sm:text-sm"
                >
                  <XCircle className="mr-1 h-4 w-4" />
                  Clear filter
                </Button>
              )}
            </div>

            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
              <Button
                variant="outline"
                size="sm"
                onClick={onPrevDay}
                disabled={disablePrevDay || isLoading}
                className="h-11 w-full rounded-full px-4 sm:w-auto"
              >
                <ChevronLeft className="mr-1 h-4 w-4" />
                Previous
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={onNextDay}
                disabled={disableNextDay || isLoading}
                className="h-11 w-full rounded-full px-4 sm:w-auto"
              >
                Next
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FlightResultsSummaryBar;