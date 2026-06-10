import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { SerializedError } from "@reduxjs/toolkit";
import type { FlightResultItem } from "@/types/flight/flightResults.types";
import FlightDetailsCard from "./FlightDetailsCard";
import FlightResultsError from "@/components/FlightResultsError";
import FlightResultsEmpty from "@/components/FlightResultsEmpty";
import { FlightCardSkeleton } from "@/components/skeletons/FlightCardSkeleton";
import { resetFlightSearchState } from "@/redux/features/flightSearchSlice";
import { shouldShowFlightLoadingState } from "@/lib/utils";

interface Props {
  flights: FlightResultItem[];
  isLoading: boolean;
  isFetching?: boolean;
  isError: boolean;
  error?: FetchBaseQueryError | SerializedError | undefined;
  onRetry?: () => void;
}

const MAX_RETRY_COUNT = 7;
const RETRY_DELAY = 2000;

const FlightResultsList = ({
  flights,
  isLoading,
  isFetching = false,
  isError,
  error,
  onRetry,
}: Props) => {

  const [retryCount, setRetryCount] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isRateLimitError =
    isError && !!error && "status" in error && error.status === 429;

  const activeRetryCount = isRateLimitError ? retryCount : 0;

  useEffect(() => {
    if (!isRateLimitError || !onRetry) return;
    if (retryCount >= MAX_RETRY_COUNT) return;

    const timeout = setTimeout(() => {
      setRetryCount((prev) => prev + 1);
      onRetry();
    }, RETRY_DELAY);

    return () => clearTimeout(timeout);
  }, [isRateLimitError, onRetry, retryCount]);

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

  const shouldShowLoadingState = shouldShowFlightLoadingState({
    isLoading,
    isFetching,
    isRateLimitError,
    activeRetryCount,
    maxRetryCount: MAX_RETRY_COUNT,
  });

  if (shouldShowLoadingState) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <FlightCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <FlightResultsError
        isRateLimit={false}
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