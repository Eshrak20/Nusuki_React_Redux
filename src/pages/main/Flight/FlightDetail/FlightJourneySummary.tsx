import { format } from "date-fns";
import type { FlightResultItem } from "@/types/flight/flightResults.types";

interface Props {
  flight: FlightResultItem;
}

const FlightJourneySummary = ({ flight }: Props) => {
  const { airline, summary, segments } = flight;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {segments.map((segment) => (
          <span
            key={segment.flight_number}
            className="rounded-md border border-red-500 px-2 py-1 text-xs font-medium text-red-500"
          >
            {segment.flight_number}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-[160px_minmax(0,1fr)]">
        <div className="flex items-center gap-3">
          <img src={airline.logo} alt={airline.name} className="h-12 w-12 rounded-full border object-cover" />
          <div>
            <p className="font-semibold text-slate-900">{airline.name}</p>
            <p className="text-sm text-slate-500">{airline.code}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-[140px_minmax(0,1fr)_140px]">
          <div>
            <p className="text-4xl font-bold leading-none text-slate-900">
              {format(new Date(summary.departure_at), "HH:mm")}
            </p>
            <p className="mt-2 text-base font-semibold text-slate-700">{summary.origin.airport}</p>
            <p className="text-sm text-slate-500">{format(new Date(summary.departure_at), "EEE dd MMM yyyy")}</p>
          </div>

          <div className="text-center">
            <p className="text-sm text-slate-400">{summary.duration_text}</p>
            <div className="my-2 h-px w-full bg-slate-200" />
            <p className={`text-sm font-semibold ${summary.is_direct ? "text-green-600" : "text-slate-500"}`}>
              {summary.is_direct ? "Non-stop" : `${summary.stops} stop`}
            </p>
          </div>

          <div className="text-left md:text-right">
            <p className="text-4xl font-bold leading-none text-slate-900">
              {format(new Date(summary.arrival_at), "HH:mm")}
            </p>
            <p className="mt-2 text-base font-semibold text-slate-700">{summary.destination.airport}</p>
            <p className="text-sm text-slate-500">{format(new Date(summary.arrival_at), "EEE dd MMM yyyy")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightJourneySummary;