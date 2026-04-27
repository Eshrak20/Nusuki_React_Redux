import {
  BriefcaseBusiness,
  Luggage,
  ShieldCheck,
  ShieldX,
  Users,
} from "lucide-react";
import type { FlightResultItem } from "@/types/flight/flightResults.types";

interface Props {
  flight: FlightResultItem;
}

const badgeClass =
  "inline-flex items-center gap-2 rounded-md lg:rounded-full border border-border bg-background px-2.5 lg:px-3 py-2 text-[11px] lg:text-sm font-medium text-muted-foreground shadow-sm transition-colors hover:bg-muted/50";

const FlightMetaBadges = ({ flight }: Props) => {

  return (
    <div className="flex lg:flex-wrap gap-2 lg:gap-3">
      <span className={badgeClass}>
        <BriefcaseBusiness className="h-4 w-4 text-primary" />
        {flight.fare.cabin_name}
      </span>

      <span className={badgeClass}>
        {flight.fare.refundable ? (
          <ShieldCheck className="h-4 w-4 text-green-500" />
        ) : (
          <ShieldX className="h-4 w-4 text-amber-500" />
        )}
        <span className="hidden lg:inline">{flight.fare.refundable ? "Refundable" : "Non-Refundable"}</span>
        <span className="inline lg:hidden">{flight.fare.refundable ? "Refund" : "Non-Refund"}</span>
      </span>

      <span className={badgeClass}>
        <Luggage className="h-4 w-4 text-primary" />
        <span className="hidden lg:inline -mr-1">Baggage -</span>
        {flight.baggage.weight} KG
      </span>

      <span className={badgeClass}>
        <Users className="h-4 w-4 text-primary" />
        <span className="hidden lg:inline -mr-1">Available Seat -</span>
        {flight.fare.seats_available}
      </span>
    </div>
  );
};

export default FlightMetaBadges;