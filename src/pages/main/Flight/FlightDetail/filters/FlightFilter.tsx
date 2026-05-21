import { Button } from "@/components/ui/button";
import type { ApiFilters } from "@/types/flight/flightResults.types";
import PriceRangeFilter from "./PriceRangeFilter";
import LayoverDurationFilter from "./LayoverDurationFilter";
import RefundabilityFilter from "./RefundabilityFilter";
import StopsFilter from "./StopsFilter";
import AirlinesFilter from "./AirlinesFilter";
import LayoverCitiesFilter from "./LayoverCitiesFilter";
import FlightScheduleFilter from "./FlightScheduleFilter";
import AircraftFilter from "./AircraftFilter";
import { useDispatch } from "react-redux";
import { resetFilters } from "@/redux/features/flightSearchSlice";
import { SlidersHorizontal, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  availableFilters?: ApiFilters;
  isLoading: boolean;
  className?: string;
  isDrawer?: boolean;
}

const FlightFilter = ({
  availableFilters,
  isLoading,
  className,
  isDrawer = false,
}: Props) => {
  const dispatch = useDispatch();

  return (
    <aside
      className={cn(
        "w-full rounded-3xl py-3 md:py-4",
        isDrawer && "rounded-none border-0 bg-transparent p-0 shadow-none",
        className,
      )}
    >
      {!isDrawer && (
        <div className="mb-3 flex items-center justify-between rounded-2xl border border-border bg-background px-4 py-3 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <SlidersHorizontal className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">Filters</h3>
              <p className="text-xs text-muted-foreground">
                Refine your flights
              </p>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="rounded-xl"
            onClick={() => dispatch(resetFilters())}
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>
      )}

      {isDrawer && (
        <div className="mb-4 flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            className="rounded-xl"
            onClick={() => dispatch(resetFilters())} 
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>
      )}

      <div className="space-y-3">
        <AirlinesFilter data={availableFilters?.airlines || []} />
        <AircraftFilter data={availableFilters?.aircraft || []} />
        <PriceRangeFilter
          data={availableFilters?.price_range}
          isLoading={isLoading}
        />
        <LayoverDurationFilter
          data={availableFilters?.layover_duration}
          isLoading={isLoading}
        />
        <FlightScheduleFilter data={availableFilters?.flight_schedules} />
        <StopsFilter data={availableFilters?.stops || []} />
        <RefundabilityFilter data={availableFilters?.refundability || []} />
        <LayoverCitiesFilter data={availableFilters?.layover_cities || []} />
      </div>
    </aside>
  );
};

export default FlightFilter;
