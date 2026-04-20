import { Plane } from "lucide-react";
import BaggageAllowanceCard from "./BaggageAllowanceCard";

interface Props {
  segmentIndex: number;
  cabin: string;
  bookingClass: string;
  passengersLabel: string;
  handBaggage: string;
  checkInBaggage: string;
}

const AvailabilitySegmentCard = ({
  segmentIndex,
  cabin,
  bookingClass,
  passengersLabel,
  handBaggage,
  checkInBaggage,
}: Props) => {
  return (
    <div className="overflow-hidden rounded-xl border bg-background">
      <div className="flex items-center justify-between border-b bg-muted/20 px-4 py-3">
        <h4 className="text-sm font-semibold text-foreground md:text-base">
          Segment-{segmentIndex}
        </h4>

        <div className="rounded-md bg-primary/10 p-2 text-primary">
          <Plane className="h-4 w-4" />
        </div>
      </div>

      <div className="space-y-3 px-4 py-4 text-sm">
        <p className="text-muted-foreground">{passengersLabel}</p>

        <p className="text-muted-foreground">
          Cabin:{" "}
          <span className="font-semibold text-foreground">
            {cabin} ({bookingClass})
          </span>
        </p>

        <BaggageAllowanceCard
          handBaggage={handBaggage}
          checkInBaggage={checkInBaggage}
        />
      </div>
    </div>
  );
};

export default AvailabilitySegmentCard;