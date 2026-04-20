import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import emptyFlightAnimation from "@/assets/Lottie/traveltickets.json";

const FlightResultsEmpty = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-white/95 p-6 text-center shadow-xl sm:p-8 dark:border-slate-800 dark:bg-slate-950/90"
    >
      {/* 🌈 background glow */}
      <div className="absolute inset-0">
        <div className="absolute -top-10 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-sky-500/10 blur-3xl dark:bg-sky-500/20" />
        <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-500/20" />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* ✈️ lottie */}
        <div className="mb-3 w-full max-w-65 sm:max-w-75">
          <Lottie
            animationData={emptyFlightAnimation}
            loop
            className="h-45 w-full sm:h-55"
          />
        </div>

        <h3 className="text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
          No flights found
        </h3>

        <p className="mt-2 max-w-md text-sm leading-6 text-slate-600 dark:text-slate-300 sm:text-base">
          We couldn’t find any flights for your selected route and date.
          Try adjusting your filters or searching with different dates.
        </p>

        <div className="mt-6 w-full max-w-xs">
          <Link
            to="/"
            className="group flex h-12 w-full items-center justify-center rounded-2xl bg-primary text-base font-semibold text-white shadow-lg transition-all duration-200 hover:scale-[1.02]"
          >
            <Search className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            Search Again
          </Link>
        </div>

        <p className="mt-3 text-xs text-slate-400 dark:text-slate-500">
          Tip: Try flexible dates or nearby airports
        </p>
      </div>
    </motion.div>
  );
};

export default FlightResultsEmpty;