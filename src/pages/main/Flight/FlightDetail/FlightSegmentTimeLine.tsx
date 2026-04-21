import { motion } from "framer-motion";
import { Plane, PlaneTakeoff, PlaneLanding } from "lucide-react";
import { format } from "date-fns";
import type { FlightSegmentItem } from "@/types/flight/flightResults.types";
import AirlineLogo from "@/components/AirlineLogo";

interface Props {
  segments: FlightSegmentItem[];
}

const FlightSegmentTimeline = ({ segments }: Props) => {
  return (
    <div className="space-y-5">
      {segments.map((segment, index) => (
        <motion.div
          key={`${segment.flight_number}-${index}`}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: index * 0.06 }}
          className="rounded-2xl border border-border bg-card p-5 shadow-sm"
        >
          <div className="mb-5 flex items-center gap-3">
            <AirlineLogo
              logo={segment.airline.logo}
              name={segment.airline.name}
              code={segment.airline.code}
              className="h-11 w-11"
              iconClassName="h-3.5 w-3.5"
              textClassName="text-[9px]"
            />

            <div>
              <p className="font-semibold text-foreground">
                {segment.airline.name}
              </p>
              <p className="text-sm text-muted-foreground">
                {segment.flight_number}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_140px_1fr] md:items-center">
            <div>
              <div className="flex items-center gap-2">
                <PlaneTakeoff className="h-4 w-4 text-primary" />
                <p className="text-xl font-bold text-foreground sm:text-3xl">
                  {segment.origin.airport} -{" "}
                  {format(new Date(segment.departure_at), "HH:mm")}
                </p>
              </div>

              <p className="mt-1 text-sm text-muted-foreground">
                {format(new Date(segment.departure_at), "EEE dd MMM yyyy")}
              </p>

              <p className="mt-2 text-sm text-foreground/80">
                {segment.origin.airport_name}
                {segment.origin.terminal
                  ?
                  (
                    <span
                      key={`${segment.flight_number}-${index}`}
                      className="inline-flex items-center rounded-md border border-primary/30 bg-primary/5 px-2.5 py-1.5 mt-2 text-xs font-medium text-primary"
                    >
                      (Terminal - {segment.origin.terminal})
                    </span>
                  )
                  : ""}
              </p>
            </div>

            <div className="text-center -mt-6 lg:mt-0 mb-2 lg:mb-0 flex flex-row lg:flex-col items-center gap-1 justify-center">
              <div className="flex items-center justify-center gap-2">
                <div className="h-px w-8 hidden lg:block bg-border" />
                <Plane className="mt-2.5 lg:mt-0 h-5 w-5 text-primary" />
                <div className="h-px w-8 hidden lg:block bg-border" />
              </div>

              <p className="mt-2 font-semibold text-foreground">
                {segment.elapsed_time_text}
              </p>
            </div>

            <div className="md:text-right">
              <div className="flex items-center gap-2 md:justify-end">
                <PlaneLanding className="h-4 w-4 text-primary" />
                <p className="text-xl font-bold text-foreground sm:text-3xl">
                  {segment.destination.airport} -{" "}
                  {format(new Date(segment.arrival_at), "HH:mm")}
                </p>
              </div>

              <p className="mt-1 text-sm text-muted-foreground">
                {format(new Date(segment.arrival_at), "EEE dd MMM yyyy")}
              </p>

              <p className="mt-2 text-sm text-foreground/80">
                {segment.destination.airport_name}
                {segment.destination.terminal
                  ?
                  (
                    <span
                      key={`${segment.flight_number}-${index}`}
                      className="inline-flex items-center rounded-md border border-primary/30 bg-primary/5 px-2.5 py-1.5 mt-2 text-xs font-medium text-primary"
                    >
                      (Terminal - {segment.destination.terminal})
                    </span>
                  )
                  : ""}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default FlightSegmentTimeline;