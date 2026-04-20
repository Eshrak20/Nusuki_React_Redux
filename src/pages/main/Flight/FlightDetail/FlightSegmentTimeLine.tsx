import { Plane } from "lucide-react";
import { format } from "date-fns";
import type { FlightSegmentItem } from "@/types/flight/flightResults.types";

interface Props {
  segments: FlightSegmentItem[];
}

const FlightSegmentTimeline = ({ segments }: Props) => {
  return (
    <div className="space-y-6">
      {segments.map((segment, index) => (
        <div key={`${segment.flight_number}-${index}`} className="rounded-2xl border p-5">
          <div className="mb-4 flex items-center gap-3">
            <img src={segment.airline.logo} alt={segment.airline.name} className="h-10 w-10 rounded-full border object-cover" />
            <div>
              <p className="font-semibold text-slate-900">{segment.airline.name}</p>
              <p className="text-sm text-slate-500">{segment.flight_number}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_120px_1fr] md:items-center">
            <div>
              <p className="text-3xl font-bold">{segment.origin.airport} - {format(new Date(segment.departure_at), "HH:mm")}</p>
              <p className="mt-1 text-sm text-slate-500">{format(new Date(segment.departure_at), "EEE dd MMM yyyy")}</p>
              <p className="mt-2 text-sm text-slate-700">{segment.origin.airport_name} {segment.origin.terminal ? `(Terminal - ${segment.origin.terminal})` : ""}</p>
            </div>

            <div className="text-center">
              <Plane className="mx-auto h-6 w-6 text-slate-400" />
              <p className="mt-2 font-semibold">{segment.elapsed_time_text}</p>
            </div>

            <div className="md:text-right">
              <p className="text-3xl font-bold">{segment.destination.airport} - {format(new Date(segment.arrival_at), "HH:mm")}</p>
              <p className="mt-1 text-sm text-slate-500">{format(new Date(segment.arrival_at), "EEE dd MMM yyyy")}</p>
              <p className="mt-2 text-sm text-slate-700">{segment.destination.airport_name}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FlightSegmentTimeline;