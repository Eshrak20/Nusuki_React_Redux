import { useDispatch, useSelector } from "react-redux";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Sunrise, Sun, Sunset, Moon, X } from "lucide-react";
import type { RootState } from "@/redux/store";
import { updateFilter } from "@/redux/features/flightSearchSlice";
import type { ScheduleFilterOption } from "@/types/flight/flightResults.types";
import FlightFilterSection from "./reusableComponents/FlightFilterSection";
import { cn } from "@/lib/utils";

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

const ScheduleOptionButton = ({
  item,
  isActive,
  onClick,
}: {
  item: ScheduleFilterOption;
  isActive: boolean;
  onClick: () => void;
}) => {
  return (
    <Button
      type="button"
      variant="outline"
      onClick={onClick}
      className={cn(
        "h-auto min-h-[92px] flex-col rounded-2xl border px-3 py-4 text-center shadow-sm transition-all duration-200",
        "hover:scale-[1.01] hover:shadow-md",
        "focus-visible:ring-2 focus-visible:ring-primary/40",
        isActive
          ? [
              "border-primary bg-primary text-primary-foreground",
              "hover:bg-primary/90 hover:text-primary-foreground",
              "dark:border-primary dark:bg-primary dark:text-primary-foreground",
            ]
          : [
              "border-border bg-background text-foreground",
              "hover:border-primary/40 hover:bg-accent",
              "dark:bg-background dark:text-foreground dark:hover:bg-accent",
            ]
      )}
    >
      <div
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-full transition-colors",
          isActive
            ? "bg-primary-foreground/15 text-primary-foreground"
            : "bg-muted text-muted-foreground dark:bg-muted/80"
        )}
      >
        {getIcon(item.label)}
      </div>

      <span
        className={cn(
          "mt-2 text-xs font-semibold",
          isActive
            ? "text-primary-foreground"
            : "text-foreground dark:text-foreground"
        )}
      >
        {item.label}
      </span>

      <span
        className={cn(
          "mt-1 text-[11px]",
          isActive
            ? "text-primary-foreground/80"
            : "text-muted-foreground"
        )}
      >
        {item.count} flights
      </span>
    </Button>
  );
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

  const hasSelected =
    selectedDeparture.length > 0 || selectedArrival.length > 0;

  const clearDeparture = () => {
    selectedDeparture.forEach((value) => {
      dispatch(updateFilter({ category: "departure", value }));
    });
  };

  const clearArrival = () => {
    selectedArrival.forEach((value) => {
      dispatch(updateFilter({ category: "arrival", value }));
    });
  };

  const clearAll = () => {
    clearDeparture();
    clearArrival();
  };

  return (
    <FlightFilterSection value="flight-schedules" title="Flight Schedules">
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-foreground">
              Choose your preferred timing
            </p>
            <p className="text-xs text-muted-foreground">
              Filter by departure or arrival time slots
            </p>
          </div>

          {hasSelected && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={clearAll}
              className="h-8 rounded-lg px-3 text-xs font-medium text-muted-foreground hover:text-destructive"
            >
              <X className="mr-1 h-3.5 w-3.5" />
              Clear
            </Button>
          )}
        </div>

        <Tabs defaultValue="departure" className="w-full">
          <TabsList className="grid h-11 w-full grid-cols-2 rounded-xl bg-muted p-1">
            <TabsTrigger
              value="departure"
              className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm"
            >
              Departure
            </TabsTrigger>
            <TabsTrigger
              value="arrival"
              className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm"
            >
              Arrival
            </TabsTrigger>
          </TabsList>

          <TabsContent value="departure" className="mt-4 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-medium text-muted-foreground">
                Departure from DAC
              </p>

              {selectedDeparture.length > 0 && (
                <button
                  type="button"
                  onClick={clearDeparture}
                  className="text-xs font-medium text-primary hover:underline"
                >
                  Clear departure
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              {data.departure.map((item) => {
                const isActive = selectedDeparture.includes(item.value);

                return (
                  <ScheduleOptionButton
                    key={item.value}
                    item={item}
                    isActive={isActive}
                    onClick={() =>
                      dispatch(
                        updateFilter({
                          category: "departure",
                          value: item.value,
                        })
                      )
                    }
                  />
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="arrival" className="mt-4 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-medium text-muted-foreground">
                Arrival to destination
              </p>

              {selectedArrival.length > 0 && (
                <button
                  type="button"
                  onClick={clearArrival}
                  className="text-xs font-medium text-primary hover:underline"
                >
                  Clear arrival
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              {data.arrival.map((item) => {
                const isActive = selectedArrival.includes(item.value);

                return (
                  <ScheduleOptionButton
                    key={item.value}
                    item={item}
                    isActive={isActive}
                    onClick={() =>
                      dispatch(
                        updateFilter({
                          category: "arrival",
                          value: item.value,
                        })
                      )
                    }
                  />
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </FlightFilterSection>
  );
};

export default FlightScheduleFilter;