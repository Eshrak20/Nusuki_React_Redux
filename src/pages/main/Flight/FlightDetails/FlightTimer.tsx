import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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

const FlightTimer = () => {
  const INITIAL_TIME = 15 * 60; // 15 minutes
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);

  // Derive isExpired directly from timeLeft to avoid cascading renders
  const isExpired = timeLeft <= 0;

  useEffect(() => {
    if (isExpired) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 30);
    return () => clearInterval(timer);
  }, [isExpired]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const handleRedirect = () => {
    window.location.href = "/";
  };

  return (
    <>
      <Card className="p-4 border-border bg-card shadow-sm mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-full">
            <Clock className="w-5 h-5 text-primary animate-pulse" />
          </div>

          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
              Session Time
            </span>
            <div className="flex text-2xl font-mono font-bold text-foreground">
              <TimeUnit value={minutes} />
              <span className="mx-0.5 text-muted-foreground/50">:</span>
              <TimeUnit value={seconds} />
            </div>
          </div>
        </div>
      </Card>

      {/* Expiration Modal */}
      <AlertDialog open={isExpired}>
        <AlertDialogContent className="backdrop-blur-md bg-background/80 border-border sm:max-w-[425px]">
          <AlertDialogHeader className="flex flex-col items-center justify-center text-center">
            <div className="w-14 h-14 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
              <RefreshCcw className="w-7 h-7 text-destructive" />
            </div>
            <AlertDialogTitle className="text-xl">
              Session Expired
            </AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              Your flight search session has timed out. Please search again to
              get updated prices.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="sm:justify-center mt-4">
            <AlertDialogAction
              onClick={handleRedirect}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-5"
            >
              Session out search again
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

// Sub-component with proper TypeScript types
interface TimeUnitProps {
  value: number;
}

const TimeUnit = ({ value }: TimeUnitProps) => {
  const displayValue = value.toString().padStart(2, "0");

  return (
    <div className="flex overflow-hidden">
      {displayValue.split("").map((char: string, index: number) => (
        <motion.span
          key={`${index}-${char}`}
          initial={{ y: 5, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 40 }}
          className="inline-block w-[1ch]"
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
};

export default FlightTimer;
