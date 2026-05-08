import { useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  CreditCard,
  Plane,
  Route,
  TicketX,
  UserRound,
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

  const canPay =
    Boolean(booking.pnr) &&
    isPendingPayment &&
    !isTicketed &&
    !isCancelled &&
    !isPaymentExpired;

  const canCancel = Boolean(booking.pnr) && !isCancelled;

  //TODO If needed then will be used for dynamic border in card
  // const cardHighlightClass = isCancelled
  //   ? "border-red-500/30 bg-red-500/[0.03]"
  //   : isTicketed || isPaid
  //     ? "border-emerald-500/30 bg-emerald-500/[0.03]"
  //     : "border-amber-500/30 bg-amber-500/[0.04]";

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
      <article
        className={`overflow-hidden rounded-2xl border bg-card shadow-sm transition hover:shadow-md dark:bg-card/80`}
      >
        <div className="border-b bg-muted/40 p-6 pb-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground/80">
                Booking Code
              </p>

              <h3 className="mt-1 text-xl font-extrabold text-foreground">
                {booking.booking_code}
              </h3>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="rounded-lg border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                  PNR: {booking.pnr || "N/A"}
                </span>

                <BookingStatusBadge
                  bookingStatus={booking.booking_status}
                  paymentStatus={booking.payment_status}
                />
              </div>
            </div>

            <div className="text-left sm:text-right">
              <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground/80">
                Total Amount
              </p>

              <p className="mt-1 text-2xl font-black text-primary">
                <span className="mr-1 text-sm font-bold">
                  {booking.pricing?.currency}
                </span>
                {Number(booking.pricing?.total_amount ?? 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6 p-6 pt-4">
          <BookingPaymentTimer
            ttlAt={booking.ttl_at}
            paymentStatus={booking.payment_status}
            bookingStatus={booking.booking_status}
            onExpired={handlePaymentTimerExpired}
          />

          <div className="grid gap-3 sm:grid-cols-2">
            {[
              {
                icon: Route,
                label: "Route",
                value: booking.route,
              },
              {
                icon: CalendarDays,
                label: "Travel Date",
                value: booking.travel_start_date,
              },
              {
                icon: UserRound,
                label: "Passenger",
                value: passenger
                  ? `${passenger.given_name} ${passenger.surname}`
                  : "N/A",
              },
              {
                icon: Plane,
                label: "Trip Type",
                value: booking.trip_type,
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex gap-3 rounded-xl border bg-muted/5 p-3 shadow-sm"
              >
                <item.icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-tighter text-muted-foreground">
                    {item.label}
                  </p>

                  <p className="text-sm font-bold leading-tight">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <Button
                onClick={() => setPaymentOpen(true)}
                disabled={!canPay}
                className="h-11 rounded-xl font-bold shadow-sm"
              >
                <CreditCard className="mr-2 h-4 w-4" />
                {isPaid || isTicketed
                  ? "Paid"
                  : isPaymentExpired && isPendingPayment
                    ? "Payment Expired"
                    : "Pay Now"}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => setCancelOpen(true)}
                disabled={!canCancel || isCancelling}
                className="h-11 rounded-xl font-bold shadow-sm"
              >
                <TicketX className="mr-2 h-4 w-4" />
                Cancel Ticket
              </Button>
            </div>

            <div className="flex justify-center pt-2">
              <Button
                asChild
                variant="ghost"
                className="w-full rounded-xl text-muted-foreground hover:bg-primary/5 hover:text-primary"
              >
                <Link to={`/dashboard/flight-bookings/${booking.id}`}>
                  View Full Details
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

      <CancelTicketConfirmDialog
        open={cancelOpen}
        onOpenChange={setCancelOpen}
        pnr={booking.pnr}
        isLoading={isCancelling}
        onConfirm={handleConfirmCancel}
      />
    </>
  );
};

export default FlightBookingCard;
