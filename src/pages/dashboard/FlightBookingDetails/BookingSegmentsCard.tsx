import { Clock3, Luggage } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import DetailItem from "./DetailItem";
import {
  formatBookingDateTime,
  formatDuration,
  getBaggageLabel,
} from "@/lib/utils.flightBooking";
import type { FlightBookingSegment } from "@/types/flight/flightBooking.types";

type BookingSegmentsCardProps = {
  segments: FlightBookingSegment[];
};

const BookingSegmentsCard = ({ segments }: BookingSegmentsCardProps) => {
  return (
    <Card className="rounded-sm shadow-sm">
      <CardHeader className="border-b p-5">
        <h3 className="text-lg font-bold text-foreground">Flight Segments</h3>
        <p className="text-sm text-muted-foreground">
          Airline, route, departure, arrival and baggage details.
        </p>
      </CardHeader>

      <CardContent className="space-y-4 p-5">
        {segments.length > 0 ? (
          segments.map((segment) => (
            <div
              key={segment.id}
              className="rounded-sm border bg-background p-4 dark:bg-background/50"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-base font-bold text-foreground">
                    {segment.airline_name}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {segment.flight_number} · {segment.airline_code} · Booking
                    Class {segment.booking_class}
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <p className="text-lg font-bold text-foreground">
                    {segment.origin} → {segment.destination}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {formatDuration(segment.duration_minutes)}
                  </p>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="grid gap-4 sm:grid-cols-3">
                <DetailItem
                  icon={Clock3}
                  label="Departure"
                  value={formatBookingDateTime(segment.departure_at)}
                />

                <DetailItem
                  icon={Clock3}
                  label="Arrival"
                  value={formatBookingDateTime(segment.arrival_at)}
                />

                <DetailItem
                  icon={Luggage}
                  label="Baggage"
                  value={getBaggageLabel(segment.baggage)}
                />
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">No segment data found.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default BookingSegmentsCard;