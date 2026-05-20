import type { HotelSearchData } from "@/types/hotel/types.hotelList";
import { BedDouble, CalendarDays, MapPin, Users } from "lucide-react";

type Props = {
  data: HotelSearchData;
  nights: number;
};

const SearchSummary = ({ data, nights }: Props) => {
  const totalGuests = data.search.rooms.reduce(
    (sum, room) => sum + room.adults + room.children,
    0,
  );

  return (
    <div className="rounded-[22px] border border-slate-200 dark:border-slate-800 bg-background p-4 shadow-sm md:p-5">
      {/* Responsive layout grid:
        - 1 column on default mobile
        - 2 columns on small screens (sm:)
        - 3 columns on medium screens (md:)
        - 5 columns on large screens (lg:)
      */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        <SummaryItem
          icon={<CalendarDays size={17} />}
          label="Check In"
          value={formatDate(data.search.check_in)}
        />

        <SummaryItem
          icon={<CalendarDays size={17} />}
          label="Check Out"
          value={formatDate(data.search.check_out)}
        />

        <SummaryItem
          icon={<BedDouble size={17} />}
          label="Stay"
          value={`${nights} ${nights > 1 ? "Nights" : "Night"}`}
        />

        <SummaryItem
          icon={<Users size={17} />}
          label="Guests"
          value={`${totalGuests} ${totalGuests > 1 ? "Travelers" : "Traveler"}`}
        />

        {/* The last element spans 2 columns on medium viewports to keep the layout grid balanced */}
        <div className="sm:col-span-2 md:col-span-1">
          <SummaryItem
            icon={<MapPin size={17} />}
            label="Location"
            value={`${data.search.radius} ${data.search.uom} radius`}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchSummary;

const SummaryItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-muted/40 dark:bg-muted/20 px-4 py-3 h-full">
      {/* Icon Wrapper utilizing semantic Shadcn primary theme colors */}
      <div className="grid size-9 shrink-0 place-items-center rounded-full bg-primary/10 dark:bg-primary/20 text-primary">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
          {label}
        </p>
        <h4 className="truncate text-sm font-bold text-foreground" title={value}>
          {value}
        </h4>
      </div>
    </div>
  );
};

const formatDate = (date: string) => {
  if (!date) return "";
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
};