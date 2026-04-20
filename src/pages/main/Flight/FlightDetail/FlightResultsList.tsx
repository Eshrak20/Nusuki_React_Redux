import type { FlightResultItem } from "@/types/flight/flightResults.types";
import FlightDetailsCard from "./FlightDetailsCard";

interface Props {
  flights: FlightResultItem[];
  isLoading: boolean;
  isError: boolean;
}

const FlightResultsList = ({ flights, isLoading, isError }: Props) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((item) => (
          <div key={item} className="h-56 animate-pulse rounded-2xl bg-white" />
        ))}
      </div>
    );
  }

  if (isError) {
    return <div className="rounded-2xl bg-white p-6 text-red-500">Something went wrong while fetching flights.</div>;
  }

  if (!flights.length) {
    return <div className="rounded-2xl bg-white p-6 text-slate-500">No flights found.</div>;
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