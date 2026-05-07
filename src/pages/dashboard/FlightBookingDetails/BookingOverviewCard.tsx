import { CalendarDays, Clock3, Plane, UserRound } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import BookingStatusBadge from "../FlightBookings/BookingStatusBadge";
import DetailItem from "./DetailItem";

import {
  cabinClassLabel,
  formatBookingDate,
  formatBookingDateTime,
  tripTypeLabel,
} from "@/lib/utils.flightBooking";
import type { FlightBookingItem } from "@/types/flight/flightBooking.types";

type BookingOverviewCardProps = {
  booking: FlightBookingItem;
};

const BookingOverviewCard = ({ booking }: BookingOverviewCardProps) => {
  return (
    <Card className="overflow-hidden rounded-2xl shadow-sm">
      <CardHeader className="border-b bg-muted/30 p-5 dark:bg-muted/10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-primary">
              {tripTypeLabel(booking.trip_type)}
            </p>

            <h2 className="mt-2 text-2xl font-bold text-foreground">
              {booking.route}
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              PNR:{" "}
              <span className="font-semibold text-foreground">
                {booking.pnr || "N/A"}
              </span>
            </p>
          </div>

          <div className="flex flex-wrap gap-2 sm:justify-end">
            <BookingStatusBadge status={booking.booking_status} />
            <BookingStatusBadge status={booking.payment_status} />
          </div>
        </div>
      </CardHeader>

      <CardContent className="grid gap-4 p-5 sm:grid-cols-2 xl:grid-cols-4">
        <DetailItem
          icon={CalendarDays}
          label="Travel Date"
          value={`${formatBookingDate(
            booking.travel_start_date
          )} - ${formatBookingDate(booking.travel_end_date)}`}
        />

        <DetailItem
          icon={UserRound}
          label="Traveller Count"
          value={booking.traveller_count}
        />

        <DetailItem
          icon={Plane}
          label="Cabin Class"
          value={cabinClassLabel(booking.cabin_class)}
        />

        <DetailItem
          icon={Clock3}
          label="Ticket Time Limit"
          value={formatBookingDateTime(booking.ttl_at)}
        />
      </CardContent>
    </Card>
  );
};

export default BookingOverviewCard;