import type { FlightResultItem } from "@/types/flight/flightResults.types";
import FlightDetailsCard from "./FlightDetailsCard";
import FlightResultsError from "@/components/FlightResultsError";
import FlightResultsEmpty from "@/components/FlightResultsEmpty";
import { FlightCardSkeleton } from "@/components/skeletons/FlightResultsSkeleton";

interface Props {
  flights: FlightResultItem[];
  isLoading: boolean;
  isError: boolean;
}

const FlightResultsList = ({ flights, isLoading, isError }: Props) => {
  if (isLoading) {
    {
      Array.from({ length: 10 }).map((_, index) => (
        <FlightCardSkeleton key={index} />
      ));
    }
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
        <FlightDetailsCard
          key={flight.flight_id || flight.id}
          flight={flight}
        />
      ))}
    </div>
  );
};

export default FlightResultsList;
