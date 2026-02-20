import { Skeleton } from "@/components/ui/skeleton";

const SideImagesSkeleton = () => {
  const count = 2;
  return (
    <div className={`relative flex flex-col gap-6 mt-7`}>
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <Skeleton
            key={index}
            className="h-60 w-full rounded-xl border bg-card shadow-2xl"
          />
        ))}

      {/* Optional background placeholder */}
      <Skeleton className="absolute -z-10 inset-0 rounded-3xl" />
    </div>
  );
};

export default SideImagesSkeleton;
