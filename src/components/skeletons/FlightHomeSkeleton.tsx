import { Skeleton } from "@/components/ui/skeleton";

// --- Sub-Skeletons ---

const FlightPromotionsSkeleton = () => (
  <div className="w-full px-4 overflow-hidden">
    <Skeleton className="h-10 w-64 mb-8 rounded-lg" />
    <div className="flex gap-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)] shrink-0">
          <Skeleton className="aspect-16/10 w-full rounded-2xl" />
        </div>
      ))}
    </div>
  </div>
);

const FlightDestinationSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="relative h-95 w-full rounded-3xl overflow-hidden">
        <Skeleton className="h-full w-full" />
        <div className="absolute bottom-0 left-0 p-6 w-full space-y-3">
          <Skeleton className="h-7 w-3/4 bg-slate-200/50 dark:bg-slate-800/50" />
          <Skeleton className="h-4 w-1/2 bg-slate-200/50 dark:bg-slate-800/50" />
        </div>
      </div>
    ))}
  </div>
);

const FlightCollectionSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {[1, 2, 3].map((i) => (
      <div key={i} className="relative h-80 w-full rounded-[2.5rem] rounded-tr-none overflow-hidden">
        <Skeleton className="h-full w-full" />
        <div className="absolute bottom-6 left-6 right-6 p-6 rounded-[2rem] border border-white/20 bg-white/10 backdrop-blur-sm">
          <div className="flex justify-between items-center">
            <div className="space-y-2 flex-1">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
            <Skeleton className="h-10 w-10 rounded-full shrink-0 ml-4" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

const FlightTourPackagesSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {[1, 2, 3].map((i) => (
      <div key={i} className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 overflow-hidden">
        <div className="relative h-72">
          <Skeleton className="h-full w-full" />
          <Skeleton className="absolute top-5 left-5 h-8 w-20 rounded-full" />
        </div>
        <div className="p-8 space-y-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-3 w-24" />
          </div>
          <Skeleton className="h-8 w-full" />
          <div className="flex justify-between items-center pt-6 border-t border-slate-100 dark:border-slate-800">
            <div className="space-y-2">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-8 w-28" />
            </div>
            <Skeleton className="h-14 w-14 rounded-[1.2rem]" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

// --- Main Combined Component ---

const FlightHomeSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-950 space-y-16 pb-20">
      {/* Promotions Section */}
      <section className="max-w-7xl mx-auto pt-12 md:pt-16 lg:pt-32">
        <FlightPromotionsSkeleton />
      </section>

      {/* Popular Destinations Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12 space-y-4">
          <Skeleton className="h-10 w-3/4 mx-auto" />
          <Skeleton className="h-4 w-full mx-auto" />
        </div>
        <FlightDestinationSkeleton />
      </section>

      {/* Signature Collections Section */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="space-y-3">
            <Skeleton className="h-4 w-32 rounded-full" />
            <Skeleton className="h-12 w-80" />
          </div>
          <Skeleton className="h-16 w-full md:w-96 rounded-xl" />
        </div>
        <FlightCollectionSkeleton />
      </section>

      {/* Tour Packages Section */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center mb-12 space-y-4">
          <Skeleton className="h-10 w-2/3 mx-auto" />
          <Skeleton className="h-4 w-full mx-auto" />
        </div>
        <FlightTourPackagesSkeleton />
      </section>

      {/* Dream Destinations Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12 space-y-4">
          <Skeleton className="h-10 w-1/2 mx-auto" />
          <Skeleton className="h-4 w-full mx-auto" />
        </div>
        <FlightDestinationSkeleton />
      </section>
    </div>
  );
};

export default FlightHomeSkeleton;