import { useMemo, useState } from "react";
import { CalendarDays, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { getOfferPrices, type Offer } from "./holidayOffer.utils";
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -8 }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        className="group relative overflow-hidden rounded-sm border bg-linear-to-b from-card to-background shadow-lg transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10"
      >
        {/* Cinematic Animated Border Flare */}
        <div
          className="absolute -inset-px z-0 bg-linear-to-r from-primary/30 via-primary/20 to-primary/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            maskImage: "linear-gradient(black, black)",
            WebkitMaskImage: "linear-gradient(black, black)",
          }}
        />

        <div className="relative z-10">
          {/* Header Section */}
          <div className="pt-6 pr-6 pl-6">
            <div className="flex justify-between items-center gap-3">
              {/* Pricing Info */}
              <div className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground/70">
                <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                Includes VAT & Tax
              </div>
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-full bg-primary/10 px-5 py-2 -mr-3 text-sm font-bold uppercase tracking-widest text-primary"
              >
                {offer.name}
              </motion.div>
            </div>

            <div className="mt-6 flex justify-between items-center gap-4 text-[11px]">
              <div className="space-y-1">
                <p className="flex items-center gap-1.5 text-muted-foreground uppercase tracking-wider font-medium">
                  <CalendarDays className="h-3 w-3" /> Valid From
                </p>
                <p className="font-bold text-foreground">
                  {formatDate(offer.valid_from)}
                </p>
              </div>
              <div className="h-8 w-px bg-border/50" />
              <div className="space-y-1">
                <p className="text-muted-foreground uppercase tracking-wider font-medium text-right">
                  Valid Till
                </p>
                <p className="font-bold text-foreground text-right">
                  {formatDate(offer.valid_until)}
                </p>
              </div>
            </div>
          </div>

          {/* Pricing & Content */}
          <div className="space-y-6 p-6">
            <div className="grid grid-cols-2 gap-4">
              {prices.map((item, idx) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="rounded-sm bg-secondary/30 p-3 transition-colors group-hover:bg-secondary/50"
                >
                  <p className="text-[10px] font-semibold uppercase text-muted-foreground tracking-tighter">
                    {item.label}
                  </p>
                  <p className="text-lg font-black text-primary">
                    {item.price}
                  </p>
                </motion.div>
              ))}
            </div>

            {offer.description && (
              <div
                className="prose-sm line-clamp-3 text-sm leading-relaxed text-muted-foreground/80 transition-colors group-hover:text-muted-foreground [&_p]:flex [&_p]:items-start [&_p]:gap-2 [&_p]:before:content-['✦'] [&_p]:before:text-primary/60"
                dangerouslySetInnerHTML={{ __html: offer.description }}
              />
            )}
          </div>

          {/* Action Button */}
          <div className="p-0 pt-0">
            <Button
              onClick={() => setContactOpen(true)}
              className="relative h-14 w-full overflow-hidden -rounded-sm bg-primary text-sm font-bold uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Select Offer{" "}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
              <motion.div
                className="absolute inset-0 z-0 bg-linear-to-r from-primary via-primary-foreground/10 to-primary"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              />
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Dialogs remain the same logic-wise */}
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
