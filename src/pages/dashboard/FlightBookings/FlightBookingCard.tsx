import { useState } from "react";
import {
  ArrowRight,
  CreditCard,
  Loader2,
  Plane,
  TicketX,
} from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import type { FlightBooking } from "@/types/flight/flightTicketPayment.types";
import { useCancelAirTicketMutation } from "@/redux/api/fligtBookingApi/flightBookingApi";

import BookingStatusBadge from "./BookingStatusBadge";
import FlightTicketPaymentModal from "./FlightTicketPaymentModal";
import CancelTicketConfirmDialog from "./modals/CancelTicketConfirmDialog";
import BookingPaymentTimer from "./BookingPaymentTimer";

type Props = {
  booking: FlightBooking;
  onBookingExpired?: () => void;
};

const flightImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIvZWB5T0IEKEeY1nGH8j5g4ypWEYgyL9R-A&s";

const isExpiredByTtl = (ttlAt?: string | null) => {
  if (!ttlAt) return false;

  const ttlTime = new Date(ttlAt).getTime();

  if (Number.isNaN(ttlTime)) return false;

  return ttlTime <= Date.now();
};

const formatTripType = (tripType?: string | null) => {
  if (!tripType) return "N/A";

  return tripType.replace(/_/g, " ");
};

const formatRoute = (route?: string | null) => {
  const [from, to] = route?.split("->") || [];

  return {
    from: from?.trim() || "N/A",
    to: to?.trim() || "N/A",
  };
};

const formatTravelDate = (date?: string | null) => {
  if (!date) return "N/A";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return date;

  return parsedDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getAirlineName = (booking: FlightBooking) => {
  const bookingWithAirline = booking as FlightBooking & {
    airline?: string | null;
    airline_name?: string | null;
    carrier_name?: string | null;
    segments?: {
      airline_name?: string | null;
      airline_code?: string | null;
    }[];
  };

  return (
    bookingWithAirline.segments?.[0]?.airline_name ||
    bookingWithAirline.airline_name ||
    bookingWithAirline.carrier_name ||
    bookingWithAirline.airline ||
    bookingWithAirline.segments?.[0]?.airline_code ||
    "N/A"
  );
};

const getAirlineCode = (booking: FlightBooking) => {
  const bookingWithSegments = booking as FlightBooking & {
    segments?: {
      airline_code?: string | null;
    }[];
  };

  return bookingWithSegments.segments?.[0]?.airline_code || null;
};

const FlightBookingCard = ({ booking, onBookingExpired }: Props) => {
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [isPaymentExpired, setIsPaymentExpired] = useState(() =>
    isExpiredByTtl(booking.ttl_at),
  );

  const [cancelAirTicket, { isLoading: isCancelling }] =
    useCancelAirTicketMutation();

  const passenger = booking.passengers?.[0];

  const isTicketed = booking.booking_status === "ticketed";
  const isCancelled = booking.booking_status === "cancelled";
  const isPaid = booking.payment_status === "paid";

  const isPendingPayment =
    booking.payment_status === "unpaid" || booking.payment_status === "pending";

  const shouldShowExpiredBadge =
    isPaymentExpired && isPendingPayment && !isPaid && !isTicketed;

  const canShowTimer =
    !shouldShowExpiredBadge &&
    !isCancelled &&
    !isTicketed &&
    !isPaid &&
    isPendingPayment;

  const canShowPayButton =
    !isCancelled &&
    !isTicketed &&
    !isPaid &&
    isPendingPayment &&
    !isPaymentExpired;

  const canPay = Boolean(booking.booking_code) && canShowPayButton;

  const canShowCancelButton =
    Boolean(booking.pnr) &&
    !isCancelled &&
    !isTicketed &&
    !isPaid &&
    !isPaymentExpired;

  const contactEmail = passenger?.email || "eshrakg62@gmail.com";

  const { from, to } = formatRoute(booking.route);
  const airlineName = getAirlineName(booking);
  const airlineCode = getAirlineCode(booking);

  const handlePaymentTimerExpired = () => {
    setIsPaymentExpired(true);
    onBookingExpired?.();
  };

  const handleConfirmCancel = async () => {
    if (!booking.pnr) {
      alert("PNR not found.");
      return;
    }

    try {
      const payload = {
        pnr: booking.pnr,
        retrieveBooking: true,
        cancelAll: true,
        flightTicketOperation: "VOID" as const,
        errorHandlingPolicy: "ALLOW_PARTIAL_CANCEL" as const,
        contact: {
          email: contactEmail,
        },
        send_email: true,
      };

      const response = await cancelAirTicket(payload).unwrap();

      if (!response.success) {
        alert(response.message || "Ticket cancel failed.");
        return;
      }

      alert(response.message || "Air ticket cancelled successfully.");
      setCancelOpen(false);
    } catch (error: unknown) {
      console.error("Cancel Ticket Error:", error);

      const apiError = error as {
        data?: {
          data?: {
            friendly_reason?: string;
          };
          message?: string;
        };
      };

      const message =
        apiError?.data?.data?.friendly_reason ||
        apiError?.data?.message ||
        "Ticket cancel failed. Please try again.";

      alert(message);
    }
  };

  return (
    <>
      <article className="group overflow-hidden rounded-md border bg-card shadow-sm transition hover:border-primary/30 hover:shadow-md">
        <div className="relative grid gap-0 p-3 sm:grid-cols-[180px_1fr] md:grid-cols-[190px_1fr]">
          {/* Right status and timer area */}
          <div className="absolute right-3 top-3 z-10 lg:mt-3 flex max-w-[140px] flex-col items-end gap-1.5">
            {shouldShowExpiredBadge ? (
              <span className="rounded-md bg-muted-foreground px-2.5 py-1 text-[10px] font-extrabold uppercase leading-none text-background shadow-sm">
                Expired
              </span>
            ) : (
              <BookingStatusBadge
                bookingStatus={booking.booking_status}
                paymentStatus={booking.payment_status}
              />
            )}

            {canShowTimer ? (
              <BookingPaymentTimer
                ttlAt={booking.ttl_at}
                paymentStatus={booking.payment_status}
                bookingStatus={booking.booking_status}
                onExpired={handlePaymentTimerExpired}
              />
            ) : null}
          </div>

          {/* Left image area */}
          <Link
            to={`/dashboard/flight-bookings/${booking.id}`}
            className="relative h-[135px] overflow-hidden my-auto rounded-md bg-muted sm:h-[150px]"
          >
            <img
              src={flightImage}
              alt="Flight"
              className="h-full w-full object-cover object-center transition duration-300 group-hover:scale-105"
            />

            <div className="absolute left-3 top-3 inline-flex min-w-9 items-center justify-center rounded bg-white px-2 py-1 text-xs font-black text-primary shadow-sm">
              {airlineCode || "FL"}
            </div>
          </Link>

          {/* Content */}
          <div className="min-w-0 px-0 pt-4 sm:px-4 sm:pt-3 md:px-5">
            <div className="pr-36">
              <p className="text-xs font-medium text-muted-foreground sm:text-sm">
                Booking ID:{" "}
                <span className="text-muted-foreground">
                  {booking.booking_code || "N/A"}
                </span>
              </p>

              <Link to={`/dashboard/flight-bookings/${booking.id}`}>
                <h3 className="mt-2 text-base font-extrabold leading-tight text-foreground transition hover:text-primary sm:text-lg">
                  From {from} To {to}
                </h3>
              </Link>

              <div className="mt-2 flex items-center gap-2">
                {airlineCode ? (
                  <span className="inline-flex h-5 min-w-8 items-center justify-center rounded bg-primary/10 px-1.5 text-[10px] font-black text-primary">
                    {airlineCode}
                  </span>
                ) : (
                  <Plane className="h-4 w-4 text-primary" />
                )}

                <p className="truncate text-sm font-medium text-foreground">
                  {airlineName}
                </p>
              </div>
            </div>

            <div className="mt-3 space-y-1 text-sm text-muted-foreground">
              <p>
                <span className="font-semibold text-foreground">
                  Departure:
                </span>{" "}
                {formatTravelDate(booking.travel_start_date)}
              </p>

              <p className="capitalize">{formatTripType(booking.trip_type)}</p>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-end gap-2 border-t pt-3">
              {canShowPayButton ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setPaymentOpen(true)}
                  disabled={!canPay}
                  className="h-9 rounded-md px-3 text-xs font-bold"
                >
                  <CreditCard className="mr-1.5 h-3.5 w-3.5" />
                  Pay Now
                </Button>
              ) : null}

              {canShowCancelButton ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCancelOpen(true)}
                  disabled={isCancelling}
                  className="h-9 rounded-md border-destructive/30 px-3 text-xs font-bold text-destructive hover:bg-destructive/5 hover:text-destructive"
                >
                  {isCancelling ? (
                    <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <TicketX className="mr-1.5 h-3.5 w-3.5" />
                  )}
                  {isCancelling ? "Cancelling..." : "Cancel"}
                </Button>
              ) : null}

              <Button
                asChild
                className="h-9 rounded-md px-4 text-xs font-extrabold"
              >
                <Link to={`/dashboard/flight-bookings/${booking.id}`}>
                  View Details
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </article>

      <FlightTicketPaymentModal
        open={paymentOpen}
        onOpenChange={setPaymentOpen}
        booking={booking}
      />

      {canShowCancelButton ? (
        <CancelTicketConfirmDialog
          open={cancelOpen}
          onOpenChange={setCancelOpen}
          pnr={booking.pnr}
          isLoading={isCancelling}
          onConfirm={handleConfirmCancel}
        />
      ) : null}
    </>
  );
};

export default FlightBookingCard;