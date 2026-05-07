import {
  ArrowRight,
  CalendarDays,
  Clock3,
  CreditCard,
  Luggage,
  Plane,
  Ticket,
  UserRound,
} from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import BookingStatusBadge from "./BookingStatusBadge";
import type { FlightBookingItem } from "@/types/flight/flightBooking.types";
import {
  cabinClassLabel,
  formatBookingDate,
  formatBookingDateTime,
  formatDuration,
  formatMoney,
  getBaggageLabel,
  tripTypeLabel,
} from "@/lib/utils.flightBooking";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

type FlightBookingCardProps = {
  booking: FlightBookingItem;
};

const InfoRow = ({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: React.ReactNode;
}) => {
  return (
    <div className="flex items-start gap-3 rounded-xl bg-muted/50 p-3 dark:bg-muted/30">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-background text-primary shadow-sm dark:bg-background/70">
        <Icon className="h-4 w-4" />
      </div>

      <div className="min-w-0">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        <div className="mt-0.5 text-sm font-semibold text-foreground">
          {value}
        </div>
      </div>
    </div>
  );
};

const FlightBookingCard = ({ booking }: FlightBookingCardProps) => {
  const firstSegment = booking.segments[0];
  const firstPassenger = booking.passengers[0];
  const firstTicket = booking.tickets[0];

  return (
    <Card className="group overflow-hidden rounded-2xl border-border/70 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-card/80">
      <CardHeader className="space-y-4 border-b bg-muted/30 p-5 dark:bg-muted/10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              <Plane className="h-4 w-4 text-primary" />
              {tripTypeLabel(booking.trip_type)}
            </div>

            <h3 className="mt-2 text-xl font-bold tracking-tight text-foreground">
              {booking.route}
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              Booking Code:{" "}
              <span className="font-semibold text-foreground">
                {booking.booking_code}
              </span>
            </p>
          </div>

          <div className="flex flex-wrap gap-2 sm:justify-end">
            <BookingStatusBadge status={booking.booking_status} />
            <BookingStatusBadge status={booking.payment_status} />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <span>
            PNR:{" "}
            <span className="font-semibold text-foreground">
              {booking.pnr || "N/A"}
            </span>
          </span>

          <span className="hidden text-border sm:inline">|</span>

          <span>
            Cabin:{" "}
            <span className="font-semibold text-foreground">
              {cabinClassLabel(booking.cabin_class)}
            </span>
          </span>

          <span className="hidden text-border sm:inline">|</span>

          <span>
            Traveller:{" "}
            <span className="font-semibold text-foreground">
              {booking.traveller_count}
            </span>
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-5 p-5">
        <div className="grid gap-3 sm:grid-cols-2">
          <InfoRow
            icon={CalendarDays}
            label="Travel Date"
            value={`${formatBookingDate(
              booking.travel_start_date,
            )} - ${formatBookingDate(booking.travel_end_date)}`}
          />

          <InfoRow
            icon={CreditCard}
            label="Total Amount"
            value={formatMoney(
              booking.pricing.total_amount,
              booking.pricing.currency,
            )}
          />

          <InfoRow
            icon={UserRound}
            label="Passenger"
            value={
              firstPassenger
                ? `${firstPassenger.given_name} ${firstPassenger.surname}`
                : "N/A"
            }
          />

          <InfoRow
            icon={Ticket}
            label="Ticket"
            value={
              firstTicket ? (
                <span>
                  {firstTicket.ticket_number}
                  <span className="ml-2 text-xs text-muted-foreground">
                    ({firstTicket.status})
                  </span>
                </span>
              ) : (
                "Not issued yet"
              )
            }
          />
        </div>

        {firstSegment ? (
          <>
            <Separator />

            <div className="rounded-2xl border bg-background p-4 dark:bg-background/50">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {firstSegment.airline_name}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {firstSegment.flight_number} · Booking Class{" "}
                    {firstSegment.booking_class}
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <p className="text-sm font-bold text-foreground">
                    {firstSegment.origin} → {firstSegment.destination}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {formatDuration(firstSegment.duration_minutes)}
                  </p>
                </div>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <InfoRow
                  icon={Clock3}
                  label="Departure"
                  value={formatBookingDateTime(firstSegment.departure_at)}
                />

                <InfoRow
                  icon={Clock3}
                  label="Arrival"
                  value={formatBookingDateTime(firstSegment.arrival_at)}
                />

                <InfoRow
                  icon={Luggage}
                  label="Baggage"
                  value={getBaggageLabel(firstSegment.baggage)}
                />
              </div>
            </div>
          </>
        ) : null}

        {booking.ttl_at && booking.is_ticketable ? (
          <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-3 text-sm text-amber-700 dark:text-amber-300">
            Ticket time limit:{" "}
            <span className="font-semibold">
              {formatBookingDateTime(booking.ttl_at)}
            </span>
          </div>
        ) : null}
        <div className="flex justify-end">
          <Button asChild className="rounded-xl">
            <Link to={`/dashboard/flight-bookings/${booking.id}`}>
              View Details
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FlightBookingCard;
