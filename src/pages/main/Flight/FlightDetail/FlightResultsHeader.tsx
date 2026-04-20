import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { AirlinePriceSummaryItem } from "@/types/flight/flightResults.types";
import AirlineLogo from "@/components/AirlineLogo";

interface Props {
  isLoading: boolean;
  isError: boolean;
  totalFlights: number;
  airlineSummary: AirlinePriceSummaryItem[];
}

const FlightResultsHeader = ({
  isLoading,
  isError,
  totalFlights,
  airlineSummary,
}: Props) => {
  if (isLoading) {
    return (
      <Card className="rounded-2xl border-0 shadow-none">
        <CardContent className="p-4 text-sm text-slate-500">
          Loading flights...
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="rounded-2xl border-0 shadow-none">
        <CardContent className="p-4 text-sm text-red-500">
          Failed to load flights.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 gap-3 xl:grid-cols-[220px_minmax(0,1fr)]">
        <Card className="rounded-2xl border-0 bg-white shadow-none">
          <CardContent className="flex items-center justify-between p-4">
            <p className="text-lg font-bold text-slate-900">
              {totalFlights} Available Flights
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-0 bg-white shadow-none">
          <CardContent className="flex items-center gap-3 overflow-x-auto p-3">
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 rounded-full shrink-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {airlineSummary.map((airline) => (
              <div
                key={airline.code}
                className="min-w-45 rounded-xl border bg-slate-50 px-4 py-3"
              >
                <div className="flex items-center gap-2">
                  <AirlineLogo
                    logo={airline.logo}
                    name={airline.name}
                    code={airline.code}
                    className="h-12 w-12"
                  />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {airline.name}
                    </p>
                    <p className="text-sm text-slate-600">
                      ৳ {airline.total_price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 rounded-full shrink-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <Button
          variant="secondary"
          className="h-11 rounded-xl bg-white text-slate-800"
        >
          Show Cheapest First
        </Button>
        <Button
          variant="secondary"
          className="h-11 rounded-xl bg-white text-slate-800"
        >
          Show Shortest Duration
        </Button>
        <Button
          variant="secondary"
          className="h-11 rounded-xl bg-white text-slate-800"
        >
          Show Earliest First
        </Button>
      </div>
    </div>
  );
};

export default FlightResultsHeader;
