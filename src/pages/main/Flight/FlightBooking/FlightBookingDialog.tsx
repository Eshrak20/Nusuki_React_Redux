import { useEffect, useMemo, useState } from "react";
import {  X } from "lucide-react";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { getTripTitle } from "./flightBooking.helpers";
import BookingTimerCard from "./BookingTimerCard";
import BookingFlightDetailsAccordion from "./BookingFlightDetailsAccordion";
import { useLazyFlightDetailTicketQuery } from "@/redux/api/flightApi/flightTicket";
import BookingJourneyTimeline from "./BookingJourneyTimeline";
import BookingPriceSidebar from "./BookingPriceSidebar";
import useSharedFlightTimer from "@/hooks/useSharedFlightTimer";
import FlightDetailState from "@/components/skeletons/FlightDetailState";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  flightId: string;
  searchId: string;
  onContinue?: () => void;
}

const FlightBookingDialog = ({
  open,
  onOpenChange,
  flightId,
  searchId,
  onContinue,
}: Props) => {
  const [showDetails, setShowDetails] = useState(false);
  const { timeText } = useSharedFlightTimer();
  const [trigger, { data, isFetching, isError }] =
    useLazyFlightDetailTicketQuery();

  useEffect(() => {
    if (open && flightId && searchId) {
      trigger(
        {
          flight_id: flightId,
          search_id: searchId,
        },
        true,
      );
    }
  }, [open, flightId, searchId, trigger]);

  const flight = data?.data?.flight;
  const title = useMemo(() => getTripTitle(flight), [flight]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="h-[94vh] w-[98vw]! max-w-375! overflow-hidden border-none bg-[#eef1f5] p-0 shadow-2xl dark:bg-[#0b1220] sm:rounded-xl">
        <DialogTitle className="sr-only">Flight booking details</DialogTitle>

        <button
          type="button"
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 z-20 rounded-md border border-black/15 bg-white/90 p-1 text-[#666] transition hover:bg-white dark:border-white/10 dark:bg-[#111827] dark:text-white/70 dark:hover:bg-[#1a2335]"
        >
          <X className="h-5 w-5" />
        </button>

        {isFetching ? (
          <FlightDetailState variant="loading" />
        ) : isError || !flight ? (
          <FlightDetailState
            variant="error"
            title="Failed to load flight detail"
            message="Please try again."
          />
        ) : (
          <div className="flex h-full flex-col">
            <div className="flex-1 overflow-y-auto px-6 py-6 md:px-8 xl:px-10">
              <div className="mx-auto w-full max-w-7xl">
                <div className="mb-6">
                  <h2 className="text-center text-[28px] font-extrabold uppercase tracking-tight text-[#17306f] dark:text-[#8fb4ff] md:text-[34px]">
                    {title}
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
                  <div className="space-y-5 min-h-0 max-h-[70vh] overflow-y-auto pr-2">
                    <BookingJourneyTimeline flight={flight} />
                    <BookingFlightDetailsAccordion
                      open={showDetails}
                      onToggle={() => setShowDetails((prev) => !prev)}
                      flight={flight}
                    />
                  </div>

                  <div className="space-y-5">
                    <BookingTimerCard timeText={timeText} />
                    <BookingPriceSidebar flight={flight} />
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-black/5 bg-[#eef1f5] px-6 py-4 dark:border-white/10 dark:bg-[#0b1220]">
              <div className="mx-auto flex max-w-7xl justify-center">
                <Button
                  onClick={onContinue}
                  className="h-11 min-w-57.5 rounded-md bg-[#17306f] px-8 text-[16px] font-bold text-white hover:bg-[#102558] dark:bg-[#1f4fa3] dark:hover:bg-[#1a438b]"
                >
                  Next - Continue Booking
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FlightBookingDialog;
