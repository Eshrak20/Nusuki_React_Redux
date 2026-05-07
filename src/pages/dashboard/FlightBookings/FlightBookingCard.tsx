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

import { Button } from "@/components/ui/button";
import type { FlightBooking } from "@/types/flight/flightTicketPayment.types";
import { useCancelAirTicketMutation } from "@/redux/api/fligtBookingApi/flightBookingApi";

import BookingStatusBadge from "./BookingStatusBadge";
import FlightTicketPaymentModal from "./FlightTicketPaymentModal";
import CancelTicketConfirmDialog from "./modals/CancelTicketConfirmDialog";
import { Link } from "react-router-dom";

type Props = {
  booking: FlightBooking;
};

const FlightBookingCard = ({ booking }: Props) => {
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);

  const [cancelAirTicket, { isLoading: isCancelling }] =
    useCancelAirTicketMutation();

  const passenger = booking.passengers?.[0];

  const isTicketed = booking.booking_status === "ticketed";
  const isCancelled = booking.booking_status === "cancelled";
  const isPaid = booking.payment_status === "paid";

  const canPay = Boolean(booking.pnr) && !isTicketed && !isCancelled;
  const canCancel = Boolean(booking.pnr) && !isCancelled;

  const cardHighlightClass = isCancelled
    ? "border-red-500/30 bg-red-500/[0.03]"
    : isTicketed || isPaid
      ? "border-emerald-500/30 bg-emerald-500/[0.03]"
      : "border-amber-500/30 bg-amber-500/[0.04]";

  const contactEmail = passenger?.email || "eshrakg62@gmail.com";

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

      console.log("Cancel Ticket Payload:", JSON.stringify(payload, null, 2));

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
        className={`overflow-hidden rounded-2xl border bg-card shadow-sm transition hover:shadow-md dark:bg-card/80 ${cardHighlightClass}`}
      >
        <div className="border-b bg-muted/40 p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase text-muted-foreground">
                Booking Code
              </p>

              <h3 className="mt-1 text-lg font-extrabold text-foreground">
                {booking.booking_code}
              </h3>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                  PNR: {booking.pnr || "N/A"}
                </span>

                <BookingStatusBadge
                  bookingStatus={booking.booking_status}
                  paymentStatus={booking.payment_status}
                />
              </div>
            </div>

            <div className="text-left sm:text-right">
              <p className="text-xs font-semibold uppercase text-muted-foreground">
                Total
              </p>
              <p className="mt-1 text-2xl font-extrabold text-primary">
                {booking.pricing?.currency}{" "}
                {Number(booking.pricing?.total_amount ?? 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4 p-5">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="flex gap-3 rounded-xl border bg-background p-3">
              <Route className="mt-0.5 h-4 w-4 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Route</p>
                <p className="font-bold">{booking.route}</p>
              </div>
            </div>

            <div className="flex gap-3 rounded-xl border bg-background p-3">
              <CalendarDays className="mt-0.5 h-4 w-4 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Travel Date</p>
                <p className="font-bold">{booking.travel_start_date}</p>
              </div>
            </div>

            <div className="flex gap-3 rounded-xl border bg-background p-3">
              <UserRound className="mt-0.5 h-4 w-4 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Passenger</p>
                <p className="font-bold">
                  {passenger
                    ? `${passenger.given_name} ${passenger.surname}`
                    : "N/A"}
                </p>
              </div>
            </div>

            <div className="flex gap-3 rounded-xl border bg-background p-3">
              <Plane className="mt-0.5 h-4 w-4 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Trip Type</p>
                <p className="font-bold">{booking.trip_type}</p>
              </div>
            </div>
          </div>

          <div className="grid gap-3 border-t pt-4 sm:grid-cols-2">
            <Button
              onClick={() => setPaymentOpen(true)}
              disabled={!canPay}
              className="h-11 rounded-xl font-bold"
            >
              <CreditCard className="mr-2 h-4 w-4" />
              {isPaid || isTicketed ? "Paid" : "Pay Now"}
            </Button>

            <Button
              type="button"
              variant="destructive"
              onClick={() => setCancelOpen(true)}
              disabled={!canCancel || isCancelling}
              className="h-11 rounded-xl font-bold"
            >
              <TicketX className="mr-2 h-4 w-4" />
              Cancel Ticket
            </Button>
          </div>
        </div>
        <div className="flex justify-end">
          <Button asChild className="rounded-xl">
            <Link to={`/dashboard/flight-bookings/${booking.id}`}>
              View Details
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
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
