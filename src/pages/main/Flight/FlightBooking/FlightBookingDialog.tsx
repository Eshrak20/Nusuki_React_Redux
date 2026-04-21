import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Clock3,
  Loader2,
} from "lucide-react";
import { format, parseISO } from "date-fns";

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useLazyFlightDetailTicketQuery } from "@/redux/api/flightApi/flightTicket";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  flightId: string;
  searchId: string;
  onContinue?: () => void;
}

const formatBDT = (amount: number | string) => {
  const value = Number(amount || 0);
  return `৳ ${value.toLocaleString("en-BD", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })}`;
};

const formatDateLabel = (date?: string) => {
  if (!date) return "";
  try {
    return format(parseISO(date), "yyyy-MM-dd");
  } catch {
    return date;
  }
};

const formatFullDate = (date?: string) => {
  if (!date) return "";
  try {
    return format(parseISO(date), "EEE dd MMM yyyy");
  } catch {
    return date;
  }
};

const formatTime = (date?: string) => {
  if (!date) return "--:--";
  try {
    return format(parseISO(date), "HH:mm");
  } catch {
    return "--:--";
  }
};

const FlightBookingDialog = ({
  open,
  onOpenChange,
  flightId,
  searchId,
  onContinue,
}: Props) => {
  const [showDetails, setShowDetails] = useState(false);

  const [trigger, { data, isFetching, isError }] =
    useLazyFlightDetailTicketQuery();

  useEffect(() => {
    if (open && flightId && searchId) {
      trigger(
        {
          flight_id: flightId,
          search_id: searchId,
        },
        true
      );
    }
  }, [open, flightId, searchId, trigger]);

  const flight = data?.data?.flight;
  const revalidation = data?.data?.revalidation;

  const title = useMemo(() => {
    if (!flight?.segments?.length) return "TRIP DETAILS";
    const lastDestination =
      flight.segments[0]?.destination?.city_name ||
      flight.segments[0]?.destination?.airport_name ||
      flight.segments[0]?.destination?.airport ||
      "DESTINATION";

    const country =
      flight.segments[0]?.destination?.country_name || "COUNTRY";

    return `TRIP TO ${lastDestination.toUpperCase()} - ${country.toUpperCase()}`;
  }, [flight]);

  const totalPayable = useMemo(() => {
    if (!flight?.pricing) return 0;
    const total = Number(flight.pricing.total || 0);
    const discount = Number(flight.pricing.discount || 0);
    return total - discount;
  }, [flight]);

  const aitAmount = useMemo(() => {
    const passengerTaxBreakdown =
      flight?.pricing?.passenger_breakdown?.[0]?.tax_breakdown || [];

    const aitLikeTax = passengerTaxBreakdown.find((item) =>
      item.description.toLowerCase().includes("advance income tax")
    );

    return Number(aitLikeTax?.amount || 140);
  }, [flight]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "w-full border-none bg-[#eef1f5] p-0 shadow-2xl",
          "overflow-hidden rounded-none sm:rounded-md"
        )}
      >
        <DialogTitle className="sr-only">Flight booking details</DialogTitle>

        {isFetching ? (
          <div className="flex h-[70vh] items-center justify-center">
            <div className="flex flex-col items-center gap-3 text-[#1e3775]">
              <Loader2 className="h-10 w-10 animate-spin" />
              <p className="text-sm font-semibold">Loading latest flight details...</p>
            </div>
          </div>
        ) : isError || !flight ? (
          <div className="flex h-[70vh] items-center justify-center">
            <div className="flex flex-col items-center gap-3 text-center">
              <AlertCircle className="h-10 w-10 text-red-500" />
              <div>
                <p className="text-lg font-bold text-[#1a2f6b]">
                  Failed to load flight detail
                </p>
                <p className="text-sm text-muted-foreground">
                  Please try again.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex max-h-[95vh] flex-col">
            <div className="overflow-y-auto px-6 py-5 md:px-10">
              <div className="mx-auto w-full max-w-[1320px]">
                <div className="mb-5">
                  <h2 className="text-center text-[30px] font-extrabold uppercase tracking-tight text-[#17306f]">
                    {title}
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_372px]">
                  {/* Left side */}
                  <div className="space-y-5">
                    <div className="rounded-[4px] border border-[#d8dde7] bg-white shadow-sm">
                      <div className="flex">
                        <div className="flex w-[58px] flex-col items-center py-5">
                          {flight.journeys?.map((journey, index) => (
                            <div
                              key={journey.journey_index}
                              className="relative flex min-h-[220px] flex-col items-center"
                            >
                              <span className="absolute left-1/2 top-4 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[#5f9ec7]" />
                              {index !== flight.journeys.length - 1 && (
                                <span className="absolute left-1/2 top-6 h-[190px] w-[2px] -translate-x-1/2 bg-[#b9d2e3]" />
                              )}

                              <div className="flex h-full items-center">
                                <span className="rotate-[-90deg] whitespace-nowrap text-[16px] font-bold text-black">
                                  {journey.summary.duration_text}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="flex-1 py-5 pr-4">
                          {flight.journeys?.map((journey, index) => {
                            const firstSegment = journey.segments?.[0];
                            const lastSegment =
                              journey.segments?.[journey.segments.length - 1];

                            return (
                              <div
                                key={journey.journey_index}
                                className={cn(index !== 0 && "pt-4")}
                              >
                                <div className="mb-3 flex items-center justify-center gap-2 text-[15px] text-[#232323]">
                                  <span className="font-bold uppercase text-[#1a2f6b]">
                                    {journey.requested.origin}-
                                    {journey.requested.destination}
                                  </span>
                                  <span className="text-[#a0a6b4]">|</span>
                                  <span>
                                    Date :{" "}
                                    {formatDateLabel(journey.requested.departure_date)}
                                  </span>
                                </div>

                                <Separator className="bg-[#e6e8ed]" />

                                <div className="flex items-center justify-between py-6">
                                  <div className="flex items-center gap-3">
                                    <img
                                      src={firstSegment?.airline.logo}
                                      alt={firstSegment?.airline.name}
                                      className="h-10 w-14 object-contain"
                                    />
                                    <div>
                                      <p className="text-[15px] font-medium text-[#222]">
                                        {firstSegment?.airline.name}
                                      </p>
                                      <p className="text-sm text-[#6c7383]">
                                        {firstSegment?.flight_number}
                                      </p>
                                    </div>
                                  </div>

                                  <p className="text-sm text-[#2d2d2d]">
                                    {flight.fare.refundable ? "Refundable" : "Non Refundable"}
                                  </p>
                                </div>

                                <Separator className="bg-[#e6e8ed]" />

                                <div className="grid grid-cols-[1fr_260px_1fr] items-center gap-3 py-5">
                                  <div>
                                    <p className="text-[17px] font-bold text-[#1b3574]">
                                      {firstSegment?.origin.airport} -{" "}
                                      {formatTime(firstSegment?.departure_at)}
                                    </p>
                                    <p className="mt-1 text-[14px] leading-5 text-[#2f2f2f]">
                                      {formatFullDate(firstSegment?.departure_at)}
                                    </p>
                                    <p className="text-[14px] leading-5 text-[#2f2f2f]">
                                      {firstSegment?.origin.airport_name}
                                    </p>
                                  </div>

                                  <div className="flex flex-col items-center justify-center">
                                    <p className="mb-1 text-[15px] text-[#2b2b2b]">
                                      {journey.summary.duration_text}
                                    </p>

                                    <div className="flex w-full items-center gap-2">
                                      <span className="h-2 w-2 rounded-full bg-[#c49324]" />
                                      <span className="h-[2px] flex-1 bg-[#d6d6d6]" />
                                      <span className="h-2 w-2 rounded-full bg-[#c49324]" />
                                    </div>
                                  </div>

                                  <div className="text-right">
                                    <p className="text-[17px] font-bold text-[#1b3574]">
                                      {lastSegment?.destination.airport} -{" "}
                                      {formatTime(lastSegment?.arrival_at)}
                                    </p>
                                    <p className="mt-1 text-[14px] leading-5 text-[#2f2f2f]">
                                      {formatFullDate(lastSegment?.arrival_at)}
                                    </p>
                                    <p className="text-[14px] leading-5 text-[#2f2f2f]">
                                      {lastSegment?.destination.airport_name}
                                    </p>
                                  </div>
                                </div>

                                {index !== flight.journeys.length - 1 && (
                                  <Separator className="bg-[#e6e8ed]" />
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="rounded-[4px] border border-[#d8dde7] bg-white shadow-sm">
                      <button
                        type="button"
                        onClick={() => setShowDetails((prev) => !prev)}
                        className="flex w-full items-center justify-between px-4 py-3 text-left"
                      >
                        <span className="text-[15px] font-bold text-black">
                          Flight Details
                        </span>
                        {showDetails ? (
                          <ChevronUp className="h-5 w-5 text-[#8b8f98]" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-[#8b8f98]" />
                        )}
                      </button>

                      {showDetails && (
                        <div className="border-t border-[#e7eaf0] px-4 py-4">
                          <div className="space-y-4">
                            {flight.segments.map((segment, index) => (
                              <div
                                key={`${segment.flight_number}-${index}`}
                                className="rounded-md border border-[#e6e8ed] bg-[#fafbfc] p-4"
                              >
                                <div className="mb-2 flex items-center justify-between">
                                  <p className="font-semibold text-[#17306f]">
                                    {segment.origin.airport} → {segment.destination.airport}
                                  </p>
                                  <p className="text-sm text-[#596071]">
                                    {segment.flight_number}
                                  </p>
                                </div>

                                <div className="grid gap-2 text-sm text-[#333] md:grid-cols-2">
                                  <p>
                                    <span className="font-semibold">Airline:</span>{" "}
                                    {segment.airline.name}
                                  </p>
                                  <p>
                                    <span className="font-semibold">Aircraft:</span>{" "}
                                    {segment.aircraft.name}
                                  </p>
                                  <p>
                                    <span className="font-semibold">Departure:</span>{" "}
                                    {formatFullDate(segment.departure_at)} {formatTime(segment.departure_at)}
                                  </p>
                                  <p>
                                    <span className="font-semibold">Arrival:</span>{" "}
                                    {formatFullDate(segment.arrival_at)} {formatTime(segment.arrival_at)}
                                  </p>
                                  <p>
                                    <span className="font-semibold">Cabin:</span>{" "}
                                    {segment.cabin_name}
                                  </p>
                                  <p>
                                    <span className="font-semibold">Seats:</span>{" "}
                                    {segment.seats_available}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right side */}
                  <div className="space-y-5">
                    <div className="rounded-[8px] border border-[#d8dde7] bg-white px-4 py-3 shadow-sm">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-[16px] text-[#222]">
                          <Clock3 className="h-4 w-4 fill-[#b88d22] text-[#b88d22]" />
                          <span>Time Remaining</span>
                        </div>
                        <span className="text-[18px] font-bold text-[#1c346e]">
                          14:25
                        </span>
                      </div>
                    </div>

                    <div className="rounded-[8px] border border-[#d8dde7] bg-white p-6 shadow-sm">
                      <h3 className="text-[22px] font-extrabold text-[#172f6d]">
                        Price Details
                      </h3>

                      <p className="mt-4 text-[16px] text-[#222]">
                        All prices are in{" "}
                        <span className="font-bold text-[#2e9746]">
                          Bangladeshi taka
                        </span>
                      </p>

                      <div className="mt-10">
                        <p className="text-[17px] font-bold text-[#1a2f6b]">
                          Fare Summary
                        </p>

                        <div className="mt-4 space-y-3 text-[16px]">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-[#b8891f]">Base Fare</span>
                            <span className="font-bold text-[#b8891f]">
                              {Number(flight.pricing.base || 0).toLocaleString("en-BD")}
                            </span>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="font-bold text-black">Tax</span>
                            <span className="font-bold text-black">
                              {Number(flight.pricing.tax || 0).toLocaleString("en-BD")}
                            </span>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="font-bold text-black">AIT</span>
                            <span className="font-bold text-black">
                              {Number(aitAmount || 0).toLocaleString("en-BD")}
                            </span>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="font-bold text-black">Total Price</span>
                            <span className="font-bold text-black">
                              {Number(flight.pricing.total || 0).toLocaleString("en-BD")}
                            </span>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="font-bold text-[#f28a14]">Discount</span>
                            <span className="font-bold text-[#f28a14]">
                              {Number(flight.pricing.discount || 0).toLocaleString("en-BD")}
                            </span>
                          </div>
                        </div>

                        <div className="my-5 border-t-2 border-dotted border-[#17306f]" />

                        <div className="flex items-center justify-between gap-3">
                          <span className="text-[18px] font-extrabold text-[#17306f]">
                            Payable Amount
                          </span>

                          <div className="rounded-[4px] border-2 border-[#2457a6] px-4 py-2 text-[20px] font-extrabold text-[#2570c9]">
                            {formatBDT(totalPayable)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-10 flex justify-center">
                  <Button
                    onClick={onContinue}
                    className="h-[40px] min-w-[220px] rounded-[6px] bg-[#17306f] px-8 text-[16px] font-bold text-white hover:bg-[#102558]"
                  >
                    Next - Continue Booking
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FlightBookingDialog;