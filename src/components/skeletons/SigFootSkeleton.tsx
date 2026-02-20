
import { Skeleton } from "@/components/ui/skeleton";

const SigFootSkeleton = () => {
  return (
    <footer className="mt-16 border-t border-border bg-muted/30 py-12 px-6 rounded-t-3xl text-center">
      <div className="max-w-2xl mx-auto space-y-3">
        {/* Footer Title */}
        <Skeleton className="h-6 w-2/5 mx-auto rounded-md" />

        {/* Footer Description */}
        <Skeleton className="h-4 w-5/6 mx-auto rounded-md" />
        <Skeleton className="h-4 w-4/6 mx-auto rounded-md" />

        {/* Decorative Line */}
        <Skeleton className="h-1 w-12 mx-auto rounded-full mt-4" />
      </div>
    </footer>
  );
};

export default SigFootSkeleton;
