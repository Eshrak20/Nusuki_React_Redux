import { useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  Loader2,
  Plane,
  Route,
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

const isExpiredByTtl = (ttlAt?: string | null) => {
  if (!ttlAt) return false;

  const ttlTime = new Date(ttlAt).getTime();

  if (Number.isNaN(ttlTime)) return false;

  return ttlTime <= Date.now();
};

const formatAmount = (amount?: string | number | null) => {
  const numericAmount = Number(amount ?? 0);

  if (Number.isNaN(numericAmount)) return "0";

  return numericAmount.toLocaleString();
};

const formatTripType = (tripType?: string | null) => {
  if (!tripType) return "N/A";

  return tripType.replace(/_/g, " ");
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Cancel Ticket Error:", error);

      const message =
        error?.data?.data?.friendly_reason ||
        error?.data?.message ||
        "Ticket cancel failed. Please try again.";

      alert(message);
    }
  };

  return (
    <>
      <article className="overflow-hidden rounded-2xl border bg-card shadow-sm transition hover:border-primary/30 hover:shadow-md dark:bg-card/80">
        <div className="grid gap-0 md:grid-cols-[240px_1fr]">
          <div className="relative min-h-[170px] overflow-hidden bg-primary md:min-h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-sky-500" />

            <div className="absolute inset-0 opacity-25">
              <div className="absolute -right-14 top-10 h-44 w-44 rounded-full bg-white/40 blur-2xl" />
              <div className="absolute -bottom-14 -left-14 h-44 w-44 rounded-full bg-white/30 blur-2xl" />
            </div>

            <div className="relative flex h-full min-h-[170px] flex-col justify-between p-4 text-primary-foreground">
              <div className="inline-flex w-fit items-center gap-2 rounded-lg bg-white px-3 py-1.5 text-xs font-extrabold text-primary shadow-sm">
                <Plane className="h-3.5 w-3.5" />
                Flight
              </div>

              <div>
                <Plane className="mb-3 h-12 w-12 text-white/90" />

                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/75">
                  Route
                </p>

                <h3 className="mt-1 text-xl font-black leading-tight text-white">
                  {booking.route || "N/A"}
                </h3>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 p-4 sm:p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <p className="text-sm text-muted-foreground">
                  Booking ID:{" "}
                  <span className="font-bold text-foreground">
                    {booking.booking_code || "N/A"}
                  </span>
                </p>

                <h3 className="mt-2 break-words text-xl font-black leading-tight text-foreground sm:text-2xl">
                  From {booking.route?.split("->")?.[0]?.trim() || "N/A"} To{" "}
                  {booking.route?.split("->")?.[1]?.trim() || "N/A"}
                </h3>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-lg border border-primary/20 bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    PNR: {booking.pnr || "N/A"}
                  </span>

                  <BookingStatusBadge
                    bookingStatus={booking.booking_status}
                    paymentStatus={booking.payment_status}
                  />
                </div>
              </div>

              <div className="shrink-0 sm:text-right">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                  Amount
                </p>

                <p className="mt-1 text-xl font-black text-primary sm:text-2xl">
                  <span className="mr-1 text-xs font-bold">
                    {booking.pricing?.currency ?? "BDT"}
                  </span>
                  {formatAmount(booking.pricing?.total_amount)}
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="flex min-w-0 items-center gap-2 rounded-xl border bg-muted/5 p-3">
                <CalendarDays className="h-4 w-4 shrink-0 text-primary" />
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                    Departure
                  </p>
                  <p className="truncate text-sm font-bold text-foreground">
                    {booking.travel_start_date || "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex min-w-0 items-center gap-2 rounded-xl border bg-muted/5 p-3">
                <Route className="h-4 w-4 shrink-0 text-primary" />
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                    Trip
                  </p>
                  <p className="truncate text-sm font-bold capitalize text-foreground">
                    {formatTripType(booking.trip_type)}
                  </p>
                </div>
              </div>

              <div className="flex min-w-0 items-center gap-2 rounded-xl border bg-muted/5 p-3">
                <Plane className="h-4 w-4 shrink-0 text-primary" />
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                    Passenger
                  </p>
                  <p className="truncate text-sm font-bold text-foreground">
                    {passenger
                      ? `${passenger.given_name ?? ""} ${
                          passenger.surname ?? ""
                        }`.trim()
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>

            <BookingPaymentTimer
              ttlAt={booking.ttl_at}
              paymentStatus={booking.payment_status}
              bookingStatus={booking.booking_status}
              onExpired={handlePaymentTimerExpired}
            />

            <div className="flex flex-col gap-2 border-t pt-4 sm:flex-row sm:items-center sm:justify-end">
              {canShowPayButton ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setPaymentOpen(true)}
                  disabled={!canPay}
                  className="h-10 rounded-xl px-4 text-sm font-bold"
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Pay Now
                </Button>
              ) : null}

              {canShowCancelButton ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCancelOpen(true)}
                  disabled={isCancelling}
                  className="h-10 rounded-xl border-destructive/30 px-4 text-sm font-bold text-destructive hover:bg-destructive/5 hover:text-destructive"
                >
                  {isCancelling ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <TicketX className="mr-2 h-4 w-4" />
                  )}
                  {isCancelling ? "Cancelling..." : "Cancel"}
                </Button>
              ) : null}

              <Button
                asChild
                className="h-10 rounded-xl px-5 text-sm font-extrabold shadow-sm"
              >
                <Link to={`/dashboard/flight-bookings/${booking.id}`}>
                  View Details
                  <ArrowRight className="ml-2 h-4 w-4" />
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