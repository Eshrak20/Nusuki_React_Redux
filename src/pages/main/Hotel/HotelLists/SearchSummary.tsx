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
    <div className="rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
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
          value={`${nights} Nights`}
        />

        <SummaryItem
          icon={<Users size={17} />}
          label="Guests"
          value={`${totalGuests} Travelers`}
        />

        <SummaryItem
          icon={<MapPin size={17} />}
          label="Location"
          value={`${data.search.radius} ${data.search.uom} radius`}
        />
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
    <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3">
      <div className="grid size-9 place-items-center rounded-full bg-[#e9eefb] text-[#13275f]">
        {icon}
      </div>

      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">
          {label}
        </p>
        <h4 className="text-sm font-bold text-slate-950">{value}</h4>
      </div>
    </div>
  );
};

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
};