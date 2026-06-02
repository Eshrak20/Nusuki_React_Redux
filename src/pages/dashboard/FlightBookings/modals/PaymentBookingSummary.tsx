import { ShieldCheck } from "lucide-react";

import type { FlightBooking } from "@/types/flight/flightTicketPayment.types";

type Props = {
  booking: FlightBooking;
};

const PaymentBookingSummary = ({ booking }: Props) => {
  const currency = booking.pricing?.currency ?? "BDT";
  const amount = booking.pricing?.total_amount ?? 0;
  const totalAmount = `${currency} ${Number(amount).toLocaleString()}`;

  return (
    <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
      <div className="border-b bg-primary/5 p-4">
        <div className="flex items-center gap-2 text-sm font-bold text-primary">
          <ShieldCheck className="h-4 w-4" />
          Secure SSLCommerz Payment
        </div>
      </div>

      <div className="grid gap-4 p-4 sm:grid-cols-3">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            Booking Code
          </p>
          <h3 className="mt-1 break-all text-lg font-extrabold text-foreground">
            {booking.booking_code}
          </h3>
        </div>

        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            PNR Code
          </p>
          <h3 className="mt-1 text-lg font-extrabold tracking-wide text-primary">
            {booking.pnr || "N/A"}
          </h3>
        </div>

        <div className="sm:text-right">
          <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            Total Payable
          </p>
          <p className="mt-1 text-xl font-black text-foreground">
            {totalAmount}
          </p>
        </div>
      </div>

      <div className="border-t bg-muted/30 px-4 py-3">
        <p className="text-xs text-muted-foreground">
          You will be redirected to SSLCommerz secure checkout to complete your
          payment.
        </p>
      </div>
    </div>
  );
};

export default PaymentBookingSummary;