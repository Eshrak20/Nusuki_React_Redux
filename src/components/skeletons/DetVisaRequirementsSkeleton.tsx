import { Skeleton } from "@/components/ui/skeleton"; 

const DetVisaRequirementsSkeleton = () => {
    return (
        <div className="mx-auto max-w-7xl pt-1 lg:pt-2 lg:-mt-5 lg:p-4">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">

                {/* Header Section Skeleton */}
                <div className="mb-8 flex items-center gap-4">
                    {/* Icon Box Skeleton */}
                    <Skeleton className="h-10 w-10 lg:h-12 lg:w-12 rounded-xl" />
                    {/* Title Skeleton */}
                    <Skeleton className="h-8 w-48 lg:w-64" />
                </div>

                {/* Sub-heading Skeleton */}
                <div className="mb-4">
                    <Skeleton className="h-6 w-40" />
                </div>

                {/* Requirements List Skeleton */}
                <div className="space-y-3">
                    {[...Array(5)].map((_, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-3 rounded-lg lg:bg-muted/50 px-4 py-3.5"
                        >
                            {/* Check Icon Skeleton */}
                            <div className="shrink-0">
                                <Skeleton className="h-5 w-5 rounded-full" />
                            </div>
                            {/* Text Line Skeleton */}
                            {/* Using different widths to make it look like natural text lengths */}
                            <Skeleton className={`h-5 ${index % 2 === 0 ? 'w-3/4 max-w-100' : 'w-2/3 max-w-75'}`} />
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default DetVisaRequirementsSkeleton;