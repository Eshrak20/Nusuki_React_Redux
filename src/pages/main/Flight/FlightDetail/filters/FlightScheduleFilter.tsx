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

  if (l.includes("00-06")) return <Moon className="h-3.5 w-3.5" />;
  if (l.includes("06-12")) return <Sunrise className="h-3.5 w-3.5" />;
  if (l.includes("12-18")) return <Sun className="h-3.5 w-3.5" />;

  return <Sunset className="h-3.5 w-3.5" />;
};

const formatCount = (count: number) => {
  if (count === 0) return "No flights";
  if (count === 1) return "1 flight";
  return `${count} flights`;
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
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group flex min-h-[38px] w-full items-center justify-between rounded-md border px-3 py-2 text-left transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
        isActive
          ? "border-primary/80 bg-primary/10 text-primary dark:border-primary/70 dark:bg-primary/15"
          : "border-border/80 bg-muted/25 text-foreground hover:border-primary/30 hover:bg-accent/60 dark:bg-muted/15"
      )}
    >
      <div className="flex min-w-0 items-center gap-2.5">
        <div
          className={cn(
            "flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-colors",
            isActive
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground group-hover:text-foreground"
          )}
        >
          {getIcon(item.label)}
        </div>

        <span
          className={cn(
            "truncate text-[12px] font-medium tracking-tight",
            isActive ? "text-primary dark:text-primary-foreground" : "text-foreground"
          )}
        >
          {item.label}
        </span>
      </div>

      <span
        className={cn(
          "ml-3 shrink-0 text-[11px] font-medium",
          isActive
            ? "text-primary/90 dark:text-primary-foreground/85"
            : "text-muted-foreground"
        )}
      >
        {formatCount(item.count)}
      </span>
    </button>
  );
};

const SectionMeta = ({
  label,
  onClear,
  hasSelected,
}: {
  label: string;
  onClear: () => void;
  hasSelected: boolean;
}) => {
  return (
    <div className="flex items-center justify-between gap-2">
      <p className="text-[12px] font-medium text-muted-foreground">{label}</p>

      {hasSelected && (
        <button
          type="button"
          onClick={onClear}
          className="text-[11px] font-medium text-primary transition hover:opacity-80"
        >
          Clear
        </button>
      )}
    </div>
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
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-0.5">
            <p className="text-sm font-semibold text-foreground">
              Choose preferred timing
            </p>
            <p className="text-[11px] text-muted-foreground">
              Filter by departure or arrival slots
            </p>
          </div>

          {hasSelected && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={clearAll}
              className="h-7 rounded-md px-2 text-[11px] font-medium text-muted-foreground hover:text-destructive"
            >
              <X className="mr-1 h-3.5 w-3.5" />
              Clear
            </Button>
          )}
        </div>

        <Tabs defaultValue="departure" className="w-full">
          <TabsList className="grid h-9 w-full grid-cols-2 rounded-lg bg-muted/70 p-0.5">
            <TabsTrigger
              value="departure"
              className="rounded-md text-xs font-medium data-[state=active]:bg-background data-[state=active]:shadow-none"
            >
              Departure
            </TabsTrigger>
            <TabsTrigger
              value="arrival"
              className="rounded-md text-xs font-medium data-[state=active]:bg-background data-[state=active]:shadow-none"
            >
              Arrival
            </TabsTrigger>
          </TabsList>

          <TabsContent value="departure" className="mt-3 space-y-2.5">
            <SectionMeta
              label="Departure from DAC"
              onClear={clearDeparture}
              hasSelected={selectedDeparture.length > 0}
            />

            <div className="grid grid-cols-2 gap-2">
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

          <TabsContent value="arrival" className="mt-3 space-y-2.5">
            <SectionMeta
              label="Arrival to destination"
              onClear={clearArrival}
              hasSelected={selectedArrival.length > 0}
            />

            <div className="grid grid-cols-2 gap-2">
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