import { Skeleton } from "@/components/ui/skeleton";

const ReqListSkeleton = () => {
  return (
    <div className="max-w-4xl space-y-10">
      {/* Header Section */}
      <header className="space-y-2">
        <Skeleton className="h-10 w-1/3 rounded-sm" /> {/* Title */}
        <Skeleton className="h-1.5 w-20 rounded-full" /> {/* Underline */}
      </header>

      {/* Requirements List */}
      <div className="grid grid-cols-2 gap-8">
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <div key={index} className="flex items-start gap-4">
              {/* Bullet Skeleton */}
              <Skeleton className="mt-1.5 h-6 w-6 rounded-full" />

              {/* Content Skeleton */}
              <div className="space-y-2 w-full">
                <Skeleton className="h-5 w-3/5 rounded-sm" /> {/* Item title */}
                <Skeleton className="h-4 w-full rounded-sm" />{" "}
                {/* Description line 1 */}
                <Skeleton className="h-4 w-5/6 rounded-sm" />{" "}
                {/* Description line 2 */}
              </div>
            </div>
          ))}
      </div>

      {/* Professional Note Box */}
      <div className="relative mt-12 overflow-hidden rounded-sm border p-6">
        <div className="absolute top-0 left-0 h-full w-1">
          <Skeleton className="h-full w-full" />
        </div>
        <div className="flex gap-3 items-start">
          <Skeleton className="h-5 w-5 rounded-full" /> {/* Icon placeholder */}
          <div className="space-y-2 w-full">
            <Skeleton className="h-4 w-1/4 rounded-sm" /> {/* Note title */}
            <Skeleton className="h-4 w-full rounded-sm" />{" "}
            {/* Note text line 1 */}
            <Skeleton className="h-4 w-5/6 rounded-sm" />{" "}
            {/* Note text line 2 */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReqListSkeleton;
