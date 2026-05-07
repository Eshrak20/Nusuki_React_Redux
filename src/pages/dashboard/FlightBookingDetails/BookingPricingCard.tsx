import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { formatMoney } from "@/lib/utils.flightBooking";
import type { FlightBookingPricing } from "@/types/flight/flightBooking.types";

type BookingPricingCardProps = {
  pricing: FlightBookingPricing;
};

const BookingPricingCard = ({ pricing }: BookingPricingCardProps) => {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader className="border-b p-5">
        <h3 className="text-lg font-bold text-foreground">Pricing Summary</h3>
      </CardHeader>

      <CardContent className="space-y-4 p-5">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Base Amount</span>
          <span className="font-semibold text-foreground">
            {formatMoney(pricing.base_amount, pricing.currency)}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Tax Amount</span>
          <span className="font-semibold text-foreground">
            {formatMoney(pricing.tax_amount, pricing.currency)}
          </span>
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <span className="font-bold text-foreground">Total Amount</span>
          <span className="text-xl font-bold text-primary">
            {formatMoney(pricing.total_amount, pricing.currency)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingPricingCard;