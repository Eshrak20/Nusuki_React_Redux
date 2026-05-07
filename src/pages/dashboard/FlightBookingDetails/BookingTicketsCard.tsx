import { Clock3, CreditCard, ReceiptText, Ticket } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

import DetailItem from "./DetailItem";
import {
  formatBookingDateTime,
  formatMoney,
} from "@/lib/utils.flightBooking";
import type { FlightBookingTicket } from "@/types/flight/flightBooking.types";

type BookingTicketsCardProps = {
  tickets: FlightBookingTicket[];
};

const BookingTicketsCard = ({ tickets }: BookingTicketsCardProps) => {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader className="border-b p-5">
        <h3 className="text-lg font-bold text-foreground">
          Ticket Information
        </h3>
      </CardHeader>

      <CardContent className="space-y-4 p-5">
        {tickets.length > 0 ? (
          tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="rounded-2xl border bg-muted/30 p-4 dark:bg-muted/10"
            >
              <DetailItem
                icon={Ticket}
                label="Ticket Number"
                value={ticket.ticket_number}
              />

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <DetailItem
                  icon={ReceiptText}
                  label="Status"
                  value={ticket.status}
                />

                <DetailItem
                  icon={CreditCard}
                  label="Amount"
                  value={formatMoney(ticket.total_amount, ticket.currency)}
                />
              </div>

              <div className="mt-4">
                <DetailItem
                  icon={Clock3}
                  label="Issued At"
                  value={formatBookingDateTime(ticket.issued_at)}
                />
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">
            No ticket has been issued yet.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default BookingTicketsCard;