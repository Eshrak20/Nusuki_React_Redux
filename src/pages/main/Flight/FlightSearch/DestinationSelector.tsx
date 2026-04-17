import { useState, useRef, useMemo, useEffect } from "react";
import { ArrowRightLeft, Search, Plus, X, CalendarIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "@/redux/store";
import type { SearchDests } from "@/types/flight/flightHome.types";

import { setSearchDest } from "@/redux/features/flightFilterSlice";
import {
  setSearchField,
  swapDestinations,
} from "@/redux/features/flightSearchSlice";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format, parseISO } from "date-fns";

interface DestinationSelectorProps {
  searchDests: SearchDests[];
}

interface FlightSegment {
  id: string;
  fromDest: SearchDests | null;
  toDest: SearchDests | null;
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
  const [multiSegments, setMultiSegments] = useState<FlightSegment[]>([
    { id: "1", fromDest: searchData.fromDest, toDest: searchData.toDest },
    { id: "2", fromDest: null, toDest: null },
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

  // Keep first multi-way segment synced if Redux state changes externally
  useEffect(() => {
    if (isMultiWay) {
      setMultiSegments((prev) => {
        const updated = [...prev];
        updated[0] = {
          ...updated[0],
          fromDest: searchData.fromDest,
          toDest: searchData.toDest,
        };
        return updated;
      });
    }
  }, [searchData.fromDest, searchData.toDest, isMultiWay]);

  // Filter destinations based on search keyword
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

  const handleSelectDest = (
    index: number,
    type: "from" | "to",
    dest: SearchDests,
  ) => {
    if (isMultiWay) {
      const updatedSegments = [...multiSegments];
      updatedSegments[index][type === "from" ? "fromDest" : "toDest"] = dest;

      // Smart autofill: If user selects a "To" destination, auto-fill the next segment's "From"
      if (
        type === "to" &&
        index < updatedSegments.length - 1 &&
        !updatedSegments[index + 1].fromDest
      ) {
        updatedSegments[index + 1].fromDest = dest;
      }

      setMultiSegments(updatedSegments);
    }

    // Always sync the first row back to Redux for global consistency
    if (index === 0 || !isMultiWay) {
      dispatch(
        setSearchField({ [type === "from" ? "fromDest" : "toDest"]: dest }),
      );
    }

    setActiveDropdown(null);
    dispatch(setSearchDest(""));
  };

  const handleSwap = (index: number) => {
    if (isMultiWay) {
      const updatedSegments = [...multiSegments];
      const temp = updatedSegments[index].fromDest;
      updatedSegments[index].fromDest = updatedSegments[index].toDest;
      updatedSegments[index].toDest = temp;
      setMultiSegments(updatedSegments);
    }

    if (index === 0 || !isMultiWay) {
      dispatch(swapDestinations());
    }
  };

  const addSegment = () => {
    if (multiSegments.length < 5) {
      // Auto-fill new segment's origin with previous segment's destination
      const lastDest = multiSegments[multiSegments.length - 1].toDest;
      setMultiSegments([
        ...multiSegments,
        { id: Date.now().toString(), fromDest: lastDest, toDest: null },
      ]);
    }
  };

  const removeSegment = (idToRemove: string) => {
    if (multiSegments.length > 2) {
      setMultiSegments(multiSegments.filter((s) => s.id !== idToRemove));
    }
  };

  // Determine what to display based on tripType
  const displaySegments = isMultiWay
    ? multiSegments
    : [{ id: "0", fromDest: searchData.fromDest, toDest: searchData.toDest }];

  return (
    <div className="flex flex-col w-full gap-3" ref={containerRef}>
      {displaySegments.map((segment, index) => (
        <div
          key={segment.id}
          className="flex flex-col md:flex-row w-full gap-2 relative items-center"
        >
          {/* FROM BOX */}
          <div
            className={`flex-1 w-full border rounded-lg cursor-pointer bg-white dark:bg-slate-950 min-h-[72px] flex items-center relative ${
              activeDropdown?.index === index && activeDropdown?.type === "from"
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
                    {segment.fromDest?.name || "Any Airport"}
                  </span>
                </div>
              </div>
            )}

            {/* FROM DROPDOWN */}
            {activeDropdown?.index === index &&
              activeDropdown?.type === "from" && (
                <div className="absolute top-[105%] left-0 w-full md:w-[120%] bg-white dark:bg-slate-900 border rounded-lg shadow-2xl z-[120] max-h-72 overflow-y-auto">
                  {filteredDests.map((dest, idx) => (
                    <div
                      key={idx}
                      className="p-3 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer border-b last:border-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectDest(index, "from", dest);
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

          {/* INLINE SWAP BUTTON */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleSwap(index);
            }}
            className="hidden md:flex items-center justify-center bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-sm w-10 h-10 rounded-full text-slate-500 hover:text-primary hover:border-primary transition-colors shrink-0 z-10"
          >
            <ArrowRightLeft className="w-4 h-4" />
          </button>

          {/* MOBILE SWAP BUTTON */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleSwap(index);
            }}
            className="md:hidden absolute right-4 top-1/2 -translate-y-1/2 bg-white dark:bg-slate-950 border border-slate-200 shadow-md p-2 rounded-full text-primary z-10"
          >
            <ArrowRightLeft className="w-3 h-3 rotate-90" />
          </button>

          {/* TO BOX */}
          <div
            className={`flex-1 w-full border rounded-lg cursor-pointer bg-white dark:bg-slate-950 min-h-[72px] flex items-center relative ${
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
                    {segment.toDest?.name || "Any Airport"}
                  </span>
                </div>
              </div>
            )}

            {/* TO DROPDOWN */}
            {activeDropdown?.index === index &&
              activeDropdown?.type === "to" && (
                <div className="absolute top-[105%] right-0 w-full md:w-[120%] bg-white dark:bg-slate-900 border rounded-lg shadow-2xl z-[120] max-h-72 overflow-y-auto">
                  {filteredDests.map((dest, idx) => (
                    <div
                      key={idx}
                      className="p-3 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer border-b"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectDest(index, "to", dest);
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

          {/* CROSS BUTTON (Only for Multi-Way when > 2 segments) */}
          {isMultiWay && (
            <div className="flex items-center justify-center shrink-0 w-8">
              {multiSegments.length > 2 && (
                <button
                  onClick={() => removeSegment(segment.id)}
                  className="text-slate-300 hover:text-red-500 transition-colors p-1"
                  title="Remove segment"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          )}
        </div>
      ))}
      {/* DATE PICKER (Integrated for Multi-City) */}
      <div className="w-full lg:w-48">
        <Popover>
          <PopoverTrigger asChild>
            <div className="border rounded-lg p-3 bg-white dark:bg-slate-950 cursor-pointer hover:border-primary min-h-[72px]">
              <div className="flex items-center gap-2 mb-1 text-xs text-slate-500">
                <CalendarIcon className="w-3.5 h-3.5" /> Departure Date
              </div>
              <div className="text-sm font-semibold">
                {format(parseISO(segment.date), "dd MMM, yy")}
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={parseISO(segment.date)}
              onSelect={(d) =>
                d && handleUpdateSegment(index, { date: d.toISOString() })
              }
            />
          </PopoverContent>
        </Popover>
      </div>
      {/* ADD MORE FLIGHT BUTTON */}
      {isMultiWay && multiSegments.length < 5 && (
        <div className="flex justify-start mt-1">
          <button
            onClick={addSegment}
            className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-md transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add More Flight
          </button>
        </div>
      )}
    </div>
  );
};

export default DestinationSelector;
