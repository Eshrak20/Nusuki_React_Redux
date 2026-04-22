import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { Search, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import emptyFlightAnimation from "@/assets/Lottie/traveltickets.json";
import { resetFilters } from "@/redux/features/flightSearchSlice";

const FlightResultsEmpty = () => {
  const dispatch = useDispatch();

  const handleClearFilters = () => {
    dispatch(resetFilters());
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-white/95 p-6 text-center shadow-xl sm:p-8 dark:border-slate-800 dark:bg-slate-950/90"
    >
      <div className="absolute inset-0">
        <div className="absolute -top-10 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-sky-500/10 blur-3xl dark:bg-sky-500/20" />
        <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-500/20" />
      </div>

      <div className="relative z-10 flex flex-col items-center">
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

        <div className="mt-6 flex w-full max-w-md flex-col gap-3 sm:flex-row">
          <Link
            to="/"
            className="group flex h-12 flex-1 items-center justify-center rounded-2xl bg-primary px-4 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:scale-[1.02] dark:text-black"
          >
            <Search className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            Search Again
          </Link>

          <button
            type="button"
            onClick={handleClearFilters}
            className="group flex h-12 flex-1 items-center justify-center rounded-2xl border border-slate-300 bg-white px-4 text-base font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:scale-[1.02] hover:border-primary hover:text-primary dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-sky-500 dark:hover:text-sky-400"
          >
            <RotateCcw className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:-rotate-90" />
            Clear Filters
          </button>
        </div>

        <p className="mt-3 text-xs text-slate-400 dark:text-slate-500">
          Tip: Try flexible dates or nearby airports
        </p>
      </div>
    </motion.div>
  );
};

export default FlightResultsEmpty;