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
    <div className="overflow-x-auto rounded-[22px] border border-border bg-background p-3 shadow-sm custom-scrollbar">
      <div className="flex min-w-max gap-3">
        {sortItems.map((item) => {
          const active = value === item.value;

          return (
            <button
              key={item.value}
              type="button"
              onClick={() => onChange(item.value)}
              className={`h-11 min-w-40 rounded-xl px-5 text-sm font-semibold transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                active
                  ? "bg-primary text-primary-foreground shadow-sm hover:opacity-90"
                  : "border border-input bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
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