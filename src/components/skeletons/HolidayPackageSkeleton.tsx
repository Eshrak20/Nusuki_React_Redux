// HolidayPackageSkeleton.tsx

import { Skeleton } from "@/components/ui/skeleton";

const HolidayPackageSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <Skeleton key={index} className="h-[360px] rounded-md" />
      ))}
    </div>
  );
};

export default HolidayPackageSkeleton;