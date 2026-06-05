import { CalendarDays, Clock3, Plane, UserRound } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import DetailItem from "./DetailItem";

import {
  cabinClassLabel,
  formatBookingDate,
  formatBookingDateTime,
} from "@/lib/utils.flightBooking";
import type { FlightBookingItem } from "@/types/flight/flightBooking.types";

type BookingOverviewCardProps = {
  booking: FlightBookingItem;
};

const BookingOverviewCard = ({ booking }: BookingOverviewCardProps) => {
  return (
    <Card className="overflow-hidden rounded-sm shadow-sm">
      <CardContent className="grid gap-3 py-5 px-2 sm:grid-cols-2 xl:grid-cols-4">
        <DetailItem
          icon={CalendarDays}
          label="Travel Date"
          value={`${formatBookingDate(
            booking.travel_start_date,
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
          value={formatBookingDateTime(booking.payment_ttl)}
        />
      </CardContent>
    </Card>
  );
};

export default BookingOverviewCard;
