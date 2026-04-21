import { ArrowRight, BadgePercent } from "lucide-react";
import type { FlightPricing } from "@/types/flight/flightResults.types";
import { Button } from "@/components/ui/button";

interface Props {
  pricing: FlightPricing;
  onBookNow: () => void;
}

const formatBDT = (amount: number | string) => {
  const value = Number(amount || 0);
  return `৳${value.toLocaleString("en-BD", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

const FlightPriceInfo = ({ pricing, onBookNow }: Props) => {
  const basePlusTax = Number(pricing.base || 0) + Number(pricing.tax || 0);
  const hasDiscount = Number(pricing.discount || 0) > 0;

  return (
    <div className="flex flex-col justify-center gap-4 xl:items-end">
      <div className="space-y-2 text-left xl:text-right">
        {hasDiscount && (
          <div className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-500/10 dark:text-green-400">
            <BadgePercent className="h-3.5 w-3.5" />
            Discount Applied
          </div>
        )}

        <p className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          {formatBDT(pricing.total)}
        </p>

        <p className="text-sm text-muted-foreground line-through">
          {formatBDT(basePlusTax)}
        </p>
      </div>

      <Button
        onClick={onBookNow}
        className="h-12 rounded-xl px-8 text-base font-semibold shadow-sm transition-all duration-200 hover:scale-[1.02]"
      >
        Book Now
        <ArrowRight className="ml-1 h-4 w-4" />
      </Button>
    </div>
  );
};

export default FlightPriceInfo;