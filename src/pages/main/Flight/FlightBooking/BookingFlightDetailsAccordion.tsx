import { ChevronDown, ChevronUp } from "lucide-react";
import { formatFullDate, formatTime } from "./flightBooking.helpers";
import type { FlightDetailResultItem } from "@/types/flight/flightTicket.types";

interface Props {
  open: boolean;
  onToggle: () => void;
  flight: FlightDetailResultItem;
}

const BookingFlightDetailsAccordion = ({ open, onToggle, flight }: Props) => {
  return (
    <div className="rounded-sm border border-[#d8dde7] bg-white shadow-sm dark:border-white/10 dark:bg-[#101827]">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between px-4 py-3 text-left"
      >
        <span className="text-[15px] font-bold text-black dark:text-white">
          Flight Details
        </span>

        {open ? (
          <ChevronUp className="h-5 w-5 text-[#8b8f98]" />
        ) : (
          <ChevronDown className="h-5 w-5 text-[#8b8f98]" />
        )}
      </button>

      {open && (
        <div className="border-t px-4 py-4 max-h-80 overflow-y-auto scrollbar-thin">
          <div className="space-y-4">
            {flight.segments.map((segment, index) => (
              <div
                key={`${segment.flight_number}-${index}`}
                className="rounded-sm border border-[#e6e8ed] bg-[#fafbfc] p-4 dark:border-white/10 dark:bg-[#0f1724]"
              >
                <div className="mb-2 flex items-center justify-between">
                  <p className="font-semibold text-[#17306f] dark:text-[#8fb4ff]">
                    {segment.origin.airport} → {segment.destination.airport}
                  </p>
                  <p className="text-sm text-[#596071] dark:text-white/60">
                    {segment.flight_number}
                  </p>
                </div>

                <div className="grid gap-2 text-sm text-[#333] dark:text-white/80 md:grid-cols-2">
                  <p>
                    <span className="font-semibold mr-1">Airline : </span>{" "}
                    {segment.airline.name}
                  </p>
                  <p>
                    <span className="font-semibold mr-1">Aircraft : </span>{""}
                    {segment.aircraft.name}
                  </p>
                  <p>
                    <span className="font-semibold mr-1">Departure : </span>{" "}
                    {formatFullDate(segment.departure_at)}{" "}
                    {formatTime(segment.departure_at)}
                  </p>
                  <p>
                    <span className="font-semibold mr-1">Arrival : </span>{" "}
                    {formatFullDate(segment.arrival_at)}{" "}
                    {formatTime(segment.arrival_at)}
                  </p>
                  <p>
                    <span className="font-semibold mr-1">Cabin : </span>{" "}
                    {segment.cabin_name}
                  </p>
                  <p>
                    <span className="font-semibold mr-1">Seats : </span>{" "}
                    {segment.seats_available}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingFlightDetailsAccordion;
