type Props = {
  value: string;
  onChange: (value: string) => void;
};

const sortItems = [
  { label: "Cheapest", value: "cheapest" },
  { label: "Highest Rating", value: "highest-rating" },
  { label: "Nearest", value: "nearest" },
  { label: "Refundable", value: "refundable" },
];

const HotelSortBar = ({ value, onChange }: Props) => {
  return (
    <div className="overflow-x-auto rounded-[22px] border border-slate-200 bg-white p-3 shadow-sm">
      <div className="flex min-w-max gap-3">
        {sortItems.map((item) => {
          const active = value === item.value;

          return (
            <button
              key={item.value}
              type="button"
              onClick={() => onChange(item.value)}
              className={`h-11 min-w-40 rounded-xl px-5 text-sm font-semibold transition ${
                active
                  ? "bg-[#13275f] text-white shadow"
                  : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default HotelSortBar;