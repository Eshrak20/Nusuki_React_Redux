import { Skeleton } from "@/components/ui/skeleton";

const CountryVisaCardSkeleton = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
                <div
                    key={index}
                    className="bg-card rounded-2xl shadow-sm border overflow-hidden flex flex-col h-full"
                >
                    {/* Top Section / Header Skeleton */}
                    <div className="relative h-30 bg-muted/40 flex flex-col items-center justify-center pt-1">
                        {/* Flag Placeholder */}
                        <Skeleton className="w-13 h-8.5 rounded-sm mb-2" />

                        {/* Country Name Placeholder */}
                        <Skeleton className="h-4 w-28" />
                    </div>

                    {/* Middle Section / Body Skeleton */}
                    <div className="p-5 flex flex-col gap-4 grow">
                        {/* Title Placeholder */}
                        <Skeleton className="h-6 w-3/4 mb-1" />

                        <div className="space-y-3.5">
                            {/* Processing Time Row */}
                            <div className="flex items-center gap-2.5">
                                <Skeleton className="w-4 h-4 rounded-full shrink-0" />
                                <Skeleton className="h-4 w-1/2" />
                            </div>
                            {/* Validity Row */}
                            <div className="flex items-center gap-2.5">
                                <Skeleton className="w-4 h-4 rounded-full shrink-0" />
                                <Skeleton className="h-4 w-3/5" />
                            </div>
                        </div>
                    </div>

                    {/* Divider to match the real card */}
                    <div className="border-t mx-5 opacity-50" />

                    {/* Bottom Section / Footer Skeleton */}
                    <div className="px-5 py-4 mt-auto flex items-end justify-between">
                        <div className="flex flex-col gap-1.5">
                            {/* "From" text */}
                            <Skeleton className="h-3 w-8" />

                            {/* Price */}
                            <Skeleton className="h-7 w-20" />
                        </div>

                        {/* Button Placeholder */}
                        <Skeleton className="w-28 h-10 rounded-lg" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CountryVisaCardSkeleton;