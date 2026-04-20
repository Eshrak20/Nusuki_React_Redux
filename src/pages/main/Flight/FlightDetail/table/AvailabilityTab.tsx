import type { FlightResultItem } from "@/types/flight/flightResults.types";
import AvailabilitySegmentCard from "./AvailabilitySegmentCard";
import { getBaggage } from "@/lib/utils";

interface Props {
  flight: FlightResultItem;
}

const AvailabilityTab = ({ flight }: Props) => {
  const firstSegment = flight?.segments?.[0];
  const originCode =
    firstSegment?.origin?.airport || firstSegment?.origin?.city || "N/A";
  const destinationCode =
    firstSegment?.destination?.airport ||
    firstSegment?.destination?.city ||
    "N/A";

  const baggage = getBaggage(flight);

  return (
    <div className="rounded-xl border bg-card">
      <div className="flex items-center gap-3 border-b bg-muted/30 px-4 py-3">
        <h3 className="text-sm font-semibold text-foreground md:text-base">
          {originCode}
        </h3>

        <span className="text-muted-foreground">{">"}</span>

        <h3 className="text-sm font-semibold text-foreground md:text-base">
          {destinationCode}
        </h3>
      </div>

      <div className="p-4">
        <AvailabilitySegmentCard
          segmentIndex={1}
          cabin={flight?.segments?.[0]?.cabin_name || "Economy"}
          bookingClass={flight?.segments?.[0]?.booking_code || "K"}
          passengersLabel={`1 ADT Passenger`}
          handBaggage={baggage.hand?.label || "7 KG"}
          checkInBaggage={baggage.checked?.label || "30 KG"}
        />
      </div>
    </div>
  );
};

export default AvailabilityTab;
