import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { RootState } from "@/redux/store";
import { updateFilter } from "@/redux/features/flightSearchSlice";
import type { ScheduleFilterOption } from "@/types/flight/flightResults.types";

interface Props {
  data?: {
    departure: ScheduleFilterOption[];
    arrival: ScheduleFilterOption[];
  };
}

const FlightScheduleFilter = ({ data }: Props) => {
  const dispatch = useDispatch();
  const selectedDeparture = useSelector(
    (state: RootState) => state.flightSearch.filters.flight_schedules.departure,
  );
  const selectedArrival = useSelector(
    (state: RootState) => state.flightSearch.filters.flight_schedules.arrival,
  );

  if (!data) return null;

  return (
    <Card className="rounded-2xl border-0 bg-white shadow-none">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Flight Schedules</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="mb-2 text-sm font-semibold text-slate-600">Departure</p>
          <div className="grid grid-cols-2 gap-2">
            {data.departure.map((item) => (
              <Button
                key={item.value}
                variant={
                  selectedDeparture.includes(item.value) ? "default" : "outline"
                }
                className="justify-start rounded-xl"
                onClick={() =>
                  dispatch(
                    updateFilter({ category: "departure", value: item.value }),
                  )
                }
              >
                {item.label}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm font-semibold text-slate-600">Arrival</p>
          <div className="grid grid-cols-2 gap-2">
            {data.arrival.map((item) => (
              <Button
                key={item.value}
                variant={
                  selectedArrival.includes(item.value) ? "default" : "outline"
                }
                className="justify-start rounded-xl"
                onClick={() =>
                  dispatch(
                    updateFilter({ category: "arrival", value: item.value }),
                  )
                }
              >
                {item.label}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default FlightScheduleFilter;
