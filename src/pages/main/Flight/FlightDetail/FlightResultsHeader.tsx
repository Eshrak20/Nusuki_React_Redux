import {
  ChevronLeft,
  ChevronRight,
  Plane,
  XCircle,
  ArrowDownUp,
  Clock3,
  Sunrise,
  ArrowUpAZ,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type {
  AirlinePriceSummaryItem,
  ApiFilters,
} from "@/types/flight/flightResults.types";
import AirlineLogo from "@/components/AirlineLogo";
import { FlightMiniLoader } from "@/components/skeletons/FlightResultsSkeleton";

export type SortBy = "price" | "duration" | "departure_at";
export type SortOrder = "asc" | "desc";

interface Props {
  isLoading: boolean;
  isError: boolean;
  totalFlights: number;
  airlineSummary: AirlinePriceSummaryItem[];
  availableFilters?: ApiFilters;

  selectedAirlineCode?: string | null;
  onAirlineSelect?: (airlineCode: string | null) => void;

  onPrevDay?: () => void;
  onNextDay?: () => void;
  disablePrevDay?: boolean;
  disableNextDay?: boolean;
  dateLabel?: string;

  sortBy?: SortBy;
  sortOrder?: SortOrder;
  onSortChange?: (sortBy: SortBy, sortOrder: SortOrder) => void;
}

interface TopSummaryBarProps {
  isLoading: boolean;
  totalFlights: number;
  selectedAirlineCode: string | null;
  onClearAirline?: () => void;
  dateLabel?: string;
  showScheduleNav: boolean;
  onPrevDay?: () => void;
  onNextDay?: () => void;
  disablePrevDay: boolean;
  disableNextDay: boolean;
}

const TopSummaryBar = ({
  isLoading,
  totalFlights,
  selectedAirlineCode,
  onClearAirline,
  dateLabel,
  showScheduleNav,
  onPrevDay,
  onNextDay,
  disablePrevDay,
  disableNextDay,
}: TopSummaryBarProps) => {
  return (
    <Card className="overflow-hidden rounded-2xl border bg-card shadow-sm">
      <CardContent className="flex flex-col gap-4 p-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          {isLoading ? (
            <FlightMiniLoader />
          ) : (
            <h2 className="text-lg font-bold text-foreground sm:text-xl">
              {totalFlights} Available Flights
            </h2>
          )}

          {selectedAirlineCode && !isLoading && (
            <Button
              variant="secondary"
              size="sm"
              onClick={onClearAirline}
              className="h-8 rounded-full px-3"
            >
              <XCircle className="mr-1 h-4 w-4" />
              Clear filter
            </Button>
          )}

          {dateLabel && !isLoading && (
            <Badge
              variant="outline"
              className="rounded-full px-3 py-1 text-xs"
            >
              {dateLabel}
            </Badge>
          )}
        </div>

        {showScheduleNav && (
          <div className="flex items-center gap-2 self-start lg:self-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={onPrevDay}
              disabled={disablePrevDay || isLoading}
              className="h-10 rounded-full px-4"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Previous
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={onNextDay}
              disabled={disableNextDay || isLoading}
              className="h-10 rounded-full px-4"
            >
              Next
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface AirlineSummaryRowProps {
  isLoading: boolean;
  airlineSummary: AirlinePriceSummaryItem[];
  selectedAirlineCode: string | null;
  onAirlineSelect?: (airlineCode: string | null) => void;
}

const AirlineSummaryRow = ({
  isLoading,
  airlineSummary,
  selectedAirlineCode,
  onAirlineSelect,
}: AirlineSummaryRowProps) => {
  if (!airlineSummary.length || isLoading) return null;

  return (
    <Card className="rounded-2xl border bg-card shadow-sm">
      <CardContent className="p-3">
        <div className="flex gap-3 overflow-x-auto pb-1">
          {airlineSummary.map((airline) => {
            const isActive = selectedAirlineCode === airline.code;

            return (
              <button
                key={airline.code}
                type="button"
                onClick={() =>
                  onAirlineSelect?.(
                    isActive ? null : airline.code
                  )
                }
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
                        isActive
                          ? "text-primary-foreground"
                          : "text-foreground"
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

interface SortBarProps {
  isLoading: boolean;
  sortBy: SortBy;
  sortOrder: SortOrder;
  onSortChange?: (sortBy: SortBy, sortOrder: SortOrder) => void;
}

const SortBar = ({
  isLoading,
  sortBy,
  sortOrder,
  onSortChange,
}: SortBarProps) => {
  if (!onSortChange) return null;

  const sortButtons: {
    key: SortBy;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
    { key: "price", label: "Cheapest", icon: ArrowDownUp },
    { key: "duration", label: "Shortest Duration", icon: Clock3 },
    { key: "departure_at", label: "Earliest", icon: Sunrise },
  ];

  return (
    <Card className="rounded-2xl border bg-card shadow-sm">
      <CardContent className="space-y-3 p-3">
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1fr)_220px]">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {sortButtons.map((item) => {
              const Icon = item.icon;
              const isActive = sortBy === item.key;

              return (
                <Button
                  key={item.key}
                  variant={isActive ? "default" : "outline"}
                  onClick={() => onSortChange(item.key, isActive ? sortOrder : "asc")}
                  disabled={isLoading}
                  className="h-11 rounded-xl"
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              );
            })}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button
              variant={sortOrder === "asc" ? "default" : "outline"}
              onClick={() => onSortChange(sortBy, "asc")}
              disabled={isLoading}
              className="h-11 rounded-xl"
            >
              <ArrowUpAZ className="mr-2 h-4 w-4" />
              Asc
            </Button>

            <Button
              variant={sortOrder === "desc" ? "default" : "outline"}
              onClick={() => onSortChange(sortBy, "desc")}
              disabled={isLoading}
              className="h-11 rounded-xl"
            >
              <ArrowDownUp className="mr-2 h-4 w-4" />
              Desc
            </Button>
          </div>
        </div>

        {!isLoading && (
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <Badge variant="secondary" className="rounded-full">
              sort_by: {sortBy}
            </Badge>
            <Badge variant="secondary" className="rounded-full">
              sort_order: {sortOrder}
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const FlightResultsHeader = ({
  isLoading,
  isError,
  totalFlights,
  airlineSummary,
  availableFilters,
  selectedAirlineCode = null,
  onAirlineSelect,
  onPrevDay,
  onNextDay,
  disablePrevDay = false,
  disableNextDay = false,
  dateLabel,
  sortBy = "price",
  sortOrder = "asc",
  onSortChange,
}: Props) => {
  const hasDepartureSlots =
    Array.isArray(availableFilters?.flight_schedules?.departure) &&
    availableFilters.flight_schedules.departure.length > 0;

  const hasArrivalSlots =
    Array.isArray(availableFilters?.flight_schedules?.arrival) &&
    availableFilters.flight_schedules.arrival.length > 0;

  const showScheduleNav = hasDepartureSlots || hasArrivalSlots;

  if (isError) {
    return (
      <Card className="rounded-2xl border bg-card shadow-sm">
        <CardContent className="p-4 text-sm text-destructive">
          Failed to load flights.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <TopSummaryBar
        isLoading={isLoading}
        totalFlights={totalFlights}
        selectedAirlineCode={selectedAirlineCode}
        onClearAirline={() => onAirlineSelect?.(null)}
        dateLabel={dateLabel}
        showScheduleNav={showScheduleNav}
        onPrevDay={onPrevDay}
        onNextDay={onNextDay}
        disablePrevDay={disablePrevDay}
        disableNextDay={disableNextDay}
      />

      <AirlineSummaryRow
        isLoading={isLoading}
        airlineSummary={airlineSummary}
        selectedAirlineCode={selectedAirlineCode}
        onAirlineSelect={onAirlineSelect}
      />

      <SortBar
        isLoading={isLoading}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSortChange={onSortChange}
      />
    </div>
  );
};

export default FlightResultsHeader;