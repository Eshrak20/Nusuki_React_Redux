import { useState } from "react";
import { CalendarCheck2, RefreshCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useGetFlightBookingsQuery } from "@/redux/api/fligtBookingApi/flightBookingApi";
import FlightBookingCardSkeleton from "@/components/skeletons/FlightBookingCardSkeleton";
import FlightBookingEmptyState from "./FlightBookingEmptyState";
import FlightBookingCard from "./FlightBookingCard";
import FlightBookingStats from "./FlightBookingStats";

const FlightBookings = () => {
  const [page, setPage] = useState(1);
  const size = 12;

  const { data, isLoading, isFetching, isError, refetch } =
    useGetFlightBookingsQuery({
      page,
      size,
    });

  const bookings = data?.data.items ?? [];
  const pagination = data?.data.pagination;
  const summary = data?.data.summary;

  const hasPreviousPage = page > 1;
  const hasNextPage = pagination ? page < pagination.last_page : false;

  const handleBookingExpired = () => {
    if (!data || isLoading || isFetching) return;
    refetch();
  };

  return (
    <section className="space-y-5">
      <div className="overflow-hidden rounded-sm border bg-card shadow-sm dark:bg-card/80">
        <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5 lg:p-6">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-sm font-semibold text-primary">
              <CalendarCheck2 className="h-4 w-4 shrink-0" />
              <span>Flight Booking History</span>
            </div>

            <h1 className="mt-2 text-xl font-extrabold tracking-tight text-foreground sm:text-2xl lg:text-3xl">
              My Bookings
            </h1>

            <p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">
              Manage your flight bookings, payment status and ticket details.
            </p>
          </div>

          <Button
            variant="outline"
            onClick={() => refetch()}
            disabled={isFetching}
            className="h-11 w-full gap-2 rounded-sm font-bold sm:w-auto"
          >
            <RefreshCcw
              className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
        </div>

        {summary ? (
          <div className="border-t bg-muted/30 px-4 py-4 dark:bg-muted/10 sm:px-5 lg:px-6">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-sm border bg-background p-4 shadow-sm dark:bg-background/50">
                <p className="text-xs font-bold uppercase text-muted-foreground">
                  Total Paid Amount
                </p>
                <p className="mt-2 text-2xl font-extrabold text-primary">
                  {summary.currency}{" "}
                  {summary.total_paid_amount.toLocaleString()}
                </p>
              </div>

              <div className="rounded-sm border bg-background p-4 shadow-sm dark:bg-background/50">
                <p className="text-xs font-bold uppercase text-muted-foreground">
                  Upcoming Trips
                </p>
                <p className="mt-2 text-2xl font-extrabold text-foreground">
                  {summary.upcoming_trips}
                </p>
              </div>

              <div className="rounded-sm border bg-background p-4 shadow-sm dark:bg-background/50">
                <p className="text-xs font-bold uppercase text-muted-foreground">
                  Completed Trips
                </p>
                <p className="mt-2 text-2xl font-extrabold text-foreground">
                  {summary.completed_trips}
                </p>
              </div>

              <div className="rounded-sm border bg-background p-4 shadow-sm dark:bg-background/50">
                <p className="text-xs font-bold uppercase text-muted-foreground">
                  Current Page
                </p>
                <p className="mt-2 text-2xl font-extrabold text-foreground">
                  {pagination?.current_page ?? page}
                  <span className="text-sm font-bold text-muted-foreground">
                    {" "}
                    / {pagination?.last_page ?? 1}
                  </span>
                </p>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {!isLoading && !isError && summary ? (
        <FlightBookingStats summary={summary} />
      ) : null}

      {pagination ? (
        <div className="flex flex-col gap-3 rounded-sm border bg-card p-4 shadow-sm dark:bg-card/80 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm leading-6 text-muted-foreground">
            Showing page{" "}
            <span className="font-bold text-foreground">
              {pagination.current_page}
            </span>{" "}
            of{" "}
            <span className="font-bold text-foreground">
              {pagination.last_page}
            </span>{" "}
            · Total{" "}
            <span className="font-bold text-foreground">
              {pagination.total}
            </span>{" "}
            bookings
          </p>

          <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center">
            <Button
              variant="outline"
              disabled={!hasPreviousPage || isFetching}
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              className="h-10 rounded-sm font-bold"
            >
              Previous
            </Button>

            <Button
              disabled={!hasNextPage || isFetching}
              onClick={() => setPage((prev) => prev + 1)}
              className="h-10 rounded-sm font-bold"
            >
              Next
            </Button>
          </div>
        </div>
      ) : null}

      {isError ? (
        <div className="rounded-sm border border-destructive/20 bg-destructive/10 p-6 text-center">
          <h3 className="text-lg font-bold text-destructive">
            Failed to load booking history
          </h3>

          <p className="mt-2 text-sm text-muted-foreground">
            Please try again. If this continues, check your API auth/session.
          </p>

          <Button
            onClick={() => refetch()}
            className="mt-4 h-11 rounded-sm font-bold"
            disabled={isFetching}
          >
            Try Again
          </Button>
        </div>
      ) : null}

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <FlightBookingCardSkeleton key={index} />
          ))}
        </div>
      ) : null}

      {!isLoading && !isError && bookings.length === 0 ? (
        <FlightBookingEmptyState />
      ) : null}

      {!isLoading && !isError && bookings.length > 0 ? (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <FlightBookingCard
              key={booking.id}
              booking={booking}
              onBookingExpired={handleBookingExpired}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
};

export default FlightBookings;