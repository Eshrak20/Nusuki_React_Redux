import { Plane } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import AirlineLogo from "@/components/AirlineLogo";
import { updateFilter } from "@/redux/features/flightSearchSlice";
import type { RootState } from "@/redux/store";
import type { AirlinePriceSummaryItem } from "@/types/flight/flightResults.types";

interface Props {
  isLoading: boolean;
  airlineSummary: AirlinePriceSummaryItem[];
}

const FlightResultsAirlineRow = ({
  isLoading,
  airlineSummary,
}: Props) => {
  const dispatch = useDispatch();

  const selectedAirlines = useSelector(
    (state: RootState) => state.flightSearch.filters.airlines,
  );

  if (!airlineSummary.length || isLoading) return null;

  const handleClick = (airlineCode: string) => {
    dispatch(updateFilter({ category: "airlines", value: airlineCode }));
  };

  return (
    <Card className="rounded-2xl border bg-card shadow-sm">
      <CardContent className="p-3">
        <div className="flex gap-3 overflow-x-auto pb-1">
          {airlineSummary.map((airline) => {
            const isActive = selectedAirlines.includes(airline.code);

            return (
              <button
                key={airline.code}
                type="button"
                onClick={() => handleClick(airline.code)}
                className={cn(
                  "group min-w-[220px] shrink-0 rounded-2xl border px-4 py-3 text-left transition-all duration-200",
                  "hover:-translate-y-0.5 hover:shadow-md",
                  "focus:outline-none focus:ring-2 focus:ring-primary/40",
                  isActive
                    ? "border-primary bg-primary text-primary-foreground shadow-md"
                    : "border-border bg-background hover:border-primary/40 hover:bg-muted/40"
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-full ring-1 transition-colors",
                      isActive
                        ? "bg-primary-foreground/10 ring-primary-foreground/20"
                        : "bg-muted ring-border"
                    )}
                  >
                    <AirlineLogo
                      logo={airline.logo}
                      name={airline.name}
                      code={airline.code}
                      className="h-10 w-10"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p
                      className={cn(
                        "truncate text-sm font-semibold transition-colors",
                        isActive ? "text-primary-foreground" : "text-foreground"
                      )}
                    >
                      {airline.name}
                    </p>

                    <div className="mt-1 flex items-center gap-1">
                      <Plane
                        className={cn(
                          "h-3.5 w-3.5 transition-colors",
                          isActive
                            ? "text-primary-foreground/80"
                            : "text-muted-foreground"
                        )}
                      />
                      <p
                        className={cn(
                          "text-sm font-medium transition-colors",
                          isActive
                            ? "text-primary-foreground/90"
                            : "text-muted-foreground"
                        )}
                      >
                        ৳ {airline.total_price}
                      </p>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default FlightResultsAirlineRow;