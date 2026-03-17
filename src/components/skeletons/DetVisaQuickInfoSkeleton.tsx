import { Skeleton } from "@/components/ui/skeleton"; // Adjust this import path if yours is different

const DetVisaQuickInfoSkeleton = () => {
    return (
        <section className="py-6">
            <div className="container mx-auto lg:px-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Map through an array of 4 to create the 4 placeholder cards */}
                    {[...Array(4)].map((_, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center justify-center rounded-2xl bg-card border border-border p-6 shadow-sm"
                        >
                            {/* Icon Circle Skeleton */}
                            <Skeleton className="mb-4 h-14 w-14 rounded-full" />

                            {/* Title Text Skeleton */}
                            <Skeleton className="mb-2 h-6 w-32" />

                            {/* Value Text Skeleton */}
                            <Skeleton className="h-4 w-24" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default DetVisaQuickInfoSkeleton;