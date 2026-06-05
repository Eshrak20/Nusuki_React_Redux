import { Plane, Users, Clock3 } from "lucide-react";
import BaggageAllowanceCard from "./BaggageAllowanceCard";

interface Props {
  segmentIndex: number;
  cabin: string;
  bookingClass: string;
  passengersLabel: string;
  handBaggage: string;
  checkInBaggage: string;
  seatsAvailable?: number;
  airlineName: string;
  airlineCode: string;
  flightNumber: string;
  fromCode: string;
  toCode: string;
  departureAt?: string;
  arrivalAt?: string;
  aircraftName: string;
  aircraftCode: string;
  elapsedTime: string;
}

const formatDateTime = (date?: string) => {
  if (!date) return "N/A";

  try {
    return new Date(date).toLocaleString("en-BD", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return date;
  }
};

const AvailabilitySegmentCard = ({
  segmentIndex,
  cabin,
  bookingClass,
  passengersLabel,
  handBaggage,
  checkInBaggage,
  seatsAvailable,
  airlineName,
  airlineCode,
  flightNumber,
  fromCode,
  toCode,
  departureAt,
  arrivalAt,
  aircraftName,
  aircraftCode,
  elapsedTime,
}: Props) => {
  return (
    <div className="overflow-hidden rounded-sm border bg-background">
      <div className="flex items-center justify-between border-b bg-muted/20 px-4 py-3">
        <div>
          <h4 className="text-sm font-semibold text-foreground md:text-base">
            Segment-{segmentIndex}
          </h4>
          <p className="text-xs text-muted-foreground">
            {fromCode} → {toCode}
          </p>
        </div>

        <div className="rounded-sm bg-primary/10 p-2 text-primary">
          <Plane className="h-4 w-4" />
        </div>
      </div>

      <div className="space-y-4 px-4 py-4 text-sm">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-sm border p-3">
            <p className="text-xs text-muted-foreground">Airline</p>
            <p className="font-semibold text-foreground">
              {airlineName} ({airlineCode})
            </p>
            <p className="text-xs text-muted-foreground">{flightNumber}</p>
          </div>

          <div className="rounded-sm border p-3">
            <p className="text-xs text-muted-foreground">Cabin & Booking</p>
            <p className="font-semibold text-foreground">
              {cabin} ({bookingClass})
            </p>
            <p className="text-xs text-muted-foreground">{passengersLabel}</p>
          </div>

          <div className="rounded-sm border p-3">
            <p className="text-xs text-muted-foreground">Seats Available</p>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <p className="font-semibold text-foreground">
                {typeof seatsAvailable === "number"
                  ? `${seatsAvailable} seat${seatsAvailable > 1 ? "s" : ""}`
                  : "Not available"}
              </p>
            </div>
          </div>

          <div className="rounded-sm border p-3">
            <p className="text-xs text-muted-foreground">Departure</p>
            <p className="font-semibold text-foreground">{fromCode}</p>
            <p className="text-xs text-muted-foreground">
              {formatDateTime(departureAt)}
            </p>
          </div>

          <div className="rounded-sm border p-3">
            <p className="text-xs text-muted-foreground">Arrival</p>
            <p className="font-semibold text-foreground">{toCode}</p>
            <p className="text-xs text-muted-foreground">
              {formatDateTime(arrivalAt)}
            </p>
          </div>

          <div className="rounded-sm border p-3">
            <p className="text-xs text-muted-foreground">Aircraft & Duration</p>
            <p className="font-semibold text-foreground">
              {aircraftName} ({aircraftCode})
            </p>
            <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
              <Clock3 className="h-3.5 w-3.5" />
              <span>{elapsedTime}</span>
            </div>
          </div>
        </div>

        <BaggageAllowanceCard
          handBaggage={handBaggage}
          checkInBaggage={checkInBaggage}
        />
      </div>
    </div>
  );
};

export default AvailabilitySegmentCard;