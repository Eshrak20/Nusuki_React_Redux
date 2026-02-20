
import { Skeleton } from "@/components/ui/skeleton";

interface SigBanHajjUmrahSkeletonProps {
  lines?: number; // Number of paragraph lines to mimic
}

const SigBanHajjUmrahSkeleton = ({ lines = 4 }: SigBanHajjUmrahSkeletonProps) => {
  return (
    <section className="relative overflow-hidden rounded-2xl space-y-8 max-w-3xl">
      {/* Heading Skeleton */}
      <Skeleton className="h-10 w-3/5 rounded-md" />

      {/* Paragraphs Skeleton */}
      <div className="space-y-4">
        {Array(lines)
          .fill(0)
          .map((_, index) => (
            <Skeleton
              key={index}
              className={`h-4 rounded-md ${index % 2 === 0 ? "w-full" : "w-5/6"}`}
            />
          ))}
      </div>

      {/* Decorative Element */}
      <Skeleton className="absolute -right-16 -top-16 h-64 w-64 rounded-full" />
    </section>
  );
};

export default SigBanHajjUmrahSkeleton;
