import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import flightErrorAnimation from "@/assets/Lottie/Plane.json";

interface FlightResultsErrorProps {
  isOpen?: boolean;
}

const FlightResultsError = ({
  isOpen = true,
}: FlightResultsErrorProps) => {
  const navigate = useNavigate();

  const handleSearchAgain = () => {
    navigate("/");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 p-4 backdrop-blur-md sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-xl overflow-hidden rounded-[28px] border border-white/20 bg-white/95 shadow-2xl dark:border-white/10 dark:bg-slate-950/95"
          >
            <div className="absolute inset-0">
              <div className="absolute -left-16 top-0 h-40 w-40 rounded-full bg-red-500/10 blur-3xl dark:bg-red-500/15" />
              <div className="absolute -right-10 bottom-0 h-40 w-40 rounded-full bg-sky-500/10 blur-3xl dark:bg-sky-500/15" />
            </div>

            <div className="relative z-10 px-5 py-6 sm:px-8 sm:py-8">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 shadow-sm dark:bg-red-500/10">
                  <AlertTriangle className="h-7 w-7 text-destructive" />
                </div>

                <div className="mb-2 w-full max-w-65 sm:max-w-75">
                  <Lottie
                    animationData={flightErrorAnimation}
                    loop
                    className="h-45 w-full sm:h-55"
                  />
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
                  Failed to load flights
                </h3>

                <p className="mt-2 max-w-md text-sm leading-6 text-slate-600 dark:text-slate-300 sm:text-base">
                  Something went wrong while fetching flight results. Please try
                  searching again. The issue may be temporary.
                </p>

                <div className="mt-6 w-full max-w-sm">
                  <Button
                    onClick={handleSearchAgain}
                    className="group h-12 w-full rounded-2xl bg-primary text-base font-semibold shadow-lg transition-all duration-200 hover:scale-[1.02]"
                  >
                    <RefreshCw className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
                    Search Again
                  </Button>
                </div>

                <p className="mt-3 text-xs text-slate-400 dark:text-slate-500">
                  Please check your network or try another search.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FlightResultsError;