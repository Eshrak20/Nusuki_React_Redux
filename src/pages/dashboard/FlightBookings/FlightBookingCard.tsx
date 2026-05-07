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
        {/* Header Section: Adjusted to p-6 pb-4 */}
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
                <span className="rounded-lg bg-primary/10 px-3 py-1 text-xs font-bold text-primary border border-primary/20">
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
                <span className="text-sm font-bold mr-1">{booking.pricing?.currency}</span>
                {Number(booking.pricing?.total_amount ?? 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Content Section: Adjusted to p-6 pt-4 */}
        <div className="p-6 pt-4 space-y-6">
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { icon: Route, label: "Route", value: booking.route },
              { icon: CalendarDays, label: "Travel Date", value: booking.travel_start_date },
              {
                icon: UserRound,
                label: "Passenger",
                value: passenger ? `${passenger.given_name} ${passenger.surname}` : "N/A"
              },
              { icon: Plane, label: "Trip Type", value: booking.trip_type },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-3 rounded-xl border bg-muted/5 p-3 shadow-sm">
                <item.icon className="mt-0.5 h-4 w-4 text-primary shrink-0" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-tighter text-muted-foreground">
                    {item.label}
                  </p>
                  <p className="text-sm font-bold leading-tight">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <Button
                onClick={() => setPaymentOpen(true)}
                disabled={!canPay}
                className="h-11 rounded-xl font-bold shadow-sm"
              >
                <CreditCard className="mr-2 h-4 w-4" />
                {isPaid || isTicketed ? "Paid" : "Pay Now"}
              </Button>

              <Button
                type="button"
                variant="destructive"
                onClick={() => setCancelOpen(true)}
                disabled={!canCancel || isCancelling}
                className="h-11 rounded-xl font-bold shadow-sm"
              >
                <TicketX className="mr-2 h-4 w-4" />
                Cancel Ticket
              </Button>
            </div>

            {/* Footer View Details - Padded correctly */}
            <div className="flex justify-center pt-2">
              <Button asChild variant="ghost" className="rounded-xl w-full text-muted-foreground hover:text-primary hover:bg-primary/5">
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
