import {
  Plane,
  Building2,
  Store,
  Palmtree,
  BadgeCheck,
  HeartPulse,
  Car,
  Smartphone,
  ReceiptText,
} from "lucide-react";

const tabs = [
  { name: "Flight", icon: Plane },
  { name: "Hotel", icon: Building2 },
  { name: "Shop", icon: Store },
  { name: "Holiday", icon: Palmtree },
  { name: "Visa", icon: BadgeCheck },
  { name: "Medical", icon: HeartPulse },
  { name: "Cars", icon: Car },
  { name: "eSIM", icon: Smartphone },
  { name: "Pay Bill", icon: ReceiptText },
];

const HotelSearchTabs = () => {
  return (
    <div className="flex overflow-x-auto border-b border-slate-200 px-5 md:px-8">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = tab.name === "Hotel";

        return (
          <button
            key={tab.name}
            type="button"
            className={`relative flex min-w-fit items-center gap-2 px-5 py-5 text-sm font-semibold transition ${
              isActive
                ? "text-slate-900"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            <Icon className="h-5 w-5" />
            {tab.name}

            {isActive && (
              <span className="absolute bottom-0 left-0 h-[2px] w-full bg-orange-500" />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default HotelSearchTabs;