import { Skeleton } from "@/components/ui/skeleton";

const HajjUmDetBannerSkeleton = () => {
    return (
        <section className="relative w-full h-[50vh] md:h-screen overflow-hidden pointer-events-none bg-neutral-50 dark:bg-neutral-950">
            {/* 1. Sophisticated Overlays (Adapts to light/dark mode) */}
            <div className="absolute inset-0 z-20 pointer-events-none">
                <div className="absolute inset-0 bg-linear-to-b from-white/80 via-white/20 to-white/90 dark:from-black/80 dark:via-black/20 dark:to-black/90"></div>
                <div className="absolute inset-0 bg-linear-to-r from-white/40 via-transparent to-white/40 dark:from-black/40 dark:via-transparent dark:to-black/40"></div>

                {/* Spiritual Glow Orbs */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-600/20 dark:bg-emerald-600/10 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#d4af37]/20 dark:bg-[#d4af37]/5 rounded-full blur-[120px] animate-pulse delay-1000"></div>
            </div>

            {/* 2. Background Image Placeholder */}
            <div className="absolute inset-0 w-full h-full">
                {/* Deep, pulsing background to represent the loading image */}
                <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-900 animate-pulse" />
            </div>

            {/* 3. Noise Texture for "Film" look */}
            <div
                className="absolute inset-0 z-10 opacity-[0.05] dark:opacity-[0.03] mix-blend-overlay pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* 4. Content Container */}
            <div className="relative z-30 h-full mt-6 lg:mt-0 flex flex-col justify-center items-center text-center px-6">
                {/* Status Badge Skeleton */}
                <div className="mb-6">
                    <Skeleton className="h-9 w-32 rounded-full bg-black/10 dark:bg-white/10" />
                </div>

                {/* Main Title Skeleton */}
                {/* Simulating the height and width of the large text */}
                <Skeleton className="h-12 w-[80%] max-w-2xl md:h-20 lg:h-24 lg:mb-12 rounded-sm bg-black/10 dark:bg-white/10" />

                {/* Tagline Skeleton */}
                <div className="mt-4 flex flex-col items-center gap-2">
                    <Skeleton className="h-6 w-64 md:w-96 rounded-sm bg-black/10 dark:bg-white/10" />
                    <Skeleton className="h-6 w-48 md:w-72 rounded-sm bg-black/10 dark:bg-white/10" />
                </div>

                {/* Elegant Divider Skeleton */}
                <div
                    className="h-px bg-linear-to-r from-transparent via-black/20 dark:via-white/20 to-transparent mt-10 w-full max-w-md"
                />
            </div>
        </section>
    );
};

export default HajjUmDetBannerSkeleton;