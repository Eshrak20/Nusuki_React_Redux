import { PhoneCall } from "lucide-react";
import HolidayOfferCard from "./holidayOfferCard/HolidayOfferCard";
import HolidayCustomTourDialog from "../HolidayPackageLists/HolidayCustomTourDialog";

interface Offer {
  id: number;
  name: string;
  valid_from?: string | null;
  valid_until?: string | null;
  departs?: string | null;
  price_per_person_single?: string | null;
  price_per_person_double?: string | null;
  price_per_person_twin?: string | null;
  price_per_person_triple?: string | null;
  price_per_person_child_3_to_6?: string | null;
  price_per_person_child_7_to_12?: string | null;
  description?: string | null;
}

interface Props {
  offers: Offer[];
}

const HolidayOfferSidebar = ({ offers }: Props) => {
  return (
    <aside className="space-y-5 lg:sticky lg:top-28">
      <div className="border bg-primary/10 p-6 shadow-sm">
        <h3 className="text-xl font-bold text-foreground">
          Plan Holiday, Your Way!
        </h3>

        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Plan your perfect getaway by customising the itinerary exactly to your
          preferences. Let us know your thoughts and we will suggest the best
          vacation.
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-4">
          <HolidayCustomTourDialog />

          <div className="flex items-center gap-2 font-bold text-primary">
            <PhoneCall className="h-4 w-4" />
            13701
          </div>
        </div>
      </div>

      {offers.map((offer) => (
        <HolidayOfferCard key={offer.id} offer={offer} />
      ))}
    </aside>
  );
};

export default HolidayOfferSidebar;