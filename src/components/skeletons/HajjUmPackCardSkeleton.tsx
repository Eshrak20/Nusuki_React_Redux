import { Skeleton } from "@/components/ui/skeleton";

const HajjUmPackCardSkeleton = () => {
  return (
    <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-14">
      
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="relative flex flex-col overflow-hidden rounded-[2rem] bg-[#f2f2f2] shadow-xl"
        >
          {/* Image Skeleton */}
          <div className="relative h-96 w-full overflow-hidden rounded-b-[1.5rem]">
            <Skeleton className="h-full w-full bg-gray-300" />
          </div>

          {/* Content Section */}
          <div className="flex flex-col items-center px-6 pb-8 pt-6 text-center space-y-4">
            
            {/* Title Skeleton */}
            <Skeleton className="h-8 w-40 bg-gray-400" />

            {/* Tagline Skeleton */}
            <Skeleton className="h-5 w-32 bg-gray-300" />

            {/* Pricing Skeleton */}
            <div className="mt-4 flex items-center gap-2">
              <Skeleton className="h-5 w-20 bg-gray-300" />
              <Skeleton className="h-6 w-24 bg-gray-400" />
              <Skeleton className="h-5 w-12 bg-gray-300" />
            </div>

            {/* Button Skeleton */}
            <Skeleton className="mt-6 h-12 w-48 rounded-full bg-gray-400" />
          </div>
        </div>
      ))}

    </div>
  );
};

export default HajjUmPackCardSkeleton;