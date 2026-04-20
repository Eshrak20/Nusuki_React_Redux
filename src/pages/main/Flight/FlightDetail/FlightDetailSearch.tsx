/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { motion } from "framer-motion";
import {
  Users,
  PlaneTakeoff,
  MapPin,
  Calendar,
  Settings2,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const FlightDetailSearch = () => {
  const searchData = useSelector((state: RootState) => state.flightSearch);

  // Logic to handle Multi-way segments or Single-way
  const isMultiWay = searchData.tripType === "multi-way";
  const flights =
    isMultiWay && searchData.segments ? searchData.segments : [searchData];

  /**
   * Helper: Formats the traveler object into a readable string
   * Example: "1 Adult, 2 Children"
   */
  const getTravelerSummary = () => {
    const { travelers } = searchData;
    if (!travelers) return "No travelers selected";

    const parts = [];

    // Adults logic
    if (travelers.adults > 0) {
      parts.push(`${travelers.adults} Adult${travelers.adults > 1 ? "s" : ""}`);
    }

    // CHILDREN LOGIC: Calculate count from array length
    const childrenCount = Array.isArray(travelers.children)
      ? travelers.children.length
      : 0;
    if (childrenCount > 0) {
      parts.push(`${childrenCount} Child${childrenCount > 1 ? "ren" : ""}`);
    }

    // Infants logic
    if (travelers.infants > 0) {
      parts.push(
        `${travelers.infants} Infant${travelers.infants > 1 ? "s" : ""}`,
      );
    }

    return parts.join(", ");
  };

  /**
   * Helper: Calculates total headcount
   */
  const totalTravelers = searchData.travelers
    ? searchData.travelers.adults +
      (Array.isArray(searchData.travelers.children)
        ? searchData.travelers.children.length
        : 0) +
      (searchData.travelers.infants || 0)
    : 0;

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "---";
    return new Date(dateString).toLocaleDateString("en-GB", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { x: -10, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-full space-y-4"
    >
      {/* HEADER SUMMARY CARD */}
      <div className="bg-white  dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          {/* Trip Type */}
          <div>
            <span className="text-[10px] uppercase font-black text-slate-400 block mb-1 tracking-tight">
              Trip Type
            </span>
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold capitalize">
              {searchData.tripType?.replace("-", " ")}
            </span>
          </div>

          <div className="h-10 w-[1px] bg-slate-100 dark:bg-slate-800 hidden sm:block" />

          {/* Dynamic Travelers Info */}
          <div>
            <span className="text-[10px] uppercase font-black text-slate-400 block mb-1 tracking-tight">
              Travelers
            </span>
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
              <Users className="w-4 h-4 text-primary" />
              <div className="flex flex-col">
                <span className="text-sm font-bold leading-none">
                  {totalTravelers}{" "}
                  {totalTravelers > 1 ? "Travelers" : "Traveler"}
                </span>
                <span className="text-[10px] text-slate-500 font-medium mt-0.5">
                  {getTravelerSummary()}
                </span>
              </div>
            </div>
          </div>

          <div className="h-10 w-[1px] bg-slate-100 dark:bg-slate-800 hidden sm:block" />

          {/* Cabin Class */}
          <div>
            <span className="text-[10px] uppercase font-black text-slate-400 block mb-1 tracking-tight">
              Cabin Class
            </span>
            <span className="text-sm font-bold text-slate-700 dark:text-slate-200 block">
              {searchData.flightClass}
            </span>
          </div>
        </div>

        {/* Action Button */}
        <Link to="/">
          <button className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 px-5 py-2.5 rounded-xl text-sm font-bold transition-all active:scale-95">
            <Settings2 className="w-4 h-4" />
            Modify Search
          </button>
        </Link>
      </div>

      {/* SEGMENTS TABLE */}
      <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                <th className="px-6 py-4 text-left text-[11px] uppercase font-black text-slate-400 tracking-widest">
                  Flight
                </th>
                <th className="px-6 py-4 text-left text-[11px] uppercase font-black text-slate-400 tracking-widest">
                  Departure
                </th>
                <th className="px-6 py-4 text-center"></th>
                <th className="px-6 py-4 text-left text-[11px] uppercase font-black text-slate-400 tracking-widest">
                  Arrival
                </th>
                <th className="px-6 py-4 text-left text-[11px] uppercase font-black text-slate-400 tracking-widest">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {flights.map((flight: any, index: number) => (
                <motion.tr
                  key={index}
                  variants={itemVariants}
                  className="group border-b border-slate-50 dark:border-slate-900 last:border-0 hover:bg-slate-50/30 dark:hover:bg-slate-900/30 transition-colors"
                >
                  {/* SL NO */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 text-xs font-black">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <PlaneTakeoff className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block" />
                    </div>
                  </td>

                  {/* DEPARTURE */}
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="text-base font-black text-slate-800 dark:text-white uppercase leading-none">
                        {flight.fromDest?.iata_code || "---"}
                      </span>
                      <span className="text-[11px] text-slate-500 mt-1 truncate max-w-[120px] font-medium">
                        {flight.fromDest?.city_name}
                      </span>
                    </div>
                  </td>

                  {/* CONNECTOR ICON */}
                  <td className="px-4 py-5 text-center">
                    <div className="flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full border border-slate-100 dark:border-slate-800 flex items-center justify-center bg-white dark:bg-slate-900 group-hover:border-primary/50 group-hover:shadow-sm transition-all">
                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-primary" />
                      </div>
                    </div>
                  </td>

                  {/* ARRIVAL */}
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="text-base font-black text-slate-800 dark:text-white uppercase leading-none">
                        {flight.toDest?.iata_code || "---"}
                      </span>
                      <span className="text-[11px] text-slate-500 mt-1 truncate max-w-[120px] font-medium">
                        {flight.toDest?.city_name}
                      </span>
                    </div>
                  </td>

                  {/* DATE */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                      <Calendar className="w-4 h-4 text-primary/60" />
                      <span className="text-sm font-bold">
                        {formatDate(flight.departureDate)}
                      </span>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* FOOTER INFO */}
        <div className="bg-slate-50 dark:bg-slate-900/30 px-6 py-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-primary" />
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              Journey details for {flights[0]?.fromDest?.city_name} to{" "}
              {flights[flights.length - 1]?.toDest?.city_name}
            </p>
          </div>
          <span className="text-[10px] font-black text-primary/50 uppercase">
            {flights.length} Segments
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default FlightDetailSearch;
