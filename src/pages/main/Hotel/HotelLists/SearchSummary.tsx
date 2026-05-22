import type { HotelSearchData } from "@/types/hotel/types.hotelList";
import { BedDouble, CalendarDays, MapPin, Settings2, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

type Props = {
  data: HotelSearchData;
  nights: number;
};

const SearchSummary = ({ data, nights }: Props) => {
  const navigate = useNavigate();

  const totalGuests = data.search.rooms.reduce(
    (sum, room) => sum + room.adults + room.children,
    0,
  );

  const handleModifySearch = () => {
    navigate(-1);
  };

  return (
    <div className="rounded-[22px] border border-slate-200 bg-background p-4 shadow-sm dark:border-slate-800 md:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
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
            value={`${totalGuests} ${totalGuests > 1 ? "Travelers" : "Traveler"
              }`}
          />

          <div className="sm:col-span-2 md:col-span-1">
            <SummaryItem
              icon={<MapPin size={17} />}
              label="Location"
              value={`${data.search.radius} ${data.search.uom} radius`}
            />
          </div>
        </div>

        <Button
          type="button"
          variant="secondary"
          onClick={handleModifySearch}
          className="h-11 cursor-pointer hover:bg-primary hover:text-primary-foreground w-full shrink-0 rounded-xl px-4 text-sm font-semibold sm:w-auto lg:h-12"
        >
          <Settings2 className="mr-2 h-4 w-4" />
          Modify Search
        </Button>
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
    <div className="flex h-full items-center gap-3 rounded-2xl bg-muted/40 px-4 py-3 dark:bg-muted/20">
      <div className="grid size-9 shrink-0 place-items-center rounded-full bg-primary/10 text-primary dark:bg-primary/20">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
          {label}
        </p>

        <h4
          className="truncate text-sm font-bold text-foreground"
          title={value}
        >
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