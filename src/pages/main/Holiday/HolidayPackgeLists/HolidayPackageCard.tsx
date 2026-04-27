import type { TourPackageItem } from "@/types/holiday/types.tourPackgeLists";
import { CalendarDays, MapPin, Plane, CircleDollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HolidayPackageCardProps {
  tour: TourPackageItem;
}

const HolidayPackageCard = ({ tour }: HolidayPackageCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/holiday/package/${tour.id}`);
  };

  return (
    <button
      onClick={handleClick}
      className="group relative h-[360px] w-full overflow-hidden rounded-md border bg-card text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <img
        src={tour.image}
        alt={tour.name}
        className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/20" />

      <div className="absolute left-4 right-4 top-4 flex items-center justify-between text-white">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <CalendarDays size={18} />
          <span>{tour.duration_days} Day</span>
        </div>

        <div className="flex items-center gap-3 text-sm font-semibold">
          <span className="flex items-center gap-1">
            <CircleDollarSign size={17} />
            {tour.price ? tour.price.toLocaleString() : "Ask"}
          </span>

          <span className="flex items-center gap-1">
            <Plane size={17} />
            50
          </span>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <p className="text-xs text-white/80">Price starts from per person</p>

        <h3 className="mt-1 text-xl font-bold">
          {tour.price ? `BDT ${tour.price.toLocaleString()}` : "Contact for Price"}
        </h3>

        <h2 className="mt-1 line-clamp-2 text-base font-semibold leading-snug">
          {tour.name}
        </h2>

        <p className="mt-2 flex items-start gap-1 text-xs text-white/85">
          <MapPin size={14} className="mt-[1px] shrink-0" />
          <span className="line-clamp-1">{tour.address}</span>
        </p>
      </div>
    </button>
  );
};

export default HolidayPackageCard;