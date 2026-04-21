import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Card } from "@/components/ui/card";
import { Clock, RefreshCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import flightErrorAnimation from "@/assets/Lottie/Plane.json";

interface FlightTimerProps {
  compact?: boolean;
}

const FlightTimer = ({ compact = false }: FlightTimerProps) => {
  const INITIAL_TIME = 15 * 60;
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);

  const isExpired = timeLeft <= 0;

  useEffect(() => {
    if (isExpired) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isExpired]);

  const safeTimeLeft = Math.max(0, timeLeft);
  const minutes = Math.floor(safeTimeLeft / 60);
  const seconds = safeTimeLeft % 60;

  const handleRedirect = () => {
    window.location.href = "/";
  };

  return (
    <>
      <Card
        className={cn(
          "border-border bg-card shadow-sm",
          compact ? "rounded-2xl px-3 py-2.5" : "mb-4 rounded-3xl p-4",
        )}
      >
        <div
          className={cn(
            "flex items-center",
            compact ? "justify-center gap-2.5" : "gap-3",
          )}
        >
          <div
            className={cn(
              "rounded-full bg-primary/10",
              compact ? "p-1.5" : "p-2",
            )}
          >
            <Clock
              className={cn(
                "text-primary animate-pulse",
                compact ? "h-4 w-4" : "h-5 w-5",
              )}
            />
          </div>

          <div className="flex flex-col">
            <span
              className={cn(
                "font-bold uppercase text-muted-foreground",
                compact
                  ? "text-[9px] tracking-[0.18em]"
                  : "text-[10px] tracking-widest",
              )}
            >
              Session Time
            </span>

            <div
              className={cn(
                "flex font-mono font-bold text-foreground",
                compact ? "text-xl sm:text-[22px]" : "text-2xl",
              )}
            >
              <TimeUnit value={minutes} compact={compact} />
              <span
                className={cn(
                  "text-muted-foreground/50",
                  compact ? "mx-0.5" : "mx-1",
                )}
              >
                :
              </span>
              <TimeUnit value={seconds} compact={compact} />
            </div>
          </div>
        </div>
      </Card>

      <AlertDialog open={isExpired}>
        <AlertDialogContent className="border-border bg-background/95 p-0 shadow-2xl backdrop-blur-md sm:max-w-md overflow-hidden">
          {/* TOP SECTION */}
          <div className="bg-gradient-to-b from-primary/5 to-background px-6 pt-8 pb-4 flex flex-col items-center text-center">
            {/* LOTTIE */}
            <div className="mb-4 flex justify-center items-center">
              <div className="h-36 w-36">
                <Lottie animationData={flightErrorAnimation} loop />
              </div>
            </div>

            <AlertDialogHeader className="items-center text-center space-y-2">
              <AlertDialogTitle className="text-xl font-bold">
                Session Expired
              </AlertDialogTitle>

              <AlertDialogDescription className="max-w-sm text-sm leading-6 text-muted-foreground">
                Your flight search session has timed out. Please search again to
                see the latest prices and availability.
              </AlertDialogDescription>
            </AlertDialogHeader>
          </div>

          {/* BUTTON */}
          <AlertDialogFooter className="px-6 pb-6 pt-2 sm:justify-center">
            <AlertDialogAction
              onClick={handleRedirect}
              className="w-full rounded-2xl bg-primary py-6 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 flex items-center justify-center"
            >
              <RefreshCcw className="mr-2 h-4 w-4" />
              Search Again
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

interface TimeUnitProps {
  value: number;
  compact?: boolean;
}

const TimeUnit = ({ value, compact = false }: TimeUnitProps) => {
  const displayValue = value.toString().padStart(2, "0");

  return (
    <div className="flex overflow-hidden">
      {displayValue.split("").map((char: string, index: number) => (
        <motion.span
          key={`${index}-${char}`}
          initial={{ y: 5, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 40 }}
          className={cn(
            "inline-block font-mono",
            compact ? "w-[0.9ch]" : "w-[1ch]",
          )}
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
};

export default FlightTimer;
