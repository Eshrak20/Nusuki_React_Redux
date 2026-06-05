import { WalletCards } from "lucide-react";
import type { HotelBookingDetailPricing } from "@/types/hotel/hotelBookingDetails.types";

type HotelBookingPricingCardProps = {
  pricing: HotelBookingDetailPricing;
};

const formatMoney = (amount: number, currency: string) => {
  return `${currency} ${Number(amount).toLocaleString()}`;
};

const HotelBookingPricingCard = ({ pricing }: HotelBookingPricingCardProps) => {
  return (
    <div className="h-fit rounded-sm border bg-card p-5 text-card-foreground shadow-sm sm:p-6">
      <div className="flex items-center gap-3">
        <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <WalletCards size={22} />
        </div>

        <div>
          <h3 className="text-lg font-semibold">Pricing Summary</h3>
          <p className="text-sm text-muted-foreground">
            Customer and supplier pricing
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        <PriceRow
          label="Base Amount"
          value={formatMoney(pricing.base_amount, pricing.currency)}
        />

        <PriceRow
          label="Tax Amount"
          value={formatMoney(pricing.tax_amount, pricing.currency)}
        />

        <div className="border-t pt-3">
          <PriceRow
            label="Total Amount"
            value={formatMoney(pricing.total_amount, pricing.currency)}
            strong
          />
        </div>
      </div>

      <div className="mt-6 rounded-sm border bg-background p-4">
        <h4 className="text-sm font-semibold">Supplier Pricing</h4>

        <div className="mt-3 space-y-2">
          <PriceRow
            label="Supplier Base"
            value={formatMoney(
              pricing.supplier_base_amount,
              pricing.supplier_currency,
            )}
          />

          <PriceRow
            label="Supplier Tax"
            value={formatMoney(
              pricing.supplier_tax_amount,
              pricing.supplier_currency,
            )}
          />

          <PriceRow
            label="Supplier Total"
            value={formatMoney(
              pricing.supplier_total_amount,
              pricing.supplier_currency,
            )}
            strong
          />
        </div>
      </div>
    </div>
  );
};

type PriceRowProps = {
  label: string;
  value: string;
  strong?: boolean;
};

const PriceRow = ({ label, value, strong }: PriceRowProps) => {
  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span
        className={
          strong
            ? "text-base font-bold text-primary"
            : "font-semibold text-foreground"
        }
      >
        {value}
      </span>
    </div>
  );
};

export default HotelBookingPricingCard;