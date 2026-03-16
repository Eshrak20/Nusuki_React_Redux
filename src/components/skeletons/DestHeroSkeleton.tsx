import { Skeleton } from "@/components/ui/skeleton";

const DestHeroSkeleton = () => {
  return (
    <section className="relative w-full overflow-hidden min-h-100 md:min-h-100 flex items-center lg:shadow-lg mb-4 bg-muted/10">
      
      {/* Skeleton Gradient Overlay (Mimics the dark/light gradient of the real hero) */}
      <div className="absolute inset-0 bg-linear-to-r from-muted/40 to-transparent dark:from-muted/10 dark:to-transparent" />

      {/* Content Container (Matches exact padding and width of the real hero) */}
      <div className="relative z-10 flex flex-col items-start px-8 md:px-16 lg:px-64 w-full md:w-3/4 lg:w-1/2">
        
        {/* Title Skeleton - 3 staggered lines using shadcn Skeleton */}
        <div className="w-full mb-8 flex flex-col gap-3 md:gap-4">
          <Skeleton className="h-12 md:h-16 lg:h-18 w-full rounded-2xl" />
          <Skeleton className="h-12 md:h-16 lg:h-18 w-4/5 rounded-2xl" />
          <Skeleton className="h-12 md:h-16 lg:h-18 w-3/5 rounded-2xl" />
        </div>

        {/* Call to Action Button Skeleton */}
        <div className="shrink-0 pt-4 lg:pt-0">
           {/* Matches the padding (py-7 + text) of the actual button */}
           <Skeleton className="h-21 lg:h-24 w-55 lg:w-[320px] rounded-full" />
        </div>
        
      </div>
    </section>
  );
};

export default DestHeroSkeleton;