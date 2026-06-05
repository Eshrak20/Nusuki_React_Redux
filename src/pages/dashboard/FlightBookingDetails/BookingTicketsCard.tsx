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
    <Card className="rounded-sm shadow-sm">
      <CardHeader className="border-b p-5">
        <h3 className="text-lg font-bold text-foreground">
          Ticket Information
        </h3>
      </CardHeader>

      <CardContent className="pb-5">
        {tickets.length > 0 ? (
            <div
              key={tickets[0].id}
              className="rounded-sm border bg-muted/30 p-4 dark:bg-muted/10"
            >
              <DetailItem
                icon={Ticket}
                label="Ticket Number"
                value={tickets[0].ticket_number}
              />

              <div className="mt-2 grid gap-3 sm:grid-cols-2">
                <DetailItem
                  icon={ReceiptText}
                  label="Status"
                  value={tickets[0].status}
                />

                <DetailItem
                  icon={CreditCard}
                  label="Amount"
                  value={formatMoney(tickets[0].total_amount, tickets[0].currency)}
                />
              </div>

              <div className="mt-2">
                <DetailItem
                  icon={Clock3}
                  label="Issued At"
                  value={formatBookingDateTime(tickets[0].issued_at)}
                />
              </div>
            </div>
          
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