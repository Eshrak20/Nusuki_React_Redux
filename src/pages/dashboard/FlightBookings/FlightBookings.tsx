import { useState } from "react";
import { CalendarCheck2, RefreshCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useGetFlightBookingsQuery } from "@/redux/api/fligtBookingApi/flightBookingApi";
import FlightBookingCardSkeleton from "@/components/skeletons/FlightBookingCardSkeleton";
import FlightBookingEmptyState from "./FlightBookingEmptyState";
import FlightBookingCard from "./FlightBookingCard";


const FlightBookings = () => {
  const [page, setPage] = useState(1);
  const size = 10;

  const {
    data,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetFlightBookingsQuery({
    page,
    size,
  });

  const bookings = data?.data.items ?? [];
  const pagination = data?.data.pagination;

  const hasPreviousPage = page > 1;
  const hasNextPage = pagination ? page < pagination.last_page : false;

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 rounded-2xl border bg-card p-5 shadow-sm dark:bg-card/80 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold text-primary">
            <CalendarCheck2 className="h-4 w-4" />
            Flight Booking History
          </div>

          <h1 className="mt-2 text-2xl font-bold tracking-tight text-foreground">
            My Flight Bookings
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            View your PNR, ticket status, payment status, passenger and flight
            segment details.
          </p>
        </div>

        <Button
          variant="outline"
          onClick={() => refetch()}
          disabled={isFetching}
          className="w-full gap-2 rounded-xl sm:w-auto"
        >
          <RefreshCcw
            className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
      </div>

      {isError ? (
        <div className="rounded-2xl border border-destructive/20 bg-destructive/10 p-6 text-center">
          <h3 className="text-lg font-bold text-destructive">
            Failed to load booking history
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Please try again. If this continues, check your API auth/session.
          </p>

          <Button
            onClick={() => refetch()}
            className="mt-4 rounded-xl"
            disabled={isFetching}
          >
            Try Again
          </Button>
        </div>
      ) : null}

      {isLoading ? (
        <div className="grid gap-5 xl:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <FlightBookingCardSkeleton key={index} />
          ))}
        </div>
      ) : null}

      {!isLoading && !isError && bookings.length === 0 ? (
        <FlightBookingEmptyState />
      ) : null}

      {!isLoading && !isError && bookings.length > 0 ? (
        <>
          <div className="grid gap-5 xl:grid-cols-2">
            {bookings.map((booking) => (
              <FlightBookingCard key={booking.id} booking={booking} />
            ))}
          </div>

          {pagination ? (
            <div className="flex flex-col gap-3 rounded-2xl border bg-card p-4 shadow-sm dark:bg-card/80 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground">
                Showing page{" "}
                <span className="font-semibold text-foreground">
                  {pagination.current_page}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-foreground">
                  {pagination.last_page}
                </span>{" "}
                · Total{" "}
                <span className="font-semibold text-foreground">
                  {pagination.total}
                </span>{" "}
                bookings
              </p>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  disabled={!hasPreviousPage || isFetching}
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  className="rounded-xl"
                >
                  Previous
                </Button>

                <Button
                  disabled={!hasNextPage || isFetching}
                  onClick={() => setPage((prev) => prev + 1)}
                  className="rounded-xl"
                >
                  Next
                </Button>
              </div>
            </div>
          ) : null}
        </>
      ) : null}
    </section>
  );
};

export default FlightBookings;