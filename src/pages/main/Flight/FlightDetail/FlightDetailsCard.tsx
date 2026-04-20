import { useState } from "react";
import type { FlightResultItem } from "@/types/flight/flightResults.types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FlightJourneySummary from "./FlightJourneySummary";
import FlightPriceInfo from "./FlightPriceInfo";
import FlightMetaBadges from "./FlightMetaBadges";
import FlightTabsDetails from "./table/FlightTabsDetails";

interface Props {
  flight: FlightResultItem;
}

const FlightDetailsCard = ({ flight }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <Card className="overflow-hidden rounded-3xl border-0 bg-white shadow-none">
      <CardContent className="p-0">
        <div className="grid grid-cols-1 gap-6 p-6 xl:grid-cols-[minmax(0,1fr)_260px]">
          <FlightJourneySummary flight={flight} />
          <FlightPriceInfo pricing={flight.pricing} />
        </div>

        <div className="border-t bg-slate-50/60 px-6 py-3">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <FlightMetaBadges flight={flight} />
            <Button
              variant="ghost"
              className="justify-start px-0 text-sm font-semibold text-slate-600 hover:bg-transparent"
              onClick={() => setOpen((prev) => !prev)}
            >
              {open ? "Hide Flight Details" : "View Flight Details"}
            </Button>
          </div>
        </div>

        {open && <FlightTabsDetails flight={flight} />}
      </CardContent>
    </Card>
  );
};

export default FlightDetailsCard;