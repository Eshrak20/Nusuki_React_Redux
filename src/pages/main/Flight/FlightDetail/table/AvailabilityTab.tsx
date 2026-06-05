import type { FlightResultItem } from "@/types/flight/flightResults.types";
import AvailabilitySegmentCard from "./AvailabilitySegmentCard";
import { getBaggage } from "@/lib/utils";

interface Props {
  flight: FlightResultItem;
}

const AvailabilityTab = ({ flight }: Props) => {
  const segments = flight?.segments ?? [];
  const firstSegment = segments[0];
  const lastSegment = segments[segments.length - 1];

  const originCode =
    firstSegment?.origin?.airport || firstSegment?.origin?.city || "N/A";

  const destinationCode =
    lastSegment?.destination?.airport ||
    lastSegment?.destination?.city ||
    "N/A";


  const baggage = getBaggage(flight);

  return (
    <div className="overflow-hidden rounded-sm border border-border bg-card shadow-sm">
      <div className="flex items-center gap-3 border-b bg-muted/30 px-4 py-3">
        <h3 className="text-sm font-semibold text-foreground md:text-base">
          {originCode}
        </h3>

        <span className="text-muted-foreground">→</span>

        <h3 className="text-sm font-semibold text-foreground md:text-base">
          {destinationCode}
        </h3>
      </div>

      <div className="space-y-4 p-4">
        <div className="space-y-4">
          {segments.length > 0 ? (
            segments.map((segment, index) => (
              <AvailabilitySegmentCard
                key={`${segment.flight_number}-${segment.departure_at}-${index}`}
                segmentIndex={index + 1}
                cabin={segment?.cabin_name || "Not Found"}
                bookingClass={segment?.booking_code || "K"}
                passengersLabel="1 ADT Passenger"
                handBaggage={baggage.hand?.label || "7 KG"}
                checkInBaggage={baggage.checked?.label || "Approximately 20 KG"}
                seatsAvailable={segment?.seats_available}
                airlineName={segment?.airline?.name || "Unknown Airline"}
                airlineCode={segment?.airline?.code || "N/A"}
                flightNumber={segment?.flight_number || "N/A"}
                fromCode={
                  segment?.origin?.airport || segment?.origin?.city || "N/A"
                }
                toCode={
                  segment?.destination?.airport ||
                  segment?.destination?.city ||
                  "N/A"
                }
                departureAt={segment?.departure_at}
                arrivalAt={segment?.arrival_at}
                aircraftName={segment?.aircraft?.name || "N/A"}
                aircraftCode={segment?.aircraft?.code || "N/A"}
                elapsedTime={segment?.elapsed_time_text || "N/A"}
              />
            ))
          ) : (
            <div className="rounded-sm border border-dashed p-4 text-sm text-muted-foreground">
              No segment information found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AvailabilityTab;
