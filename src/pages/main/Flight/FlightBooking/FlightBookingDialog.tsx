import { useEffect, useMemo, useRef, useState } from "react";
import { X } from "lucide-react";

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
  onContinue?: (params: { flightId: string; searchId: string }) => void;
}

const FlightBookingDialog = ({
  open,
  onOpenChange,
  flightId,
  searchId,
  onContinue,
}: Props) => {
  const [detailsState, setDetailsState] = useState<{
    key: string;
    open: boolean;
  } | null>(null);

  const { timeText } = useSharedFlightTimer();

  const lastTriggeredKeyRef = useRef<string>("");

  const [trigger, { data, isFetching, isError }] =
    useLazyFlightDetailTicketQuery();

  useEffect(() => {
    if (!open || !flightId || !searchId) return;

    const requestKey = `${flightId}-${searchId}`;

    if (lastTriggeredKeyRef.current === requestKey) return;

    lastTriggeredKeyRef.current = requestKey;

    trigger(
      {
        flight_id: flightId,
        search_id: searchId,
      },
      true,
    );
  }, [open, flightId, searchId, trigger]);

  useEffect(() => {
    if (!open) {
      lastTriggeredKeyRef.current = "";
    }
  }, [open]);

  const flight = data?.data?.flight;

  const pnrFlightId = data?.data?.flight_id ?? flightId;
  const pnrSearchId = data?.data?.search_id ?? searchId;

  const title = useMemo(() => getTripTitle(flight), [flight]);

  const detailsKey = useMemo(() => {
    if (!flight) return "";

    return `${pnrFlightId}-${pnrSearchId}-${flight.segments.length}`;
  }, [flight, pnrFlightId, pnrSearchId]);

  const isSingleFlight = flight?.segments.length === 1;

  const isDetailsOpen =
    detailsState?.key === detailsKey ? detailsState.open : isSingleFlight;

  const handleToggleDetails = () => {
    setDetailsState((prev) => ({
      key: detailsKey,
      open: prev?.key === detailsKey ? !prev.open : !isSingleFlight,
    }));
  };

  const handleContinue = () => {
    if (!pnrFlightId || !pnrSearchId) return;

    onContinue?.({
      flightId: pnrFlightId,
      searchId: pnrSearchId,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="h-[91vh] w-[98vw]! max-w-375! -mt-5 overflow-y-auto border-none p-0 shadow-2xl dark:bg-[#0b1220] sm:rounded-sm">
        <DialogTitle className="sr-only">Flight booking details</DialogTitle>

        <button
          type="button"
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 z-30 rounded-sm border border-black/15 bg-white/90 p-1 text-[#666] transition hover:bg-white dark:border-white/10 dark:bg-[#111827] dark:text-white/70 dark:hover:bg-[#1a2335]"
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
          <div className="flex min-h-full flex-col">
            <div className="flex-1 px-4 pt-6 md:px-8 xl:px-10">
              <div className="mx-auto w-full max-w-7xl">
                <div className="mb-6 pt-4">
                  <h2 className="mx-8 text-center text-[18px] font-extrabold uppercase tracking-tight text-[#17306f] dark:text-[#8fb4ff] md:text-[34px] lg:mx-5 lg:text-[28px]">
                    {title}
                  </h2>
                </div>

                <div className="mb-6 block lg:hidden">
                  <BookingTimerCard timeText={timeText} />
                </div>

                <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
                  <div className="order-1 space-y-5 xl:order-2">
                    <div className="hidden lg:block">
                      <BookingTimerCard timeText={timeText} />
                    </div>

                    <BookingPriceSidebar flight={flight} />
                  </div>

                  <div className="order-2 min-h-0 space-y-5 pb-4 xl:order-1">
                    <BookingJourneyTimeline flight={flight} />

                    <BookingFlightDetailsAccordion
                      open={isDetailsOpen}
                      onToggle={handleToggleDetails}
                      flight={flight}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className=" border-t border-black/5 bg-[#eef1f5] px-6 py-4 dark:border-white/10 dark:bg-[#0b1220]">
              <div className="mx-auto flex max-w-7xl justify-center">
                <Button
                  onClick={handleContinue}
                  disabled={!pnrFlightId || !pnrSearchId}
                  className="h-11 min-w-57.5 rounded-sm bg-[#17306f] px-8 text-[16px] font-bold text-white hover:bg-[#102558] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#1f4fa3] dark:hover:bg-[#1a438b]"
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