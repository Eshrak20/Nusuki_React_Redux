import { Skeleton } from "@/components/ui/skeleton";

const FlightBookingDetailsSkeleton = () => {
  return (
    <div className="space-y-5">
      <Skeleton className="h-36 rounded-2xl" />
      <Skeleton className="h-56 rounded-2xl" />
      <Skeleton className="h-64 rounded-2xl" />
    </div>
  );
};

export default FlightBookingDetailsSkeleton;