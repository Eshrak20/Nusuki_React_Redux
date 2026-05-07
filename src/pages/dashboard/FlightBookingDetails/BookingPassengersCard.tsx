import { CalendarDays, Mail, Phone, Ticket, UserRound } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

import DetailItem from "./DetailItem";
import { formatBookingDate } from "@/lib/utils.flightBooking";
import type { FlightBookingPassenger } from "@/types/flight/flightBooking.types";

type BookingPassengersCardProps = {
  passengers: FlightBookingPassenger[];
};

const BookingPassengersCard = ({ passengers }: BookingPassengersCardProps) => {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader className="border-b p-5">
        <h3 className="text-lg font-bold text-foreground">
          Passenger Details
        </h3>
        <p className="text-sm text-muted-foreground">
          Traveller information attached with this booking.
        </p>
      </CardHeader>

      <CardContent className="grid gap-4 p-5 md:grid-cols-2">
        {passengers.length > 0 ? (
          passengers.map((passenger) => (
            <div
              key={passenger.id}
              className="rounded-2xl border bg-background p-4 dark:bg-background/50"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <UserRound className="h-5 w-5" />
                </div>

                <div>
                  <h4 className="text-base font-bold text-foreground">
                    {passenger.given_name} {passenger.surname}
                  </h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {passenger.passenger_type} · {passenger.gender}
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <DetailItem
                  icon={CalendarDays}
                  label="Date of Birth"
                  value={formatBookingDate(passenger.date_of_birth)}
                />

                <DetailItem
                  icon={Ticket}
                  label="Passport No"
                  value={passenger.passport_no || "N/A"}
                />

                <DetailItem
                  icon={Phone}
                  label="Phone"
                  value={passenger.phone || "N/A"}
                />

                <DetailItem
                  icon={Mail}
                  label="Email"
                  value={passenger.email || "N/A"}
                />
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">
            No passenger data found.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default BookingPassengersCard;