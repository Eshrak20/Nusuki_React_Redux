import { useMemo, useState } from "react";
import { CalendarDays } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  getOfferPrices,
  type Offer,
} from "./holidayOffer.utils";

import HolidayOfferContactDialog from "./HolidayOfferContactDialog";
import HolidayOfferRequestDialog from "./HolidayOfferRequestDialog";
import { formatDate } from "../holidayDetails.helpers";

interface Props {
  offer: Offer;
}

const HolidayOfferCard = ({ offer }: Props) => {
  const [contactOpen, setContactOpen] = useState(false);
  const [requestOpen, setRequestOpen] = useState(false);

  const prices = useMemo(() => getOfferPrices(offer), [offer]);

  const handleRequestClick = () => {
    setContactOpen(false);
    setRequestOpen(true);
  };

  return (
    <>
      <div className="border bg-card shadow-sm transition hover:border-primary/40 hover:shadow-md">
        <div className="border-b p-5">
          <h3 className="text-xl font-bold uppercase tracking-wide text-primary">
            {offer.name}
          </h3>

          <div className="mt-5 grid grid-cols-3 gap-3 text-xs">
            <div>
              <p className="text-muted-foreground">Valid From</p>
              <p className="mt-1 font-bold text-foreground">
                {formatDate(offer.valid_from)}
              </p>
            </div>

            <div>
              <p className="text-muted-foreground">Valid Till</p>
              <p className="mt-1 font-bold text-foreground">
                {formatDate(offer.valid_until)}
              </p>
            </div>

            <div>
              <p className="text-muted-foreground">Departs</p>
              <p className="mt-1 font-bold text-foreground">
                {offer.departs || "-"}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-5 p-5">
          <div className="grid grid-cols-2 gap-4">
            {prices.map((item) => (
              <div key={item.label}>
                <p className="text-xs text-muted-foreground">
                  Price Per Person {item.label}:
                </p>
                <p className="text-sm font-bold text-foreground">
                  {item.price}
                </p>
              </div>
            ))}
          </div>

          {offer.description && (
            <div
              className="space-y-2 text-sm text-muted-foreground [&_p]:flex [&_p]:items-start [&_p]:gap-2 [&_p]:before:mt-0.5 [&_p]:before:content-['🏨']"
              dangerouslySetInnerHTML={{ __html: offer.description }}
            />
          )}

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <CalendarDays className="h-3.5 w-3.5 text-primary" />
            Price includes VAT & Tax
          </div>
        </div>

        <Button
          onClick={() => setContactOpen(true)}
          className="h-12 w-full rounded-none text-sm font-semibold uppercase"
        >
          Select Offer
        </Button>
      </div>

      <HolidayOfferContactDialog
        offer={offer}
        open={contactOpen}
        onOpenChange={setContactOpen}
        onRequestClick={handleRequestClick}
      />

      <HolidayOfferRequestDialog
        offer={offer}
        open={requestOpen}
        onOpenChange={setRequestOpen}
      />
    </>
  );
};

export default HolidayOfferCard;