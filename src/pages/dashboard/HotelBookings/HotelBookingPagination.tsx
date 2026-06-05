import { ChevronLeft, ChevronRight } from "lucide-react";
import type { HotelBookingPagination as HotelBookingPaginationType } from "@/types/hotel/hotelBookingList.types";

type HotelBookingPaginationProps = {
  pagination: HotelBookingPaginationType;
  onPageChange: (page: number) => void;
  isFetching?: boolean;
};

const HotelBookingPagination = ({
  pagination,
  onPageChange,
  isFetching,
}: HotelBookingPaginationProps) => {
  const { current_page, last_page, total, per_page } = pagination;

  const canGoPrevious = current_page > 1;
  const canGoNext = current_page < last_page;

  const startItem = total === 0 ? 0 : (current_page - 1) * per_page + 1;
  const endItem = Math.min(current_page * per_page, total);

  return (
    <div className="flex flex-col gap-3 rounded-sm border bg-card p-4 text-card-foreground shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-muted-foreground">
        Showing{" "}
        <span className="font-semibold text-foreground">{startItem}</span> to{" "}
        <span className="font-semibold text-foreground">{endItem}</span> of{" "}
        <span className="font-semibold text-foreground">{total}</span> bookings
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={!canGoPrevious || isFetching}
          onClick={() => onPageChange(current_page - 1)}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border bg-background px-3 text-sm font-semibold text-foreground transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronLeft size={16} />
          Previous
        </button>

        <div className="flex h-10 items-center rounded-xl border bg-background px-4 text-sm font-semibold">
          {current_page} / {last_page}
        </div>

        <button
          type="button"
          disabled={!canGoNext || isFetching}
          onClick={() => onPageChange(current_page + 1)}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border bg-background px-3 text-sm font-semibold text-foreground transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default HotelBookingPagination;