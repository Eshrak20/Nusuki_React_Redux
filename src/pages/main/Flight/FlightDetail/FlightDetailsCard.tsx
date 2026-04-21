import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { FlightResultItem } from "@/types/flight/flightResults.types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FlightJourneySummary from "./FlightJourneySummary";
import FlightPriceInfo from "./FlightPriceInfo";
import FlightMetaBadges from "./FlightMetaBadges";
import FlightTabsDetails from "./table/FlightTabsDetails";
import FlightBookingDialog from "../FlightBooking/FlightBookingDialog";

interface Props {
  flight: FlightResultItem;
}

const FlightDetailsCard = ({ flight }: Props) => {
  const [open, setOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <Card className="overflow-hidden border border-border/60 bg-card shadow-sm transition-all duration-300 hover:shadow-md md:rounded-3xl">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 gap-8 p-5 sm:p-6 xl:grid-cols-[minmax(0,1fr)_260px] xl:items-center">
              <FlightJourneySummary flight={flight} />
              <FlightPriceInfo
                pricing={flight.pricing}
                onBookNow={() => setBookingOpen(true)}
              />
            </div>

            <div className="border-t bg-muted/30 px-5 py-4 sm:px-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <FlightMetaBadges flight={flight} />

                <Button
                  variant="ghost"
                  onClick={() => setOpen((prev) => !prev)}
                  className="group w-fit gap-2 px-0 text-sm font-semibold text-muted-foreground hover:bg-transparent hover:text-primary"
                >
                  {open ? "Hide Flight Details" : "View Flight Details"}
                  {open ? (
                    <ChevronUp className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
                  ) : (
                    <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5" />
                  )}
                </Button>
              </div>
            </div>

            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  key="flight-details"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <FlightTabsDetails flight={flight} />
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>

      <FlightBookingDialog
        open={bookingOpen}
        onOpenChange={setBookingOpen}
        flightId={flight.flight_id}
        searchId={flight.search_id}
        onContinue={() => {
          console.log("continue booking is clicked from FlightBookingDialog to FlightDetailsCard");
        }}
      />
    </>
  );
};

export default FlightDetailsCard;
