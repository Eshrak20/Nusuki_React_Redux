import { Skeleton } from "@/components/ui/skeleton";

const FlightBookingDetailsSkeleton = () => {
  return (
    <div className="space-y-5">
      <Skeleton className="h-36 rounded-sm" />
      <Skeleton className="h-56 rounded-sm" />
      <Skeleton className="h-64 rounded-sm" />
    </div>
  );
};

export default FlightBookingDetailsSkeleton;