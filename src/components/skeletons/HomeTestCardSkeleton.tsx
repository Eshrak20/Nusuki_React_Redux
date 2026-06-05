import { Skeleton } from "@/components/ui/skeleton";

const HomeTestCardSkeleton = () => {
    const skeletonItems = Array.from({ length: 3 });

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4 max-w-7xl mx-auto">
            {skeletonItems.map((_, index) => (
                <div
                    key={index}
                    className="bg-card rounded-sm p-8 flex flex-col items-center justify-between border border-border shadow-sm h-full relative overflow-hidden"
                >
                    <div className="flex flex-col items-center w-full">
                        {/* Image Placeholder */}
                        <div className="h-16 flex items-center justify-center mb-6 w-full">
                            <Skeleton className="h-12 w-28" />
                        </div>

                        {/* Description/Title Placeholder */}
                        <Skeleton className="h-5 w-3/4 mb-8" />

                        {/* Details List (Date, Time, Duration, Batch) */}
                        <div className="flex flex-col items-center space-y-3 w-full">
                            <Skeleton className="h-4 w-40" />
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-4 w-36" />
                            <Skeleton className="h-4 w-28" />
                        </div>
                    </div>

                    <div className="flex flex-col items-center mt-8 space-y-5 w-full">
                        {/* 'View More' Link Placeholder */}
                        <Skeleton className="h-4 w-20" />

                        {/* 'Enroll Now' Button Placeholder */}
                        <Skeleton className="h-11 w-40 rounded-lg" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default HomeTestCardSkeleton;