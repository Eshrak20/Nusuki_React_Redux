import type { FlightPricing } from "@/types/flight/flightResults.types";
import { Button } from "@/components/ui/button";

interface Props {
  pricing: FlightPricing;
}

const FlightPriceInfo = ({ pricing }: Props) => {
  return (
    <div className="flex flex-col justify-center gap-4 xl:items-end">
      <div className="text-left xl:text-right">
        <p className="text-5xl font-extrabold tracking-tight text-slate-900">৳{pricing.total}</p>
        <p className="text-sm text-slate-400 line-through">৳{pricing.base + pricing.tax}</p>
      </div>

      <Button className="h-12 rounded-xl px-8 text-base font-semibold">Book Now</Button>
    </div>
  );
};

export default FlightPriceInfo;