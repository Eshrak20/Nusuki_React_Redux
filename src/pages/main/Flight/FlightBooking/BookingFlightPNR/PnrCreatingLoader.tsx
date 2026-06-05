import Lottie from "lottie-react";
import { Loader2, Plane } from "lucide-react";

import creatingPnrAnimation from "@/assets/Lottie/traveltickets.json";

type PnrCreatingLoaderProps = {
  show: boolean;
  title?: string;
  description?: string;
};

const PnrCreatingLoader = ({
  show,
  title = "Creating your PNR...",
  description = "Please wait while we confirm passenger details and prepare your booking.",
}: PnrCreatingLoaderProps) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-background/80 px-4 backdrop-blur-md">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border bg-card p-6 text-center shadow-2xl dark:bg-card/95">
        <div className="pointer-events-none absolute -left-20 -top-20 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />

        <div className="relative mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-sm border bg-primary/10 text-primary">
          <Plane className="h-8 w-8" />
        </div>

        <div className="relative mx-auto h-48 w-48">
          <Lottie animationData={creatingPnrAnimation} loop autoplay />
        </div>

        <div className="relative space-y-2">
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            {title}
          </h2>

          <p className="mx-auto max-w-xs text-sm leading-6 text-muted-foreground">
            {description}
          </p>

          <div className="mt-5 flex items-center justify-center gap-2 text-sm font-semibold text-primary">
            <Loader2 className="h-4 w-4 animate-spin" />
            Processing booking request
          </div>
        </div>
      </div>
    </div>
  );
};

export default PnrCreatingLoader;