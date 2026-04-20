import { BaggageClaim, BriefcaseBusiness, UserRound } from "lucide-react";
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
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
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
        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-xl border bg-background p-3">
            <div className="mb-1 flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <BriefcaseBusiness className="h-4 w-4 text-primary" />
              Cabin
            </div>
            <p className="font-semibold text-foreground">
              {flight?.segments?.[0]?.cabin_name || "Not Found"}
            </p>
          </div>

          <div className="rounded-xl border bg-background p-3">
            <div className="mb-1 flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <UserRound className="h-4 w-4 text-primary" />
              Passenger
            </div>
            <p className="font-semibold text-foreground">1 ADT Passenger</p>
          </div>

          <div className="rounded-xl border bg-background p-3">
            <div className="mb-1 flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <BaggageClaim className="h-4 w-4 text-primary" />
              Booking Class
            </div>
            <p className="font-semibold text-foreground">
              {flight?.segments?.[0]?.booking_code || "K"}
            </p>
          </div>
        </div>

        <AvailabilitySegmentCard
          segmentIndex={1}
          cabin={flight?.segments?.[0]?.cabin_name || "Not Found"}
          bookingClass={flight?.segments?.[0]?.booking_code || "K"}
          passengersLabel={`1 ADT Passenger`}
          handBaggage={baggage.hand?.label || "7 KG"}
          checkInBaggage={baggage.checked?.label || "Approximately 20 KG"}
        />
      </div>
    </div>
  );
};

export default AvailabilityTab;