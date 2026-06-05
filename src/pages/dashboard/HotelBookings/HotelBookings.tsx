import { RefreshCcw } from "lucide-react";
import { useState } from "react";
import { useListHotelBookingQuery } from "@/redux/api/hotelApi/hotelApi";

import HotelBookingCard from "./HotelBookingCard";
import HotelBookingEmptyState from "./HotelBookingEmptyState";
import HotelBookingSkeleton from "./HotelBookingSkeleton";
import HotelBookingStats from "./HotelBookingStats";
import HotelBookingPagination from "./HotelBookingPagination";

const HotelBookings = () => {
  const [page, setPage] = useState(1);
  const perPage = 15;

  const { data, isLoading, isFetching, isError, refetch } =
    useListHotelBookingQuery({
      page,
      per_page: perPage,
    });

  const bookings = data?.data?.items ?? [];
  const pagination = data?.data?.pagination;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Hotel Bookings
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage and review your hotel PNR booking lists.
          </p>

          {pagination && (
            <p className="mt-1 text-xs text-muted-foreground">
              Page {pagination.current_page} of {pagination.last_page}
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={() => refetch()}
          disabled={isFetching}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-sm border bg-background px-4 text-sm font-semibold text-foreground transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
        >
          <RefreshCcw
            size={16}
            className={isFetching ? "animate-spin" : ""}
          />
          Refresh
        </button>
      </div>

      {isLoading ? (
        <HotelBookingSkeleton />
      ) : isError ? (
        <div className="rounded-sm border border-destructive/20 bg-destructive/10 p-5 text-destructive">
          <h3 className="font-semibold">Failed to load hotel bookings</h3>

          <p className="mt-1 text-sm">
            Something went wrong while fetching hotel booking lists. Please try
            again.
          </p>

          <button
            type="button"
            onClick={() => refetch()}
            className="mt-4 h-10 rounded-sm bg-destructive px-4 text-sm font-semibold text-destructive-foreground transition hover:opacity-90"
          >
            Try again
          </button>
        </div>
      ) : bookings.length === 0 ? (
        <HotelBookingEmptyState />
      ) : (
        <>
          <HotelBookingStats bookings={bookings} />

          <div className="space-y-4 opacity-100 transition">
            {bookings.map((booking) => (
              <HotelBookingCard key={booking.id} booking={booking} />
            ))}
          </div>

          {pagination && pagination.last_page > 1 && (
            <HotelBookingPagination
              pagination={pagination}
              onPageChange={setPage}
              isFetching={isFetching}
            />
          )}
        </>
      )}
    </div>
  );
};

export default HotelBookings;