import { format } from "date-fns";
import { PlaneTakeoff } from "lucide-react";
import type { FlightResultItem } from "@/types/flight/flightResults.types";
import AirlineLogo from "@/components/AirlineLogo";

interface Props {
  flight: FlightResultItem;
}
 
const FlightJourneySummary = ({ flight }: Props) => {
  const { airline, summary, segments } = flight;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {segments.map((segment, index) => (
          <span
            key={`${segment.flight_number}-${index}`}
            className="inline-flex items-center rounded-sm border border-primary/30 bg-primary/5 px-2.5 py-1 text-xs font-medium text-primary"
          >
            {segment.flight_number}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[180px_minmax(0,1fr)] xl:items-center">
        <div className="flex items-center gap-3">
          <AirlineLogo
            logo={airline.logo}
            name={airline.name}
            code={airline.code}
            className="h-14 w-14"
          />

          <div className="min-w-0">
            <p className="truncate text-base font-semibold text-foreground">
              {airline.name}
            </p>
            <p className="text-sm text-muted-foreground">{airline.code}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-13 lg:gap-5 md:grid-cols-[140px_minmax(0,1fr)_140px] md:items-center">
          <div>
            <p className="text-lg font-bold leading-none text-foreground sm:text-3xl">
              {format(new Date(summary.departure_at), "hh:mm a")}
            </p>
            <p className="mt-2 text-base font-semibold text-foreground">
              {summary.origin.airport}
            </p>
            <p className="text-sm text-muted-foreground">
              {format(new Date(summary.departure_at), "EEE dd MMM yyyy")}
            </p>
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              {summary.duration_text}
            </p>

            <div className="my-2 lg:my-3 flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <PlaneTakeoff className="h-4 w-4 text-primary" />
              <div className="h-px flex-1 bg-border" />
            </div>

            <p
              className={`text-sm font-semibold ${
                summary.is_direct
                  ? "text-green-600 dark:text-green-400"
                  : "text-muted-foreground"
              }`}
            >
              {summary.is_direct
                ? "Non-stop"
                : `${summary.stops} ${summary.stops > 1 ? "stops" : "stop"}`}
            </p>
          </div>

          <div className="text-left md:text-right">
            <p className="text-lg font-bold leading-none text-foreground sm:text-3xl">
              {format(new Date(summary.arrival_at), "hh:mm a")}
            </p>
            <p className="mt-2 text-base font-semibold text-foreground">
              {summary.destination.airport}
            </p>
            <p className="text-sm text-muted-foreground">
              {format(new Date(summary.arrival_at), "EEE dd MMM yyyy")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightJourneySummary;
