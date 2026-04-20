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

interface Props {
  availableFilters?: ApiFilters;
  isLoading: boolean;
}

const FlightFilter = ({ availableFilters, isLoading }: Props) => {
  const dispatch = useDispatch();

  return (
    <aside className="w-full rounded-3xl border border-border bg-muted/40 p-3 md:p-4">
      <div className="mb-3 flex items-center justify-between rounded-2xl border border-border bg-background px-4 py-3 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <SlidersHorizontal className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-foreground">Filters</h3>
            <p className="text-xs text-muted-foreground">Refine your flights</p>
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

      <div className="space-y-3">
        <PriceRangeFilter
          data={availableFilters?.price_range}
          isLoading={isLoading}
        />
        <LayoverDurationFilter
          data={availableFilters?.layover_duration}
          isLoading={isLoading}
        />
        <RefundabilityFilter data={availableFilters?.refundability || []} />
        <StopsFilter data={availableFilters?.stops || []} />
        <AirlinesFilter data={availableFilters?.airlines || []} />
        <LayoverCitiesFilter data={availableFilters?.layover_cities || []} />
        <FlightScheduleFilter data={availableFilters?.flight_schedules} />
        <AircraftFilter data={availableFilters?.aircraft || []} />
      </div>
    </aside>
  );
};

export default FlightFilter;