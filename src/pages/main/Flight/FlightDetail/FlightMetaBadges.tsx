import { BriefcaseBusiness, Luggage, ShieldCheck, Users } from "lucide-react";
import type { FlightResultItem } from "@/types/flight/flightResults.types";

interface Props {
  flight: FlightResultItem;
}

const badgeClass = "inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-sm font-medium text-slate-600 border";

const FlightMetaBadges = ({ flight }: Props) => {
  return (
    <div className="flex flex-wrap gap-3">
      <span className={badgeClass}>
        <BriefcaseBusiness className="h-4 w-4" />
        {flight.fare.cabin_name}
      </span>
      <span className={badgeClass}>
        <ShieldCheck className="h-4 w-4 text-green-500" />
        {flight.fare.refundable ? "Refundable" : "Non-Refundable"}
      </span>
      <span className={badgeClass}>
        <Luggage className="h-4 w-4" />
        {flight.baggage.label}
      </span>
      <span className={badgeClass}>
        <Users className="h-4 w-4" />
        Available Seat {flight.fare.seats_available}
      </span>
    </div>
  );
};

export default FlightMetaBadges;