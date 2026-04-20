import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const FlightMiniLoader = () => {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Loader2 className="h-4 w-4 animate-spin" />
      <span>Loading flights...</span>
    </div>
  );
};

export const FlightResultsHeaderSkeleton = () => {
  return (
    <Card className="overflow-hidden rounded-2xl border bg-card shadow-sm">
      <CardContent className="space-y-4 p-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-6 w-44 rounded-md" />
            <Skeleton className="h-8 w-24 rounded-full" />
          </div>

          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-28 rounded-full" />
            <Skeleton className="h-10 w-28 rounded-full" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <Skeleton className="h-11 rounded-xl" />
          <Skeleton className="h-11 rounded-xl" />
          <Skeleton className="h-11 rounded-xl" />
        </div>
      </CardContent>
    </Card>
  );
};

export const FlightCardSkeleton = () => {
  return (
    <Card className="overflow-hidden rounded-2xl border bg-card shadow-sm">
      <CardContent className="p-0">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_270px]">
          {/* Left content */}
          <div className="p-5">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              {/* airline */}
              <div className="flex items-center gap-3">
                <Skeleton className="h-14 w-14 rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32 rounded-md" />
                  <Skeleton className="h-3 w-24 rounded-md" />
                </div>
              </div>

              {/* route / timeline */}
              <div className="flex flex-1 items-center justify-between gap-4 md:px-6">
                <div className="space-y-2 text-left">
                  <Skeleton className="h-6 w-20 rounded-md" />
                  <Skeleton className="h-3 w-16 rounded-md" />
                </div>

                <div className="flex flex-1 flex-col items-center gap-2">
                  <Skeleton className="h-4 w-24 rounded-md" />
                  <Skeleton className="h-2 w-full max-w-[220px] rounded-full" />
                  <Skeleton className="h-3 w-20 rounded-md" />
                </div>

                <div className="space-y-2 text-right">
                  <Skeleton className="ml-auto h-6 w-20 rounded-md" />
                  <Skeleton className="ml-auto h-3 w-16 rounded-md" />
                </div>
              </div>

              {/* quick meta */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-16 rounded-md" />
                <Skeleton className="h-4 w-20 rounded-md" />
              </div>
            </div>

            <div className="mt-5 border-t pt-4">
              <div className="flex flex-wrap gap-3">
                <Skeleton className="h-8 w-28 rounded-full" />
                <Skeleton className="h-8 w-24 rounded-full" />
                <Skeleton className="h-8 w-32 rounded-full" />
              </div>
            </div>
          </div>

          {/* Right price section */}
          <div className="border-l bg-muted/30 p-5">
            <div className="flex h-full flex-col justify-between">
              <div className="space-y-3">
                <Skeleton className="ml-auto h-4 w-24 rounded-md" />
                <Skeleton className="ml-auto h-8 w-36 rounded-md" />
              </div>

              <div className="mt-6 space-y-3">
                <Skeleton className="h-11 w-full rounded-xl" />
                <Skeleton className="h-4 w-24 rounded-md" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface FlightResultsListSkeletonProps {
  count?: number;
}

export const FlightResultsListSkeleton = ({
  count = 5,
}: FlightResultsListSkeletonProps) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <FlightCardSkeleton key={index} />
      ))}
    </div>
  );
};