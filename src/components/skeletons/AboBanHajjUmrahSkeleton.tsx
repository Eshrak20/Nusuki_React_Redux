import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "../ui/card";

const AboBanHajjUmrahSkeleton = () => {
  return (
    <Card className="p-6 space-y-4">
      <CardContent className="flex flex-col items-center justify-center text-center space-y-4">
        {/* Skeleton for title */}
        <Skeleton className="h-8 w-3/5 rounded-md" />

        {/* Skeleton for description */}
        <div className="space-y-2 w-full max-w-4xl">
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-5/6 rounded-md" />
          <Skeleton className="h-4 w-2/3 rounded-md" />
        </div>
      </CardContent>
    </Card>
  );
};

export default AboBanHajjUmrahSkeleton;
