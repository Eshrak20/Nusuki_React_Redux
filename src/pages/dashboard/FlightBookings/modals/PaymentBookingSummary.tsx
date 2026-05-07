import { ShieldCheck } from "lucide-react";

import type { FlightBooking } from "@/types/flight/flightTicketPayment.types";

type Props = {
  booking: FlightBooking;
};

const PaymentBookingSummary = ({ booking }: Props) => {
  const currency = booking.pricing?.currency ?? "BDT";
  const amount = booking.pricing?.total_amount ?? "0.00";
  const totalAmount = `${currency} ${Number(amount).toLocaleString()}`;

  return (
    <div className="rounded-2xl border bg-card p-4 shadow-sm">
      <div className="mb-4 flex items-center gap-2 text-sm font-bold text-primary">
        <ShieldCheck className="h-4 w-4" />
        Secure Ticket Payment
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase text-muted-foreground">
            PNR Code
          </p>
          <h3 className="mt-1 text-2xl font-extrabold tracking-wide text-primary">
            {booking.pnr}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Route: {booking.route}
          </p>
        </div>

        <div className="text-left sm:text-right">
          <p className="text-xs font-semibold uppercase text-muted-foreground">
            Total Payable
          </p>
          <p className="mt-1 text-2xl font-extrabold text-foreground">
            {totalAmount}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Pay within TTL time to issue ticket.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentBookingSummary;