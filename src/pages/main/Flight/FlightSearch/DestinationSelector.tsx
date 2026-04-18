/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo } from "react";
import {
  ArrowRightLeft,
  Plus,
  X,
  Calendar as CalendarIcon,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { format, parseISO } from "date-fns";
import { cn } from "@/lib/utils";

import type { RootState } from "@/redux/store";
import type { SearchDests } from "@/types/flight/flightHome.types";

import {
  setSearchField,
  swapDestinations,
  updateSegment,
  addSegment as addSegmentAction,
  removeSegment as removeSegmentAction,
} from "@/redux/features/flightSearchSlice";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

const DestinationSelector = ({ searchDests }: { searchDests: SearchDests[] }) => {
  const dispatch = useDispatch();
  const searchData = useSelector((state: RootState) => state.flightSearch);
  const { tripType, segments } = searchData;
  const isMultiWay = tripType === "multi-way";

  const [openStates, setOpenStates] = useState<Record<string, boolean>>({});

  const toggleOpen = (index: number, type: "from" | "to", isOpen: boolean) => {
    setOpenStates((prev) => ({ ...prev, [`${index}-${type}`]: isOpen }));
  };

  const handleUpdateSegment = (index: number, updates: any) => {
    const reduxSegmentData: any = { ...updates };
    if (updates.date) {
      reduxSegmentData.departureDate = updates.date;
      delete reduxSegmentData.date;
    }
    dispatch(updateSegment({ index, data: reduxSegmentData }));

    // Autofill & Cascade logic
    if (updates.toDest && index < segments.length - 1) {
      dispatch(updateSegment({ index: index + 1, data: { fromDest: updates.toDest } }));
    }
    if (updates.date) {
      const newDateObj = parseISO(updates.date);
      for (let i = index + 1; i < segments.length; i++) {
        const subDate = parseISO(segments[i].departureDate);
        if (newDateObj > subDate) {
          dispatch(updateSegment({ index: i, data: { departureDate: updates.date } }));
        }
      }
    }
    if (index === 0) {
      const rootPayload: any = { ...updates };
      if (updates.date) rootPayload.departureDate = updates.date;
      dispatch(setSearchField(rootPayload));
    }
  };

  const renderCityPicker = (index: number, type: "from" | "to", currentDest: SearchDests | null) => (
    <Popover 
      open={openStates[`${index}-${type}`]} 
      onOpenChange={(val) => toggleOpen(index, type, val)}
    >
      <PopoverTrigger asChild>
        <div
          className={cn(
            "flex-1 w-full border rounded-lg cursor-pointer bg-background min-h-18 flex items-center transition-all px-4 py-2",
            openStates[`${index}-${type}`] 
              ? "border-primary ring-1 ring-primary" 
              : "border-input hover:border-primary"
          )}
        >
          <div className="flex items-center gap-3 w-full">
            <span className="text-2xl font-bold w-12 text-center text-foreground">
              {currentDest?.iata_code || "---"}
            </span>
            <div className="flex flex-col truncate border-l pl-3 border-border">
              <span className="text-sm font-bold truncate text-foreground">
                {currentDest?.city_name || (type === "from" ? "From where?" : "To where?")}
              </span>
              <span className="text-xs text-muted-foreground truncate">
                {currentDest?.name || (type === "from" ? "Departure Airport" : "Arrival Airport")}
              </span>
            </div>
          </div>
        </div>
      </PopoverTrigger>
      
      <PopoverContent className="p-0 w-[80vw] sm:w-100 md:w-112.5 shadow-2xl border-border" align="start" sideOffset={8}>
        <Command className="bg-popover">
          <div className="flex items-center border-b border-border">
            <CommandInput 
                placeholder={type === "from" ? "Departure city..." : "Arrival city..."} 
                className="h-12 border-none focus:ring-0 bg-transparent" 
            />
          </div>
          <CommandList className="max-h-72">
            <CommandEmpty className="p-4 text-sm text-muted-foreground">No airport found.</CommandEmpty>
            <CommandGroup>
              {searchDests.map((dest) => (
                <CommandItem
                  key={dest.id}
                  value={`${dest.city_name} ${dest.iata_code} ${dest.name}`}
                  onSelect={() => {
                    handleUpdateSegment(index, { [type === "from" ? "fromDest" : "toDest"]: dest });
                    toggleOpen(index, type, false);
                  }}
                  className="flex flex-col items-start p-3 cursor-pointer aria-selected:bg-accent aria-selected:text-accent-foreground"
                >
                  <div className="font-bold text-sm">{dest.city_name} ({dest.iata_code})</div>
                  <div className="text-[11px] text-muted-foreground leading-tight">{dest.name}</div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );

  const renderList = useMemo(() => isMultiWay ? segments : [{ fromDest: searchData.fromDest, toDest: searchData.toDest, departureDate: searchData.departureDate }], [isMultiWay, segments, searchData]);

  return (
    <div className="flex flex-col w-full gap-4">
      {renderList.map((segment, index) => (
        <div key={index} className="flex flex-col lg:flex-row w-full gap-2 items-end lg:items-center">
          
          {renderCityPicker(index, "from", segment.fromDest)}

          <button 
            type="button"
            onClick={() => {
                dispatch(updateSegment({ index, data: { fromDest: segment.toDest, toDest: segment.fromDest } }));
                if (index === 0) dispatch(swapDestinations());
            }} 
            className="hidden lg:flex items-center justify-center bg-background border border-border shadow-sm w-9 h-9 rounded-full text-primary hover:scale-110 transition-all shrink-0 z-10 -mx-3"
          >
            <ArrowRightLeft className="w-4 h-4" />
          </button>

          {renderCityPicker(index, "to", segment.toDest)}

          {/* DATE PICKER */}
          <div className="w-full lg:w-48">
            <Popover>
              <PopoverTrigger asChild>
                <div className="border border-input rounded-lg p-3 bg-background cursor-pointer hover:border-primary min-h-18 flex flex-col justify-center transition-all px-4">
                    <div className="flex items-center gap-2 mb-1 text-xs text-muted-foreground font-medium lowercase">
                      <CalendarIcon className="w-3.5 h-3.5" /> departure
                    </div>
                    <div className="text-sm font-bold text-foreground">
                      {segment.departureDate ? format(parseISO(segment.departureDate), "dd MMM, yy") : "Select Date"}
                    </div>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 border-border" align="end">
                <Calendar
                  mode="single"
                  selected={segment.departureDate ? parseISO(segment.departureDate) : undefined}
                  onSelect={(d) => d && handleUpdateSegment(index, { date: d.toISOString() })}
                  disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))}
                  className="bg-popover"
                />
              </PopoverContent>
            </Popover>
          </div>

          {isMultiWay && renderList.length > 2 && (
            <button 
              type="button"
              onClick={() => dispatch(removeSegmentAction(index))} 
              className="p-2 text-muted-foreground hover:text-destructive transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      ))}

      {isMultiWay && segments.length < 5 && (
        <button 
          type="button"
          onClick={() => dispatch(addSegmentAction())} 
          className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-primary hover:bg-accent rounded-lg transition-all w-fit border border-dashed border-border"
        >
          <Plus className="w-4 h-4" /> Add More Flight
        </button>
      )}
    </div>
  );
};

export default DestinationSelector;