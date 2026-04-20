import type { FlightResultItem } from "@/types/flight/flightResults.types";
import FlightDetailsCard from "./FlightDetailsCard";
import FlightResultsError from "@/components/FlightResultsError";
import FlightResultsEmpty from "@/components/FlightResultsEmpty";

interface Props {
  flights: FlightResultItem[];
  isLoading: boolean;
  isError: boolean;
}

const FlightResultsList = ({
  flights,
  isLoading,
  isError,
}: Props) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="h-56 animate-pulse rounded-2xl border border-slate-200 bg-white"
          />
        ))}
      </div>
    );
  }

  if (isError) {
    return <FlightResultsError />;
  }

  if (!flights.length) {
    return <FlightResultsEmpty />;
  }

  return (
    <div className="space-y-4">
      {flights.map((flight) => (
        <FlightDetailsCard key={flight.flight_id || flight.id} flight={flight} />
      ))}
    </div>
  );
};

export default FlightResultsList;