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

interface Props {
  availableFilters?: ApiFilters;
  isLoading: boolean;
}

const FlightFilter = ({ availableFilters, isLoading }: Props) => {
  const dispatch = useDispatch();

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between rounded-2xl bg-white p-4">
        <h3 className="text-lg font-bold text-slate-900">Filters</h3>
        <Button variant="ghost" size="sm" onClick={() => dispatch(resetFilters())}>Reset</Button>
      </div>

      <PriceRangeFilter data={availableFilters?.price_range} isLoading={isLoading} />
      <LayoverDurationFilter data={availableFilters?.layover_duration} isLoading={isLoading} />
      <RefundabilityFilter data={availableFilters?.refundability || []} />
      <StopsFilter data={availableFilters?.stops || []} />
      <AirlinesFilter data={availableFilters?.airlines || []} />
      <LayoverCitiesFilter data={availableFilters?.layover_cities || []} />
      <FlightScheduleFilter data={availableFilters?.flight_schedules} />
      <AircraftFilter data={availableFilters?.aircraft || []} />
    </div>
  );
};

export default FlightFilter;