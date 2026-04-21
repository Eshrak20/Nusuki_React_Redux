import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { SerializedError } from "@reduxjs/toolkit";
import type { FlightResultItem } from "@/types/flight/flightResults.types";
import FlightDetailsCard from "./FlightDetailsCard";
import FlightResultsError from "@/components/FlightResultsError";
import FlightResultsEmpty from "@/components/FlightResultsEmpty";
import { FlightCardSkeleton } from "@/components/skeletons/FlightResultsSkeleton";
import { resetFlightSearchState } from "@/redux/features/flightSearchSlice";

interface Props {
  flights: FlightResultItem[];
  isLoading: boolean;
  isError: boolean;
  error?: FetchBaseQueryError | SerializedError | undefined;
}

const FlightResultsList = ({ flights, isLoading, isError, error }: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <FlightCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  const isRateLimitError =
    isError && !!error && "status" in error && error.status === 429;

  let errorMessage = "Something went wrong while loading flights.";

  if (error) {
    if (
      "data" in error &&
      error.data &&
      typeof error.data === "object" &&
      "message" in error.data &&
      typeof error.data.message === "string"
    ) {
      errorMessage = error.data.message;
    } else if ("message" in error && typeof error.message === "string") {
      errorMessage = error.message;
    } else if ("error" in error && typeof error.error === "string") {
      errorMessage = error.error;
    }
  }

  const handleSearchAgain = () => {
    dispatch(resetFlightSearchState());
    navigate("/");
  };

  if (isError) {
    return (
      <FlightResultsError
        isRateLimit={isRateLimitError}
        message={errorMessage}
        onSearchAgain={handleSearchAgain}
      />
    );
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