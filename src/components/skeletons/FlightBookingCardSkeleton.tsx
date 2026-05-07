import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const FlightBookingCardSkeleton = () => {
  return (
    <Card className="rounded-2xl">
      <CardHeader className="space-y-4 p-5">
        <div className="flex justify-between gap-4">
          <div className="space-y-3">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-7 w-40" />
            <Skeleton className="h-4 w-52" />
          </div>

          <div className="flex gap-2">
            <Skeleton className="h-7 w-24 rounded-full" />
            <Skeleton className="h-7 w-20 rounded-full" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 p-5">
        <div className="grid gap-3 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-16 rounded-xl" />
          ))}
        </div>

        <Skeleton className="h-36 rounded-2xl" />
      </CardContent>
    </Card>
  );
};

export default FlightBookingCardSkeleton;