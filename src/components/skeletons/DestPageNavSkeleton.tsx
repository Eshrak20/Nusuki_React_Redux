import { Skeleton } from "@/components/ui/skeleton";

const DestPageNavSkeleton = () => {
  // Create an array of 6 dummy items to simulate the navigation pills
  const skeletonItems = Array(6).fill(0);

  return (
    <div className="w-full sticky top-20 lg:top-24 z-40 bg-background/80 backdrop-blur-md mb-11 pt-4 transition-all">
      {/* Outer Pill Container (matches exact padding and border of real nav) */}
      <nav className="flex items-center p-1.5 md:p-2 bg-card border border-border rounded-full shadow-sm overflow-hidden w-full">
        
        {/* Inner List */}
        <ul className="flex items-center gap-2 w-max px-1">
          {skeletonItems.map((_, i) => (
            <li key={i}>
              {/* Skeleton Pill 
                Matches the py-2.5 md:py-3 and px-5 md:px-7 of the actual text links 
              */}
              <Skeleton className="h-10 md:h-12 w-27.5 md:w-35 rounded-full" />
            </li>
          ))}
        </ul>
        
      </nav>
    </div>
  );
};

export default DestPageNavSkeleton;