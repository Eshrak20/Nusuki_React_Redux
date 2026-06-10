import { motion } from "framer-motion";
import { PlaneTakeoff, ChevronDown } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const NiceSkeleton = ({ className = "" }: { className?: string }) => (
  <Skeleton
    className={`animate-pulse bg-muted/60 dark:bg-muted/25 ${className}`}
  />
);

const PrimarySkeleton = ({ className = "" }: { className?: string }) => (
  <div
    className={`animate-pulse rounded-sm bg-primary/70 dark:bg-primary/60 ${className}`}
  />
);

export const FlightCardSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <Card className="overflow-hidden border border-border/60 bg-card shadow-sm md:rounded-sm">
        <CardContent className="p-0">
          <div className="grid grid-cols-1 gap-8 p-5 sm:p-6 xl:grid-cols-[minmax(0,1fr)_260px] xl:items-center">
            {/* FlightJourneySummary Skeleton */}
            <div className="min-w-0 space-y-5">
              {/* flight numbers / tags */}
              <div className="flex flex-wrap items-center gap-2">
                <NiceSkeleton className="h-7 w-20 bg-primary/20 rounded-sm" />
                <NiceSkeleton className="h-7 w-20 bg-primary/20 rounded-sm" />
              </div>

              <div className="grid grid-cols-1 gap-6 xl:grid-cols-[180px_minmax(0,1fr)] xl:items-center">
                {/* Airline Info */}
                <div className="flex items-center gap-3">
                  <NiceSkeleton className="h-14 w-14 bg-primary/20 rounded-sm" />

                  <div className="min-w-0 space-y-2">
                    <NiceSkeleton className="h-5 w-28 bg-primary/20 rounded-sm" />
                    <NiceSkeleton className="h-4 w-16 bg-primary/20 rounded-sm" />
                  </div>
                </div>

                {/* Journey Info */}
                <div className="grid grid-cols-1 gap-5 md:grid-cols-[140px_minmax(0,1fr)_140px] md:items-center">
                  {/* Departure */}
                  <div className="space-y-2">
                    <NiceSkeleton className="h-10 w-24 bg-primary/20 rounded-sm" />
                    <NiceSkeleton className="h-5 w-14 bg-primary/20 rounded-sm" />
                    <NiceSkeleton className="h-4 w-28 bg-primary/20 rounded-sm" />
                  </div>

                  {/* Center line */}
                  <div className="text-center">
                    <NiceSkeleton className="mx-auto h-4 w-20 bg-primary/20 rounded-sm" />

                    <div className="my-3 flex items-center gap-3">
                      <div className="h-px flex-1 bg-border/70" />

                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                        <PlaneTakeoff className="h-4 w-4 text-primary/70" />
                      </div>

                      <div className="h-px flex-1 bg-border/70" />
                    </div>

                    <NiceSkeleton className="mx-auto h-4 w-16 bg-primary/20 rounded-sm" />
                  </div>

                  {/* Arrival */}
                  <div className="space-y-2 text-left md:text-right">
                    <NiceSkeleton className="ml-0 h-10 w-24 bg-primary/20 rounded-sm md:ml-auto" />
                    <NiceSkeleton className="ml-0 h-5 w-14 bg-primary/20 rounded-sm md:ml-auto" />
                    <NiceSkeleton className="ml-0 h-4 w-28 bg-primary/20 rounded-sm md:ml-auto" />
                  </div>
                </div>
              </div>
            </div>

            {/* FlightPriceInfo Skeleton */}
            <div className="flex flex-col justify-center xl:text-right">
              <div className="space-y-4">
                <NiceSkeleton className="h-7 w-32 rounded-full xl:ml-auto" />
                <NiceSkeleton className="h-10 w-36 bg-primary/20 rounded-sm xl:ml-auto" />
                <NiceSkeleton className="h-4 w-24 bg-primary/20 rounded-sm xl:ml-auto" />

                <PrimarySkeleton className="mt-2 h-12 w-full" />
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t bg-muted/30 px-5 py-4 sm:px-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              {/* FlightMetaBadges Skeleton */}
              <div className="flex flex-wrap gap-3">
                <NiceSkeleton className="h-10 w-28 bg-primary/20 rounded-full" />
                <NiceSkeleton className="h-10 w-36 bg-primary/20 rounded-full" />
                <NiceSkeleton className="h-10 w-28 bg-primary/20 rounded-full" />
                <NiceSkeleton className="h-10 w-32 bg-primary/20 rounded-full" />
              </div>

              {/* View Details Button Skeleton */}
              <div className="mx-auto flex w-fit items-center gap-2 lg:mx-0">
                <NiceSkeleton className="h-5 w-32 bg-primary/20 rounded-sm" />
                <ChevronDown className="h-4 w-4 text-muted-foreground/50" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};