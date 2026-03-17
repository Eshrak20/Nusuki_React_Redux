import { Skeleton } from "@/components/ui/skeleton"; // Adjust this import path if yours is different

const DetVisaBannerSkeleton = () => {
    return (
        <section className="relative overflow-hidden bg-primary py-10 lg:pb-12 lg:pt-14">
            {/* Background Gradient matching the actual Banner component */}
            <div className="absolute inset-0 z-0 bg-linear-to-r from-transparent to-black/40 mix-blend-multiply" />

            <div className="container relative z-10 mx-auto px-4 flex flex-col items-center text-center">

                {/* Breadcrumbs Skeleton */}
                <div className="mb-8 flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded bg-primary-foreground/20" />
                    <Skeleton className="h-4 w-12 rounded bg-primary-foreground/20" />
                    <Skeleton className="h-3 w-3 rounded bg-primary-foreground/20" />
                    <Skeleton className="h-4 w-24 rounded bg-primary-foreground/20" />
                    <Skeleton className="h-3 w-3 rounded bg-primary-foreground/20" />
                    <Skeleton className="h-4 w-16 rounded bg-primary-foreground/20" />
                </div>

                {/* Flag Skeleton */}
                <Skeleton className="mb-4 lg:mb-6 h-14 w-22 lg:h-16 lg:w-24 rounded bg-primary-foreground/20 shadow-lg" />

                {/* Headings Skeleton */}
                <Skeleton className="mb-3 h-9 w-48 rounded bg-primary-foreground/20 lg:h-10.5 lg:w-64" />

                {/* Subheading Skeleton */}
                <Skeleton className="mb-8 h-6 w-64 rounded bg-primary-foreground/20 lg:h-7 lg:w-80" />

                {/* Info Pills Skeleton */}
                <div className="flex flex-wrap items-center justify-center gap-4">
                    {/* Processing Time Pill Skeleton */}
                    <Skeleton className="h-10 w-36 rounded-full bg-primary-foreground/20 backdrop-blur-md" />

                    {/* Validity Pill Skeleton */}
                    <Skeleton className="h-10 w-36 rounded-full bg-primary-foreground/20 backdrop-blur-md" />
                </div>

            </div>
        </section>
    );
};

export default DetVisaBannerSkeleton;