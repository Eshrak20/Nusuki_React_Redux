import type { TourPackageItem } from "@/types/holiday/types.tourPackageLists";
import HolidayPackageCard from "./HolidayPackageCard";
import HolidayPackageEmpty from "./HolidayPackageEmpty";

interface HolidayPackageGridProps {
  tours: TourPackageItem[];
}

const HolidayPackageGrid = ({ tours }: HolidayPackageGridProps) => {
  if (!tours.length) return <HolidayPackageEmpty />;

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {tours.map((tour) => (
        <HolidayPackageCard key={tour.id} tour={tour} />
      ))}
    </div>
  );
};

export default HolidayPackageGrid;