import { SearchX } from "lucide-react";

const NoHotelFound = () => {
  return (
    <div className="rounded-[26px] border border-dashed border-slate-300 bg-white px-5 py-12 text-center shadow-sm">
      <div className="mx-auto grid size-16 place-items-center rounded-full bg-[#e9eefb] text-[#13275f]">
        <SearchX size={30} />
      </div>

      <h3 className="mt-5 text-xl font-extrabold text-slate-950">
        No hotels available
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
        No availability found for this date, room, or location. Try changing the
        check-in date, radius, room info, or country/currency.
      </p>
    </div>
  );
};

export default NoHotelFound;