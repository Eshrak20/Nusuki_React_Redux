import { ArrowLeft, Plane } from "lucide-react";
import type { NavigateFunction } from "react-router-dom";

import { Button } from "@/components/ui/button";
import type { FlightBookingItem } from "@/types/flight/flightBooking.types";

type FlightBookingDetailsHeaderProps = {
  booking?: FlightBookingItem;
  isFetching: boolean;
  onBack: NavigateFunction;
  onRefresh: () => void;
};

const FlightBookingDetailsHeader = ({
  booking,
  isFetching,
  onBack,
  onRefresh,
}: FlightBookingDetailsHeaderProps) => {
  return (
    <div className="flex flex-col gap-4 rounded-sm border bg-card p-5 shadow-sm dark:bg-card/80 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <Button
          variant="ghost"
          onClick={() => onBack(-1)}
          className="mb-3 -ml-3 gap-2 rounded-xl"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        <div className="flex items-center gap-2 text-sm font-semibold text-primary">
          <Plane className="h-4 w-4" />
          Flight Booking Details
        </div>

        <h1 className="mt-2 text-2xl font-bold tracking-tight text-foreground">
          {booking?.route ?? "Booking Details"}
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Booking Code:{" "}
          <span className="font-semibold text-foreground">
            {booking?.booking_code ?? "Loading..."}
          </span>
        </p>
      </div>

      <Button
        variant="outline"
        onClick={onRefresh}
        disabled={isFetching}
        className="rounded-xl"
      >
        Refresh
      </Button>
    </div>
  );
};

export default FlightBookingDetailsHeader;