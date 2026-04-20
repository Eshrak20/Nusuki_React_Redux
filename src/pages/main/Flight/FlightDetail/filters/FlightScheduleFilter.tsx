import { useDispatch, useSelector } from "react-redux";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Sunrise, Sun, Sunset, Moon } from "lucide-react";
import type { RootState } from "@/redux/store";
import { updateFilter } from "@/redux/features/flightSearchSlice";
import type { ScheduleFilterOption } from "@/types/flight/flightResults.types";
import FlightFilterSection from "./reusableComponents/FlightFilterSection";

interface Props {
  data?: {
    departure: ScheduleFilterOption[];
    arrival: ScheduleFilterOption[];
  };
}

const getIcon = (label: string) => {
  const l = label.toLowerCase();
  if (l.includes("00-06")) return <Moon className="h-4 w-4" />;
  if (l.includes("06-12")) return <Sunrise className="h-4 w-4" />;
  if (l.includes("12-18")) return <Sun className="h-4 w-4" />;
  return <Sunset className="h-4 w-4" />;
};

const FlightScheduleFilter = ({ data }: Props) => {
  const dispatch = useDispatch();

  const selectedDeparture = useSelector(
    (state: RootState) => state.flightSearch.filters.flight_schedules.departure
  );

  const selectedArrival = useSelector(
    (state: RootState) => state.flightSearch.filters.flight_schedules.arrival
  );

  if (!data) return null;

  return (
    <FlightFilterSection value="flight-schedules" title="Flight Schedules">
      <Tabs defaultValue="departure" className="w-full">
        <TabsList className="grid h-11 w-full grid-cols-2 rounded-xl bg-muted p-1">
          <TabsTrigger value="departure" className="rounded-lg">
            Departure
          </TabsTrigger>
          <TabsTrigger value="arrival" className="rounded-lg">
            Arrival
          </TabsTrigger>
        </TabsList>

        <TabsContent value="departure" className="mt-4 space-y-3">
          <p className="text-xs font-medium text-muted-foreground">
            Departure from DAC
          </p>
          <div className="grid grid-cols-2 gap-2">
            {data.departure.map((item) => {
              const isActive = selectedDeparture.includes(item.value);

              return (
                <Button
                  key={item.value}
                  type="button"
                  variant="outline"
                  onClick={() =>
                    dispatch(updateFilter({ category: "departure", value: item.value }))
                  }
                  className={[
                    "h-auto flex-col rounded-xl border px-3 py-3 text-center",
                    isActive
                      ? "border-primary bg-primary/10 text-primary"
                      : "bg-background hover:bg-accent"
                  ].join(" ")}
                >
                  {getIcon(item.label)}
                  <span className="mt-2 text-xs font-medium">{item.label}</span>
                </Button>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="arrival" className="mt-4 space-y-3">
          <p className="text-xs font-medium text-muted-foreground">
            Arrival to destination
          </p>
          <div className="grid grid-cols-2 gap-2">
            {data.arrival.map((item) => {
              const isActive = selectedArrival.includes(item.value);

              return (
                <Button
                  key={item.value}
                  type="button"
                  variant="outline"
                  onClick={() =>
                    dispatch(updateFilter({ category: "arrival", value: item.value }))
                  }
                  className={[
                    "h-auto flex-col rounded-xl border px-3 py-3 text-center",
                    isActive
                      ? "border-primary bg-primary/10 text-primary"
                      : "bg-background hover:bg-accent"
                  ].join(" ")}
                >
                  {getIcon(item.label)}
                  <span className="mt-2 text-xs font-medium">{item.label}</span>
                </Button>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </FlightFilterSection>
  );
};

export default FlightScheduleFilter;