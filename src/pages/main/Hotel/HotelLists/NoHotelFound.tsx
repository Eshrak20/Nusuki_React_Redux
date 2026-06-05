import { SearchX } from "lucide-react";

type Props = {
  messages?: {
    code: string;
    text: string;
  }[];
};

const NoHotelFound = ({ messages }: Props) => {
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

      {messages && messages.length > 0 && (
        <div className="mx-auto mt-5 max-w-lg space-y-2">
          {messages.map((item) => (
            <div
              key={item.code}
              className="rounded-sm bg-slate-50 px-4 py-3 text-left text-xs text-slate-500"
            >
              <span className="font-bold text-slate-700">{item.code}: </span>
              {item.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NoHotelFound;