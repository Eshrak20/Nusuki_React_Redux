import { useState, useRef, useMemo, useEffect } from "react";
import {
  ArrowRightLeft,
  Search,
  Plus,
  X,
  Calendar as CalendarIcon,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { format, parseISO } from "date-fns";

import type { RootState } from "@/redux/store";
import type { SearchDests } from "@/types/flight/flightHome.types";

import { setSearchDest } from "@/redux/features/flightFilterSlice";
import {
  setSearchField,
  swapDestinations,
} from "@/redux/features/flightSearchSlice";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

interface DestinationSelectorProps {
  searchDests: SearchDests[];
}

interface FlightSegment {
  id: string;
  fromDest: SearchDests | null;
  toDest: SearchDests | null;
  date: string;
}

const DestinationSelector = ({ searchDests }: DestinationSelectorProps) => {
  const dispatch = useDispatch();

  const searchKeyword = useSelector(
    (state: RootState) => state.flightFilter.searchDest,
  );
  const searchData = useSelector((state: RootState) => state.flightSearch);
  const tripType = useSelector(
    (state: RootState) => state.flightSearch.tripType,
  );

  const isMultiWay = tripType === "multi-way";

  // Local state for Multi-way segments
  const [multiSegments, setMultiSegments] = useState<FlightSegment[]>(() => [
    {
      id: "1",
      fromDest: searchData.fromDest,
      toDest: searchData.toDest,
      date: searchData.departureDate,
    },
    { id: "2", fromDest: null, toDest: null, date: searchData.departureDate },
  ]);

  const [activeDropdown, setActiveDropdown] = useState<{
    index: number;
    type: "from" | "to";
  } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
        dispatch(setSearchDest(""));
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dispatch]);

  const filteredDests = useMemo(() => {
    const query = (searchKeyword || "").toLowerCase().trim();
    if (!query) return searchDests;
    return searchDests.filter(
      (d) =>
        d.name?.toLowerCase().includes(query) ||
        d.city_name?.toLowerCase().includes(query) ||
        d.iata_code?.toLowerCase().includes(query),
    );
  }, [searchKeyword, searchDests]);

  const handleUpdateSegment = (
    index: number,
    updates: Partial<FlightSegment>,
  ) => {
    const updated = [...multiSegments];
    updated[index] = { ...updated[index], ...updates };

    // 1. Smart autofill next origin
    if (
      updates.toDest &&
      index < updated.length - 1 &&
      !updated[index + 1].fromDest
    ) {
      updated[index + 1].fromDest = updates.toDest;
    }

    // 2. SMART DATE CASCADE (Fix for all subsequent dates)
    // If a user changes a date, ensure ALL following flights are pushed forward to match
    if (updates.date) {
      const newDateObj = parseISO(updates.date);
      for (let i = index + 1; i < updated.length; i++) {
        const subsequentDateObj = parseISO(updated[i].date);
        if (newDateObj > subsequentDateObj) {
          updated[i] = { ...updated[i], date: updates.date };
        }
      }
    }

    setMultiSegments(updated);

    // Sync back to Redux if it's the primary segment or one-way
    if (index === 0 || !isMultiWay) {
      const reduxPayload: Record<string, unknown> = { ...updates };
      // Map local 'date' field to Redux 'departureDate' field
      if (updates.date) {
        reduxPayload.departureDate = updates.date;
      }
      dispatch(setSearchField(reduxPayload));
    }
  };

  const handleSwap = (index: number) => {
    const updated = [...multiSegments];
    const temp = updated[index].fromDest;
    updated[index].fromDest = updated[index].toDest;
    updated[index].toDest = temp;
    setMultiSegments(updated);

    if (index === 0 || !isMultiWay) dispatch(swapDestinations());
  };

  const addSegment = () => {
    if (multiSegments.length < 5) {
      const lastDest = multiSegments[multiSegments.length - 1].toDest;
      const lastDate = multiSegments[multiSegments.length - 1].date; // Inherit previous date
      setMultiSegments([
        ...multiSegments,
        {
          id: Date.now().toString(),
          fromDest: lastDest,
          toDest: null,
          date: lastDate, 
        },
      ]);
    }
  };

  const removeSegment = (idToRemove: string) => {
    if (multiSegments.length > 2) {
      setMultiSegments(multiSegments.filter((s) => s.id !== idToRemove));
    }
  };

  // OPTIMIZATION: Derived State for First Segment
  const displaySegments = useMemo(() => {
    if (!isMultiWay) {
      return [
        {
          id: "0",
          fromDest: searchData.fromDest,
          toDest: searchData.toDest,
          date: searchData.departureDate,
        },
      ];
    }

    return multiSegments.map((segment, index) => {
      if (index === 0) {
        return {
          ...segment,
          fromDest: searchData.fromDest,
          toDest: searchData.toDest,
        };
      }
      return segment;
    });
  }, [
    isMultiWay,
    multiSegments,
    searchData.fromDest,
    searchData.toDest,
    searchData.departureDate,
  ]);

  return (
    <div className="flex flex-col w-full gap-4" ref={containerRef}>
      {displaySegments.map((segment, index) => (
        <div
          key={segment.id}
          className="flex flex-col lg:flex-row w-full gap-2 items-end lg:items-center"
        >
          {/* FROM BOX */}
          <div className="flex-1 w-full relative">
            <div
              className={`border rounded-lg cursor-pointer bg-white dark:bg-slate-950 min-h-18 flex items-center transition-all ${
                activeDropdown?.index === index &&
                activeDropdown?.type === "from"
                  ? "border-primary ring-1 ring-primary"
                  : "border-slate-300 dark:border-slate-700 hover:border-primary"
              }`}
              onClick={() => setActiveDropdown({ index, type: "from" })}
            >
              {activeDropdown?.index === index &&
              activeDropdown?.type === "from" ? (
                <div className="flex items-center w-full px-4">
                  <Search className="w-5 h-5 text-slate-400 mr-2 shrink-0" />
                  <input
                    autoFocus
                    className="flex-1 bg-transparent outline-none text-lg font-medium"
                    placeholder="From where?"
                    value={searchKeyword}
                    onChange={(e) => dispatch(setSearchDest(e.target.value))}
                  />
                </div>
              ) : (
                <div className="flex items-center gap-3 p-3 px-4 w-full">
                  <span className="text-2xl font-bold w-12 text-center">
                    {segment.fromDest?.iata_code || "---"}
                  </span>
                  <div className="flex flex-col truncate border-l pl-3 border-slate-200 dark:border-slate-700">
                    <span className="text-sm font-semibold truncate">
                      {segment.fromDest?.city_name || "Select Origin"}
                    </span>
                    <span className="text-xs text-slate-500 truncate">
                      {segment.fromDest?.name || "Departure Airport"}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* FROM DROPDOWN */}
            {activeDropdown?.index === index &&
              activeDropdown?.type === "from" && (
                <div className="absolute top-[105%] left-0 w-full lg:w-[130%] bg-white dark:bg-slate-900 border rounded-lg shadow-2xl z-120 max-h-72 overflow-y-auto">
                  {filteredDests.map((dest, idx) => (
                    <div
                      key={idx}
                      className="p-3 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer border-b last:border-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUpdateSegment(index, { fromDest: dest });
                        setActiveDropdown(null);
                        dispatch(setSearchDest(""));
                      }}
                    >
                      <div className="font-bold text-sm">
                        {dest.city_name} ({dest.iata_code})
                      </div>
                      <div className="text-[10px] text-slate-500">
                        {dest.name}
                      </div>
                    </div>
                  ))}
                </div>
              )}
          </div>

          {/* SWAP BUTTON */}
          <button
            onClick={() => handleSwap(index)}
            className="hidden lg:flex items-center justify-center bg-white dark:bg-slate-900 border border-slate-200 shadow-sm w-9 h-9 rounded-full text-primary hover:scale-110 transition-all shrink-0 z-10 -mx-3"
          >
            <ArrowRightLeft className="w-4 h-4" />
          </button>

          {/* TO BOX */}
          <div className="flex-1 w-full relative">
            <div
              className={`border rounded-lg cursor-pointer bg-white dark:bg-slate-950 min-h-18 flex items-center transition-all ${
                activeDropdown?.index === index && activeDropdown?.type === "to"
                  ? "border-primary ring-1 ring-primary"
                  : "border-slate-300 dark:border-slate-700 hover:border-primary"
              }`}
              onClick={() => setActiveDropdown({ index, type: "to" })}
            >
              {activeDropdown?.index === index &&
              activeDropdown?.type === "to" ? (
                <div className="flex items-center w-full px-4">
                  <Search className="w-5 h-5 text-slate-400 mr-2 shrink-0" />
                  <input
                    autoFocus
                    className="flex-1 bg-transparent outline-none text-lg font-medium"
                    placeholder="To where?"
                    value={searchKeyword}
                    onChange={(e) => dispatch(setSearchDest(e.target.value))}
                  />
                </div>
              ) : (
                <div className="flex items-center gap-3 p-3 px-4 w-full">
                  <span className="text-2xl font-bold w-12 text-center">
                    {segment.toDest?.iata_code || "---"}
                  </span>
                  <div className="flex flex-col truncate border-l pl-3 border-slate-200 dark:border-slate-700">
                    <span className="text-sm font-semibold truncate">
                      {segment.toDest?.city_name || "Select Destination"}
                    </span>
                    <span className="text-xs text-slate-500 truncate">
                      {segment.toDest?.name || "Arrival Airport"}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* TO DROPDOWN */}
            {activeDropdown?.index === index &&
              activeDropdown?.type === "to" && (
                <div className="absolute top-[105%] right-0 w-full lg:w-[130%] bg-white dark:bg-slate-900 border rounded-lg shadow-2xl z-120 max-h-72 overflow-y-auto">
                  {filteredDests.map((dest, idx) => (
                    <div
                      key={idx}
                      className="p-3 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer border-b last:border-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUpdateSegment(index, { toDest: dest });
                        setActiveDropdown(null);
                        dispatch(setSearchDest(""));
                      }}
                    >
                      <div className="font-bold text-sm">
                        {dest.city_name} ({dest.iata_code})
                      </div>
                      <div className="text-[10px] text-slate-500">
                        {dest.name}
                      </div>
                    </div>
                  ))}
                </div>
              )}
          </div>
          
          {/* DATE PICKER (Per Segment) */}
          {isMultiWay && (
            <div className="w-full lg:w-48">
              <Popover>
                <PopoverTrigger asChild>
                  <div className="border border-slate-300 dark:border-slate-700 rounded-lg p-3 bg-white dark:bg-slate-950 cursor-pointer hover:border-primary min-h-18 flex flex-col justify-center transition-all">
                    <div className="flex items-center gap-2 mb-1 text-xs text-slate-500 font-medium">
                      <CalendarIcon className="w-3.5 h-3.5" /> Departure
                    </div>
                    <div className="text-sm font-bold">
                      {segment.date
                        ? format(parseISO(segment.date), "dd MMM, yy")
                        : "Select Date"}
                    </div>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    mode="single"
                    selected={segment.date ? parseISO(segment.date) : undefined}
                    onSelect={(d) => {
                      if (d) handleUpdateSegment(index, { date: d.toISOString() });
                    }}
                    disabled={(date) => {
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);

                      // Rule 1: Cannot select a date in the past
                      if (date < today) return true;

                      // Rule 2: Cannot select a date before the previous flight
                      if (index > 0 && multiSegments[index - 1].date) {
                        const prevDate = parseISO(multiSegments[index - 1].date);
                        return date < prevDate;
                      }

                      return false;
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
          )}

          {/* REMOVE BUTTON */}
          {isMultiWay && (
            <div className="flex items-center justify-center shrink-0 lg:w-10">
              {multiSegments.length > 2 && (
                <button
                  onClick={() => removeSegment(segment.id)}
                  className="text-slate-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-950/20"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          )}
        </div>
      ))}

      {/* ADD FLIGHT BUTTON */}
      {isMultiWay && multiSegments.length < 5 && (
        <button
          onClick={addSegment}
          className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-destructive hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-lg transition-all w-fit border border-dashed border-blue-200"
        >
          <Plus className="w-4 h-4" /> Add More Flight
        </button>
      )}
    </div>
  );
};

export default DestinationSelector;