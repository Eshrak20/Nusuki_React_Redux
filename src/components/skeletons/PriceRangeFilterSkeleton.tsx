import { Skeleton } from "@/components/ui/skeleton";

const PriceRangeFilterSkeleton = () => {
  return (
    <div className="px-4 py-6 border-b">
      {/* Section Title */}
      <Skeleton className="h-5 w-32 mb-4" />

      <div className="px-1">
        <div className="rounded-sm border border-border/60 bg-muted/20 p-4 sm:p-5">
          {/* Slider Rail Skeleton */}
          <div className="px-1 py-4">
            <div className="relative flex w-full items-center">
              <Skeleton className="h-1.5 w-full rounded-full" />
              {/* Fake Knobs */}
              <Skeleton className="absolute left-[20%] h-5 w-5 rounded-full border-2 border-primary bg-background shadow-sm" />
              <Skeleton className="absolute right-[20%] h-5 w-5 rounded-full border-2 border-primary bg-background shadow-sm" />
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            {/* Min Price Card */}
            <div className="rounded-sm border bg-background px-3 py-3 shadow-sm space-y-2">
              <Skeleton className="h-3 w-12" /> {/* Label */}
              <Skeleton className="h-5 w-20" /> {/* Price */}
            </div>

            {/* Max Price Card */}
            <div className="rounded-sm border bg-background px-3 py-3 shadow-sm space-y-2 flex flex-col items-end">
              <Skeleton className="h-3 w-12" /> {/* Label */}
              <Skeleton className="h-5 w-20" /> {/* Price */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceRangeFilterSkeleton;