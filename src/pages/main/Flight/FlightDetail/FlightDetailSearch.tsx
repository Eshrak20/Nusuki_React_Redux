import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { AnimatePresence, motion } from "framer-motion";
import {
  Users,
  PlaneTakeoff,
  MapPin,
  Calendar,
  Settings2,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Route,
  PlaneLanding,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import type { SearchDests } from "@/types/flight/flightHome.types";
import { mapCabinCodeToLabel } from "@/lib/utils";

type FlightDisplayItem = {
  fromDest: SearchDests | null;
  toDest: SearchDests | null;
  departureDate: string;
};

const FlightDetailSearch = () => {
  const searchData = useSelector((state: RootState) => state.flightSearch);
  const [open, setOpen] = useState(false);

  const flights = useMemo<FlightDisplayItem[]>(() => {
    if (searchData.tripType === "multi_way") {
      return searchData.segments;
    }

    return [
      {
        fromDest: searchData.fromDest,
        toDest: searchData.toDest,
        departureDate: searchData.departureDate,
      },
    ];
  }, [searchData]);

  const getTravelerSummary = () => {
    const { travelers } = searchData;
    if (!travelers) return "No travelers selected";

    const parts: string[] = [];

    if (travelers.adults > 0) {
      parts.push(`${travelers.adults} Adult${travelers.adults > 1 ? "s" : ""}`);
    }

    const childrenCount = Array.isArray(travelers.children)
      ? travelers.children.length
      : 0;

    if (childrenCount > 0) {
      parts.push(`${childrenCount} Child${childrenCount > 1 ? "ren" : ""}`);
    }

    if (travelers.infants > 0) {
      parts.push(
        `${travelers.infants} Infant${travelers.infants > 1 ? "s" : ""}`,
      );
    }

    return parts.join(", ");
  };

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

  const journeyLabel = useMemo(() => {
    const fromCity = flights[0]?.fromDest?.city_name || "Unknown";
    const toCity = flights[flights.length - 1]?.toDest?.city_name || "Unknown";
    return `${fromCity} to ${toCity}`;
  }, [flights]);

  const containerVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.35,
        staggerChildren: 0.06,
      },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-full space-y-4"
    >
      <motion.div
        variants={rowVariants}
        className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm"
      >
        <div className="flex flex-col gap-4 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <div className="rounded-2xl bg-primary/10 px-4 py-3">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-primary/70">
                Trip Type
              </p>
              <p className="mt-1 text-sm font-bold capitalize text-primary">
                {searchData.tripType?.replace("_", " ")}
              </p>
            </div>

            <div className="hidden h-10 w-px bg-border sm:block" />

            <div className="min-w-40">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-muted-foreground">
                Travelers
              </p>
              <div className="mt-1 flex items-start gap-2">
                <Users className="mt-0.5 h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm font-bold text-foreground">
                    {totalTravelers}{" "}
                    {totalTravelers > 1 ? "Travelers" : "Traveler"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {getTravelerSummary()}
                  </p>
                </div>
              </div>
            </div>

            <div className="hidden h-10 w-px bg-border sm:block" />

            <div className="min-w-30">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-muted-foreground">
                Cabin Class
              </p>
              <p className="mt-1 text-sm font-bold text-foreground">
                {mapCabinCodeToLabel(searchData.cabin)}
              </p>
            </div>

            <div className="hidden h-10 w-px bg-border sm:block" />

            <div className="min-w-45">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-muted-foreground">
                Journey
              </p>
              <div className="mt-1 flex items-center gap-2">
                <Route className="h-4 w-4 text-primary" />
                <p className="text-sm font-bold text-foreground">
                  {journeyLabel}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="outline"
              onClick={() => setOpen((prev) => !prev)}
              className="group rounded-xl border-border bg-background"
            >
              {open ? "Hide Journey Details" : "Show Journey Details"}
              {open ? (
                <ChevronUp className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
              ) : (
                <ChevronDown className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5" />
              )}
            </Button>

            <Link to="/">
              <Button variant="secondary" className="rounded-xl">
                <Settings2 className="mr-2 h-4 w-4" />
                Modify Search
              </Button>
            </Link>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="journey-panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: "easeInOut" }}
              className="overflow-hidden border-t"
            >
              <div className="bg-muted/20">
                <div className="hidden overflow-x-auto md:block">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b bg-muted/30">
                        <th className="px-6 py-4 text-left text-[11px] font-black uppercase tracking-[0.18em] text-muted-foreground">
                          Flight
                        </th>
                        <th className="px-6 py-4 text-left text-[11px] font-black uppercase tracking-[0.18em] text-muted-foreground">
                          Departure
                        </th>
                        <th className="px-4 py-4 text-center text-[11px] font-black uppercase tracking-[0.18em] text-muted-foreground">
                          Route
                        </th>
                        <th className="px-6 py-4 text-left text-[11px] font-black uppercase tracking-[0.18em] text-muted-foreground">
                          Arrival
                        </th>
                        <th className="px-6 py-4 text-left text-[11px] font-black uppercase tracking-[0.18em] text-muted-foreground">
                          Date
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {flights.map((flight, index) => (
                        <motion.tr
                          key={index}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.22, delay: index * 0.05 }}
                          className="group border-b last:border-0 hover:bg-background/80"
                        >
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-3">
                              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-xs font-extrabold text-primary">
                                {String(index + 1).padStart(2, "0")}
                              </span>
                              <PlaneTakeoff className="h-4 w-4 text-primary transition-transform duration-200 group-hover:-translate-y-0.5" />
                            </div>
                          </td>

                          <td className="px-6 py-5">
                            <div className="space-y-1">
                              <p className="text-lg font-extrabold uppercase leading-none text-foreground">
                                {flight.fromDest?.iata_code || "---"}
                              </p>
                              <p className="text-xs font-medium text-muted-foreground">
                                {flight.fromDest?.city_name}
                              </p>
                            </div>
                          </td>

                          <td className="px-4 py-5">
                            <div className="flex items-center justify-center">
                              <div className="flex h-10 w-10 items-center justify-center rounded-full border bg-background shadow-sm transition-all duration-200 group-hover:scale-105 group-hover:border-primary/40">
                                <ChevronRight className="h-4 w-4 text-primary" />
                              </div>
                            </div>
                          </td>

                          <td className="px-6 py-5">
                            <div className="space-y-1">
                              <p className="text-lg font-extrabold uppercase leading-none text-foreground">
                                {flight.toDest?.iata_code || "---"}
                              </p>
                              <p className="text-xs font-medium text-muted-foreground">
                                {flight.toDest?.city_name}
                              </p>
                            </div>
                          </td>

                          <td className="px-6 py-5">
                            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                              <Calendar className="h-4 w-4 text-primary/70" />
                              {formatDate(flight.departureDate)}
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="space-y-3 p-4 md:hidden">
                  {flights.map((flight, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.22, delay: index * 0.05 }}
                      className="rounded-2xl border bg-card p-4 shadow-sm"
                    >
                      <div className="mb-3 flex items-center justify-between">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-xs font-extrabold text-primary">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                          <Calendar className="h-4 w-4 text-primary/70" />
                          {formatDate(flight.departureDate)}
                        </div>
                      </div>

                      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                        <div>
                          <p className="text-lg font-extrabold uppercase text-foreground">
                            {flight.fromDest?.iata_code || "---"}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {flight.fromDest?.city_name}
                          </p>
                        </div>

                        <div className="flex flex-col items-center gap-1">
                          <PlaneTakeoff className="h-4 w-4 text-primary" />
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          <PlaneLanding className="h-4 w-4 text-primary" />
                        </div>

                        <div className="text-right">
                          <p className="text-lg font-extrabold uppercase text-foreground">
                            {flight.toDest?.iata_code || "---"}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {flight.toDest?.city_name}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="flex items-center justify-between border-t bg-muted/30 px-4 py-3 sm:px-6">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground sm:text-[11px]">
                      Journey details for {journeyLabel}
                    </p>
                  </div>

                  <span className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-primary/70 sm:text-[11px]">
                    {flights.length} Segment{flights.length > 1 ? "s" : ""}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default FlightDetailSearch;
