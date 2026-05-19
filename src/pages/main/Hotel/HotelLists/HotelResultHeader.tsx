import type { HotelSearchData } from "@/types/hotel/types.hotelList";

type Props = {
  data: HotelSearchData;
};

const HotelResultHeader = ({ data }: Props) => {
  return (
    <div className="rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-slate-950">
            {data.total_available_hotels_with_filter} Available Hotels
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Total hotels in region:{" "}
            <span className="font-semibold text-slate-800">
              {data.total_hotels_in_region}
            </span>
          </p>
        </div>

        <div className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700">
          {formatDate(data.search.check_in)} - {formatDate(data.search.check_out)}
        </div>
      </div>
    </div>
  );
};

export default HotelResultHeader;

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
};