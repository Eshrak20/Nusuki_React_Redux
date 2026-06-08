import { AlertCircle, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { FlightMiniLoader } from "./FlightMiniLoader";

type FlightDetailStateVariant = "loading" | "error";

interface FlightDetailStateProps {
  variant: FlightDetailStateVariant;
  title?: string;
  message?: string;
  className?: string;
}

const FlightDetailState = ({
  variant,
  title,
  message,
  className = "",
}: FlightDetailStateProps) => {
  const isLoading = variant === "loading";

  return (
    <div
      className={`flex min-h-[320px] w-full items-center justify-center px-6 py-10 ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 14, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        className="relative w-full max-w-md overflow-hidden rounded-sm border border-border/60 bg-background/95 p-8 text-center shadow-[0_20px_60px_-15px_rgba(0,0,0,0.18)] backdrop-blur"
      >
        {/* soft glow */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-primary/10 to-transparent" />

        <div className="relative flex flex-col items-center">
          {isLoading ? (
            <>
              <div className="mb-5">
                <FlightMiniLoader />
              </div>

              <h3 className="text-lg font-bold tracking-tight text-foreground">
                {title || "Loading latest flight details..."}
              </h3>

              <p className="mt-2 max-w-xs text-sm leading-6 text-muted-foreground">
                {message ||
                  "We’re fetching the newest fare, timing, and route information for you."}
              </p>

              <div className="mt-6 flex items-center gap-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
                <span className="h-2 w-2 animate-pulse rounded-full bg-primary [animation-delay:150ms]" />
                <span className="h-2 w-2 animate-pulse rounded-full bg-primary [animation-delay:300ms]" />
              </div>
            </>
          ) : (
            <>
              <div className="relative mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10 ring-8 ring-red-500/5">
                <AlertCircle className="h-10 w-10 text-red-500" />
              </div>

              <h3 className="text-lg font-bold tracking-tight text-foreground">
                {title || "Failed to load flight detail"}
              </h3>

              <p className="mt-2 max-w-xs text-sm leading-6 text-muted-foreground">
                {message ||
                  "Something went wrong while loading this flight. Please try again."}
              </p>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default FlightDetailState;
