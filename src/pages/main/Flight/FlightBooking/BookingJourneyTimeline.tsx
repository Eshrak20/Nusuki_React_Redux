import { Separator } from "@/components/ui/separator";

import {
  formatDateLabel,
  formatFullDate,
  formatTime,
} from "./flightBooking.helpers";
import type { FlightDetailResultItem, FlightJourneyItem } from "@/types/flight/flightTicket.types";

interface Props {
  flight: FlightDetailResultItem;
}

const BookingJourneyTimeline = ({ flight }: Props) => {
  return (
    <div className="rounded-lg border border-[#d8dde7] bg-white shadow-sm dark:border-white/10 dark:bg-[#101827]">
      <div className="flex">
        <div className="lg:flex w-14.5 flex-col items-center hidden py-5">
          {flight.journeys.map((journey: FlightJourneyItem, index: number) => (
            <div
              key={journey.journey_index}
              className="relative flex min-h-55 flex-col items-center"
            >
              <span className="absolute left-1/2 top-4 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[#5f9ec7]" />

              {index !== flight.journeys.length - 1 && (
                <span className="absolute left-1/2 top-6 h-47.5 w-0.5 -translate-x-1/2 bg-[#b9d2e3] dark:bg-[#355070]" />
              )}

              <div className="flex h-full items-center">
                <span className="-rotate-90 whitespace-nowrap text-[16px] font-bold text-black dark:text-white">
                  {journey.summary.duration_text}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex-1 py-5 pr-4">
          {flight.journeys.map((journey: FlightJourneyItem, index: number) => {
            const firstSegment = journey.segments[0];
            const lastSegment = journey.segments[journey.segments.length - 1];

            return (
              <div key={journey.journey_index} className={index !== 0 ? "pt-4" : ""}>
                <div className="mb-3 flex items-center justify-center gap-2 text-[15px] text-[#232323] dark:text-white/90">
                  <span className="font-bold uppercase text-[#1a2f6b] dark:text-[#8fb4ff]">
                    {journey.requested.origin}-{journey.requested.destination}
                  </span>
                  <span className="text-[#a0a6b4]">|</span>
                  <span>
                    Date : {formatDateLabel(journey.requested.departure_date)}
                  </span>
                </div>

                <Separator className="bg-[#e6e8ed] dark:bg-white/10" />

                <div className="flex items-center justify-between py-6">
                  <div className="flex items-center gap-3">
                    <img
                      src={firstSegment?.airline.logo}
                      alt={firstSegment?.airline.name}
                      className="h-10 w-14 object-contain"
                    />

                    <div>
                      <p className="text-[15px] font-medium text-[#222] dark:text-white">
                        {firstSegment?.airline.name}
                      </p>
                      <p className="text-sm text-[#6c7383] dark:text-white/60">
                        {firstSegment?.flight_number}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-[#2d2d2d] dark:text-white/80">
                    {flight.fare.refundable ? "Refundable" : "Non Refundable"}
                  </p>
                </div>

                <Separator className="bg-[#e6e8ed] dark:bg-white/10" />

                <div className="grid grid-cols-[1fr_220px_1fr] items-center gap-3 py-5 xl:grid-cols-[1fr_260px_1fr]">
                  <div>
                    <p className="text-[17px] font-bold text-[#1b3574] dark:text-[#8fb4ff]">
                      {firstSegment?.origin.airport} - {formatTime(firstSegment?.departure_at)}
                    </p>
                    <p className="mt-1 text-[14px] leading-5 text-[#2f2f2f] dark:text-white/80">
                      {formatFullDate(firstSegment?.departure_at)}
                    </p>
                    <p className="text-[14px] leading-5 text-[#2f2f2f] dark:text-white/80">
                      {firstSegment?.origin.airport_name}
                    </p>
                  </div>

                  <div className="flex flex-col items-center justify-center">
                    <p className="mb-1 text-[15px] text-[#2b2b2b] dark:text-white/85">
                      {journey.summary.duration_text}
                    </p>

                    <div className="flex w-full items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[#c49324]" />
                      <span className="h-0.5 flex-1 bg-[#d6d6d6] dark:bg-white/20" />
                      <span className="h-2 w-2 rounded-full bg-[#c49324]" />
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-[17px] font-bold text-[#1b3574] dark:text-[#8fb4ff]">
                      {lastSegment?.destination.airport} - {formatTime(lastSegment?.arrival_at)}
                    </p>
                    <p className="mt-1 text-[14px] leading-5 text-[#2f2f2f] dark:text-white/80">
                      {formatFullDate(lastSegment?.arrival_at)}
                    </p>
                    <p className="text-[14px] leading-5 text-[#2f2f2f] dark:text-white/80">
                      {lastSegment?.destination.airport_name}
                    </p>
                  </div>
                </div>

                {index !== flight.journeys.length - 1 && (
                  <Separator className="bg-[#e6e8ed] dark:bg-white/10" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BookingJourneyTimeline;