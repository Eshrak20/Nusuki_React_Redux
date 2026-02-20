
import { Skeleton } from "@/components/ui/skeleton";

const StepGuideSkeleton = () => {
  return (
    <div className="py-12 space-y-10">
      {/* Header Skeleton */}
      <div className="space-y-3 max-w-3xl">
        <Skeleton className="h-6 w-40 rounded-full" />{" "}
        {/* Step-by-Step badge */}
        <Skeleton className="h-10 w-3/5 rounded-md" /> {/* Guide title */}
        <Skeleton className="h-4 w-full rounded-md" />{" "}
        {/* Description line 1 */}
        <Skeleton className="h-4 w-5/6 rounded-md" /> {/* Description line 2 */}
      </div>

      {/* Sections Skeleton (Static 2 Sections, 4 Items Each) */}
      <div className="grid gap-8">
        {Array(2)
          .fill(0)
          .map((_, sIdx) => (
            <div
              key={sIdx}
              className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
            >
              {/* Section Header */}
              <div className="bg-muted/30 px-6 py-4 border-b border-border flex items-center justify-between">
                <Skeleton className="h-6 w-6 rounded-lg" />{" "}
                {/* Number Circle */}
                <Skeleton className="h-6 w-1/3 rounded-md" />{" "}
                {/* Section title */}
              </div>

              {/* Items List */}
              <div className="p-6">
                <div className="grid gap-6 md:grid-cols-2">
                  {Array(4)
                    .fill(0)
                    .map((_, iIdx) => (
                      <div key={iIdx} className="relative pl-8 space-y-2">
                        <Skeleton className="h-6 w-6 rounded-full absolute left-0 top-1" />{" "}
                        {/* Bullet Icon */}
                        <Skeleton className="h-5 w-3/4 rounded-md ml-8" />{" "}
                        {/* Item title */}
                        <Skeleton className="h-4 w-full rounded-md ml-8" />{" "}
                        {/* Item description line 1 */}
                        <Skeleton className="h-4 w-5/6 rounded-md ml-8" />{" "}
                        {/* Item description line 2 */}
                      </div>
                    ))}
                </div>
              </div>

              {/* Background Decoration */}
              <Skeleton className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full opacity-10" />
            </div>
          ))}
      </div>
    </div>
  );
};

export default StepGuideSkeleton;
