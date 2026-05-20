import type { HotelSearchData } from "@/types/hotel/types.hotelList";

type Props = {
  data: HotelSearchData;
  totalFilteredHotels: number;
};

const HotelResultHeader = ({ data, totalFilteredHotels }: Props) => {
  return (
    <div className="rounded-[22px] border border-slate-200 dark:border-slate-800 bg-background p-4 shadow-sm md:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        
        {/* Left Side: Dynamic Hotel Counts */}
        <div>
          <h2 className="text-xl font-extrabold text-foreground">
            {totalFilteredHotels} {totalFilteredHotels === 1 ? "Available Hotel" : "Available Hotels"}
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Total hotels in region:{" "}
            <span className="font-semibold text-foreground">
              {data.total_hotels_in_region}
            </span>
          </p>
        </div>

        {/* Right Side: Date Range Badge using system muted styles */}
        <div className="w-fit rounded-full border border-slate-200 dark:border-slate-800 bg-muted/40 dark:bg-muted/20 px-4 py-2 text-sm font-semibold text-muted-foreground sm:text-right">
          <span className="text-foreground">
            {formatDate(data.search.check_in)}
          </span>
          {" — "}
          <span className="text-foreground">
            {formatDate(data.search.check_out)}
          </span>
        </div>

      </div>
    </div>
  );
};

export default HotelResultHeader;

const formatDate = (date: string) => {
  if (!date) return "";
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
};