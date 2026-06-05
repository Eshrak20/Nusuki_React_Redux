import { Skeleton } from "@/components/ui/skeleton";

const DetTestHeroSkeleton = () => {
    return (
        <section className="relative w-full bg-primary/10 dark:bg-muted/10 rounded-[2.5rem] overflow-hidden mt-6">
            
            {/* --- Main Content Layout Skeleton --- */}
            <div className="relative max-w-7xl mx-auto z-10 flex flex-col lg:flex-row items-center gap-10 lg:gap-16 p-8 sm:p-12 lg:py-10 lg:px-3">
                
                {/* Left Column: Text & CTA Skeleton */}
                <div className="w-full lg:w-[55%] flex flex-col items-start space-y-6">
                    {/* Eyebrow Breadcrumb */}
                    <Skeleton className="h-4 w-32 rounded-full" />

                    {/* Title Skeleton */}
                    <div className="space-y-3 w-full">
                        <Skeleton className="h-10 md:h-12 w-3/4" />
                        <Skeleton className="h-10 md:h-12 w-1/2" />
                    </div>

                    {/* Description Skeleton */}
                    <div className="space-y-2 w-full max-w-2xl">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                    </div>

                    {/* Button Skeleton */}
                    <Skeleton className="h-12 w-48 rounded-xl mt-4" />
                </div>

                {/* Right Column: Image Placeholder Skeleton */}
                <div className="w-full lg:w-[45%]">
                    {/* Matching the 4/3 aspect ratio of your actual hero */}
                    <Skeleton className="w-full aspect-4/3 rounded-sm" />
                </div>

            </div>
        </section>
    );
};

export default DetTestHeroSkeleton;