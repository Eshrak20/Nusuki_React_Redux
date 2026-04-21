import { motion } from "framer-motion";
import { Loader2, PlaneTakeoff } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const FlightMiniLoader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-center"
    >
      <div className="inline-flex items-center gap-3 rounded-2xl border border-border/60 bg-background/90 px-4 py-3 shadow-sm backdrop-blur-md">
        <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span className="absolute inset-0 rounded-full border border-primary/20" />
        </div>

        <div>
          <p className="text-sm font-semibold text-foreground">
            Searching flights...
          </p>
          <p className="text-xs text-muted-foreground">
            Finding the best available options
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const NiceSkeleton = ({ className = "" }: { className?: string }) => (
  <Skeleton
    className={`animate-pulse bg-muted/50 dark:bg-muted/20 ${className}`}
  />
);

const PrimarySkeleton = ({ className = "" }: { className?: string }) => (
  <div
    className={`animate-pulse rounded-xl bg-primary/70 dark:bg-primary/60 ${className}`}
  />
);

export const FlightCardSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <Card className="overflow-hidden rounded-3xl border border-border/60 bg-primary/40 shadow-sm">
        <CardContent className="p-0">
          <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_260px] xl:items-stretch">
            {/* Left */}
            <div className="p-5 sm:p-6">
              <div className="space-y-5">
                {/* flight numbers */}
                <div className="flex flex-wrap gap-2">
                  <NiceSkeleton className="h-7 w-20 rounded-md" />
                  <NiceSkeleton className="h-7 w-20 rounded-md" />
                </div>

                {/* main summary */}
                <div className="grid grid-cols-1 gap-6 xl:grid-cols-[180px_minmax(0,1fr)] xl:items-center">
                  {/* airline */}
                  <div className="flex items-center gap-3">
                    <NiceSkeleton className="h-14 w-14 rounded-2xl" />

                    <div className="min-w-0 space-y-2">
                      <NiceSkeleton className="h-5 w-28 rounded-md" />
                      <NiceSkeleton className="h-4 w-14 rounded-md" />
                    </div>
                  </div>

                  {/* journey */}
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-[140px_minmax(0,1fr)_140px] md:items-center">
                    {/* departure */}
                    <div className="space-y-2">
                      <NiceSkeleton className="h-10 w-24 rounded-lg" />
                      <NiceSkeleton className="h-5 w-14 rounded-md" />
                      <NiceSkeleton className="h-4 w-28 rounded-md" />
                    </div>

                    {/* center line */}
                    <div className="text-center">
                      <NiceSkeleton className="mx-auto h-4 w-20 rounded-md" />

                      <div className="my-3 flex items-center gap-3">
                        <div className="h-px flex-1 bg-border/70" />
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                          <PlaneTakeoff className="h-4 w-4 text-primary/70" />
                        </div>
                        <div className="h-px flex-1 bg-border/70" />
                      </div>

                      <NiceSkeleton className="mx-auto h-4 w-16 rounded-md" />
                    </div>

                    {/* arrival */}
                    <div className="space-y-2 text-left md:text-right">
                      <NiceSkeleton className="ml-0 h-10 w-24 rounded-lg md:ml-auto" />
                      <NiceSkeleton className="ml-0 h-5 w-14 rounded-md md:ml-auto" />
                      <NiceSkeleton className="ml-0 h-4 w-28 rounded-md md:ml-auto" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right price section */}
            <div className="flex flex-col justify-center border-t bg-muted/20 p-5 dark:bg-muted/10 sm:p-6 xl:border-l xl:border-t-0">
              <div className="space-y-4 xl:text-right">
                <NiceSkeleton className="h-7 w-32 rounded-full xl:ml-auto" />
                <NiceSkeleton className="h-10 w-36 rounded-xl xl:ml-auto" />
                <NiceSkeleton className="h-4 w-24 rounded-md xl:ml-auto" />

                <PrimarySkeleton className="mt-2 h-12 w-full" />
              </div>
            </div>
          </div>

          {/* bottom section */}
          <div className="border-t bg-muted/30 px-5 py-4 sm:px-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap gap-3">
                <NiceSkeleton className="h-10 w-28 rounded-full" />
                <NiceSkeleton className="h-10 w-36 rounded-full" />
                <NiceSkeleton className="h-10 w-28 rounded-full" />
                <NiceSkeleton className="h-10 w-32 rounded-full" />
              </div>

              <NiceSkeleton className="h-5 w-32 rounded-md" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

interface FlightResultsListSkeletonProps {
  count?: number;
}

export const FlightResultsListSkeleton = ({
  count = 10,
}: FlightResultsListSkeletonProps) => {
  return (
    <div className="space-y-4 sm:space-y-5">
      <FlightMiniLoader />

      {Array.from({ length: count }).map((_, index) => (
        <FlightCardSkeleton key={index} />
      ))}
    </div>
  );
};