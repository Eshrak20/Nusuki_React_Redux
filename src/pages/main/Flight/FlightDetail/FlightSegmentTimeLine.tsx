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
          // Added scale and slight lift on hover for the "jumping" vibe
          whileHover={{ scale: 1.02, y: -4 }}
          transition={{ duration: 0.25, delay: index * 0.06 }}
          // Added 'group', 'hover:shadow-xl', and transition properties
          className="group rounded-sm border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:border-primary dark:hover:border-primary-light hover:bg-primary dark:hover:bg-primary-light hover:shadow-xl"
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
              {/* Text turns white on hover */}
              <p className="font-semibold text-foreground transition-colors duration-300 group-hover:text-white">
                {segment.airline.name}
              </p>
              {/* Muted text turns slightly transparent white on hover */}
              <p className="text-sm text-muted-foreground transition-colors duration-300 group-hover:text-white/80">
                {segment.flight_number}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_140px_1fr] md:items-center">
            {/* Origin */}
            <div>
              <div className="flex items-center gap-2">
                {/* Icon turns white on hover */}
                <PlaneTakeoff className="h-4 w-4 text-primary transition-colors duration-300 group-hover:text-white" />
                <p className="text-xl font-bold text-foreground transition-colors duration-300 group-hover:text-white sm:text-3xl">
                  {segment.origin.airport} -{" "}
                  {format(new Date(segment.departure_at), "HH:mm")}
                </p>
              </div>

              <p className="mt-1 text-sm text-muted-foreground transition-colors duration-300 group-hover:text-white/80">
                {format(new Date(segment.departure_at), "EEE dd MMM yyyy")}
              </p>

              <p className="mt-2 text-sm text-foreground/80 transition-colors duration-300 group-hover:text-white/90">
                {segment.origin.airport_name}
                {segment.origin.terminal ? (
                  <span
                    key={`${segment.flight_number}-${index}-org-term`}
                    // Badge adapts to the dark background by becoming semi-transparent white
                    className="mt-2 inline-flex items-center rounded-md border border-primary/30 bg-primary/5 px-2.5 py-1.5 text-xs font-medium text-primary transition-colors duration-300 group-hover:border-white/20 group-hover:bg-white/10 group-hover:text-white lg:ml-2"
                  >
                    Terminal - {segment.origin.terminal}
                  </span>
                ) : (
                  ""
                )}
              </p>
            </div>

            {/* Middle / Duration */}
            <div className="-mt-6 mb-2 flex flex-row items-center justify-center gap-1 text-center lg:mt-0 lg:mb-0 lg:flex-col">
              <div className="flex items-center justify-center gap-2">
                {/* Dividers turn semi-transparent white on hover */}
                <div className="hidden h-px w-8 bg-border transition-colors duration-300 group-hover:bg-white/30 lg:block" />
                <Plane className="mt-2.5 h-5 w-5 text-primary transition-colors duration-300 group-hover:text-white lg:mt-0" />
                <div className="hidden h-px w-8 bg-border transition-colors duration-300 group-hover:bg-white/30 lg:block" />
              </div>

              <p className="mt-2 font-semibold text-foreground transition-colors duration-300 group-hover:text-white">
                {segment.elapsed_time_text}
              </p>
            </div>

            {/* Destination */}
            <div className="md:text-right">
              <div className="flex items-center gap-2 md:justify-end">
                <PlaneLanding className="h-4 w-4 text-primary transition-colors duration-300 group-hover:text-white" />
                <p className="text-xl font-bold text-foreground transition-colors duration-300 group-hover:text-white sm:text-3xl">
                  {segment.destination.airport} -{" "}
                  {format(new Date(segment.arrival_at), "HH:mm")}
                </p>
              </div>

              <p className="mt-1 text-sm text-muted-foreground transition-colors duration-300 group-hover:text-white/80">
                {format(new Date(segment.arrival_at), "EEE dd MMM yyyy")}
              </p>

              <p className="mt-2 text-sm text-foreground/80 transition-colors duration-300 group-hover:text-white/90">
                {segment.destination.airport_name}
                {segment.destination.terminal ? (
                  <span
                    key={`${segment.flight_number}-${index}-dest-term`}
                    className="mt-2 inline-flex items-center rounded-md border border-primary/30 bg-primary/5 px-2.5 py-1.5 text-xs font-medium text-primary transition-colors duration-300 group-hover:border-white/20 group-hover:bg-white/10 group-hover:text-white lg:ml-2"
                  >
                    Terminal - {segment.destination.terminal}
                  </span>
                ) : (
                  ""
                )}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default FlightSegmentTimeline;