import { Skeleton } from "@/components/ui/skeleton";

const DetVisaActionCardSkeleton = () => {
    return (
        <div className="mb-5 mt-5 rounded-sm border border-border bg-card p-6 shadow-sm md:p-8">
            {/* Pricing Header Skeleton */}
            <div className="mb-6 flex flex-col items-center justify-center text-center">
                <Skeleton className="mb-2 h-4 w-40" />
                <Skeleton className="my-2 h-10 w-32 md:h-12 md:w-40" />
                <Skeleton className="mt-2 h-4 w-24" />
            </div>

            {/* Features List Skeleton */}
            <div className="mb-8 space-y-3">
                {[...Array(4)].map((_, index) => (
                    <div key={index} className="flex items-start gap-3">
                        <Skeleton className="mt-0.5 h-5 w-5 shrink-0 rounded-full" />
                        <Skeleton className="h-5 w-full max-w-50" />
                    </div>
                ))}
            </div>

            {/* Action Buttons Skeleton */}
            <div className="flex flex-col gap-3">
                <Skeleton className="h-13 w-full rounded-xl" />
                <Skeleton className="h-13 w-full rounded-xl" />
            </div>
        </div>
    );
};

export default DetVisaActionCardSkeleton;