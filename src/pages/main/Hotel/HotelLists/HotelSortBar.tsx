const HotelSortBar = () => {
  const items = ["Cheapest", "Highest Rating", "Nearest", "Refundable"];

  return (
    <div className="overflow-x-auto rounded-[22px] border border-slate-200 bg-white p-3 shadow-sm">
      <div className="flex min-w-max gap-3">
        {items.map((item, index) => (
          <button
            key={item}
            className={`h-11 min-w-40 rounded-xl px-5 text-sm font-semibold transition ${
              index === 0
                ? "bg-[#13275f] text-white shadow"
                : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HotelSortBar;