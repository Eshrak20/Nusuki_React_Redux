import { ArrowLeft, Plane, RefreshCcw } from "lucide-react";
import type { NavigateFunction } from "react-router-dom";

import { Button } from "@/components/ui/button";
import type { FlightBookingItem } from "@/types/flight/flightBooking.types";
import { formatDuration, tripTypeLabel } from "@/lib/utils.flightBooking";
import BookingStatusBadge from "../FlightBookings/BookingStatusBadge";

type FlightBookingDetailsHeaderProps = {
  booking?: FlightBookingItem;
  isFetching: boolean;
  onBack: NavigateFunction;
  onRefresh: () => void;
};

const getRouteParts = (route?: string) => {
  if (!route) {
    return {
      from: "---",
      to: "---",
    };
  }

  const parts = route
    .replaceAll("→", "-")
    .replaceAll("–", "-")
    .replaceAll("—", "-")
    .split("-")
    .map((item) => item.trim())
    .filter(Boolean);

  return {
    from: parts[0] ?? "---",
    to: parts[1] ?? "---",
  };
};

const FlightBookingDetailsHeader = ({
  booking,
  isFetching,
  onBack,
  onRefresh,
}: FlightBookingDetailsHeaderProps) => {
  
  const { from, to } = getRouteParts(booking?.route);

  const duration = booking?.segments?.[0].duration_minutes

  const tripType = booking?.trip_type ?? "Non Stop";

  const pnr = booking?.pnr || "Not issued yet";

  return (
    <div className="rounded-sm border bg-card p-5 shadow-sm dark:bg-card/80">
      <div className="mb-5 flex items-center justify-between gap-4">
        <Button
          variant="ghost"
          onClick={() => onBack(-1)}
          className="-ml-3 gap-2 rounded-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        <Button
          variant="outline"
          onClick={onRefresh}
          disabled={isFetching}
          className="gap-2 rounded-sm"
        >
          <RefreshCcw
            className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-2 text-sm font-semibold text-primary">
          <Plane className="h-4 w-4" />
          Flight Booking Details
        </div>

        <div className="flex justify-center mb-10">
          <div className="w-full max-w-md">
            <div className="grid grid-cols-[70px_minmax(0,1fr)_70px] items-center gap-3">
              <div className="text-center">
                <p className="text-2xl font-extrabold leading-none text-foreground">
                  {from}
                </p>
              </div>

             <div className="flex flex-col items-center">
              <p className="mb-2 text-xs font-medium text-muted-foreground">
                {formatDuration(duration)}
              </p>

              <div className="flex w-full items-center">
                <span className="h-3 w-3 rounded-full border border-primary bg-background" />
                <span className="h-px flex-1 bg-primary" />
                <span className="h-3 w-3 rounded-full border border-primary bg-background" />
              </div>

              <p className="mt-2 text-xs font-medium text-muted-foreground">
                {tripTypeLabel(tripType)}
              </p>
            </div>

              <div className="text-center">
                <p className="text-2xl font-extrabold leading-none text-foreground">
                  {to.split(" ")[1]}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 text-sm text-muted-foreground sm:grid-cols-4">
          <p>
            Booking Code:{" "}
            <span className="font-semibold text-foreground">
              {booking?.booking_code ?? "Loading..."}
            </span>
          </p>

          <p>
            Trip Type:{" "}
            <span className="font-semibold capitalize text-foreground">
              {tripTypeLabel(tripType)}
            </span>
          </p>

          <p>
            PNR: <span className="font-semibold text-foreground">{pnr}</span>
          </p>

          <p className={`${booking?.payment_status === "unpaid" ?  "lg:px-12" : "lg:px-15"}`}>
            <BookingStatusBadge
              bookingStatus={booking?.booking_status}
              paymentStatus={booking?.payment_status}
            />
          </p>
        </div>
      </div>
    </div>
  );
};

export default FlightBookingDetailsHeader;
