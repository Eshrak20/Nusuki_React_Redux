import { useEffect, useMemo, useState, useRef } from "react";
import { addDays, format, startOfMonth } from "date-fns";
import { Loader2, MapPin, Search, Compass, SearchIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";

import {
  useLazyGetPlaceAutoCompleteQuery,
  useSearchHotelsMutation,
} from "@/redux/api/hotelApi/hotelApi";

import type { HotelRoom, HotelSearchPayload } from "@/types/hotel/types.hotel";

import { DateField } from "./DateField";
import { GuestsField } from "./GuestsField";
import { SearchField } from "./SearchField";

export interface ExtendedHotelRoom extends HotelRoom {
  child_ages?: number[];
}

type PlaceSuggestion = {
  id: string;
  name: string;
  fullAddress: string;
  countryCode: string;
  searchHint: {
    latitude: number;
    longitude: number;
    country_code: string;
  };
};

const DEFAULT_PLACE: PlaceSuggestion = {
  id: "default-dhaka",
  name: "Dhaka",
  fullAddress: "Dhaka, Bangladesh",
  countryCode: "BD",
  searchHint: {
    latitude: 23.8103,
    longitude: 90.4125,
    country_code: "BD",
  },
};

// Default popular places to show immediately when the dropdown is clicked
const POPULAR_PLACES: PlaceSuggestion[] = [
  DEFAULT_PLACE,
  {
    id: "default-cox",
    name: "Cox's Bazar",
    fullAddress: "Cox's Bazar, Chittagong, Bangladesh",
    countryCode: "BD",
    searchHint: { latitude: 21.4272, longitude: 92.0058, country_code: "BD" },
  },
  {
    id: "default-sylhet",
    name: "Sylhet",
    fullAddress: "Sylhet, Bangladesh",
    countryCode: "BD",
    searchHint: { latitude: 24.8949, longitude: 91.8687, country_code: "BD" },
  },
  {
    id: "default-chittagong",
    name: "Chittagong",
    fullAddress: "Chittagong, Bangladesh",
    countryCode: "BD",
    searchHint: { latitude: 22.3569, longitude: 91.7832, country_code: "BD" },
  },
];

const DEFAULT_CURRENCY = "BDT";
const AUTOCOMPLETE_LIMIT = 20;

export default function HotelSearch() {
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [searchHotels, { isLoading }] = useSearchHotelsMutation();
  const [triggerAutocomplete, { isFetching: isSearchingDest }] = useLazyGetPlaceAutoCompleteQuery();

  const defaultCheckIn = useMemo(() => addDays(new Date(), 2), []);
  const defaultCheckOut = useMemo(() => addDays(defaultCheckIn, 2), [defaultCheckIn]);

  const [selectedPlace, setSelectedPlace] = useState<PlaceSuggestion | null>(DEFAULT_PLACE);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>(POPULAR_PLACES);

  const [checkIn, setCheckIn] = useState(defaultCheckIn);
  const [checkOut, setCheckOut] = useState(defaultCheckOut);
  const [checkoutMonth, setCheckoutMonth] = useState(startOfMonth(defaultCheckIn));

  const [radius, setRadius] = useState<string>("50");
  const [openRadius, setOpenRadius] = useState(false);
  const [openDestPopover, setOpenDestPopover] = useState(false);

  const [openPopover, setOpenPopover] = useState<"checkIn" | "checkOut" | "guests" | null>(null);

  const [rooms, setRooms] = useState<ExtendedHotelRoom[]>([
    { adults: 2, children: 0, child_ages: [] },
  ]);

  // Handle live search suggestions with a snappy 150ms debounce
 useEffect(() => {
  const keyword = searchQuery.trim();

  // Fix: Move the immediate state update out of the synchronous execution path
  if (keyword.length === 0) {
    const initialTimer = window.setTimeout(() => {
      setSuggestions(POPULAR_PLACES);
    }, 0); // Executes right after the current render cycle finishes
    
    return () => window.clearTimeout(initialTimer);
  }

  const timer = window.setTimeout(() => {
    triggerAutocomplete({
      keyword,
      limit: AUTOCOMPLETE_LIMIT,
    })
      .unwrap()
      .then((result) => {
        if (result.response && result.response.length > 0) {
          setSuggestions(result.response);
        } else {
          setSuggestions([]);
        }
      })
      .catch((error) => {
        console.error("Place Autocomplete Error:", error);
        setSuggestions([]);
      });
  }, 150);

  return () => window.clearTimeout(timer);
}, [searchQuery, triggerAutocomplete]);

  // Focus the input inside the popover when it opens
  useEffect(() => {
    if (openDestPopover) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [openDestPopover]);

  const handlePlaceSelect = (place: PlaceSuggestion) => {
    setSelectedPlace(place);
    setSearchQuery(""); // Clear search field for next open
    setOpenDestPopover(false);
  };

  const handleCheckInSelect = (date: Date) => {
    setCheckIn(date);
    setCheckoutMonth(startOfMonth(date));
    if (date >= checkOut) {
      setCheckOut(addDays(date, 2));
    }
    setOpenPopover(null);
  };

  const handleSearch = async () => {
    if (!selectedPlace) {
      alert("Please select a destination from the list.");
      return;
    }

    const payload: HotelSearchPayload = {
      check_in: format(checkIn, "yyyy-MM-dd"),
      check_out: format(checkOut, "yyyy-MM-dd"),
      latitude: selectedPlace.searchHint.latitude,
      longitude: selectedPlace.searchHint.longitude,
      country_code: selectedPlace.searchHint.country_code,
      radius: Number(radius),
      uom: "MI",
      currency_code: DEFAULT_CURRENCY,
      rooms,
      page: 1,
      size: 20,
      sort_by: "AverageNightlyRate",
      sort_order: "ASC",
      include_images: true,
    };

    try {
      const result = await searchHotels(payload).unwrap();
      navigate("/hotel/lists", {
        state: {
          hotelResponse: result,
          searchPayload: payload,
        },
      });
    } catch (error) {
      console.error("Hotel Search Error:", error);
    }
  };

  return (
    <section className="relative z-30 w-full">
      <div className="relative mx-auto w-full px-4 md:max-w-4xl lg:max-w-6xl">
        <div className="overflow-visible rounded-sm border border-slate-200 bg-white shadow-xl dark:border-[#272047] dark:bg-[#050018] lg:shadow-2xl">
          <div className="p-4 sm:p-5 md:p-6 lg:p-8">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-[1.25fr_1fr_1fr_1fr_0.8fr_auto] md:gap-3 lg:grid-cols-[1.2fr_1fr_1fr_1fr_0.8fr_auto] lg:gap-4">
              
              {/* Destination Popover Field */}
              <Popover open={openDestPopover} onOpenChange={setOpenDestPopover}>
                <PopoverTrigger asChild>
                  <div className="cursor-pointer">
                    <SearchField
                      label="Destination"
                      icon={<MapPin className="h-5 w-5 text-slate-600 dark:text-[#8B93FF]" />}
                    >
                      <div className="mt-1">
                        <p className="text-sm font-bold text-slate-800 dark:text-white truncate">
                          {selectedPlace ? selectedPlace.name : "Select Destination"}
                        </p>
                        <p className="text-xs text-slate-400 dark:text-slate-500 truncate lines-1">
                          {selectedPlace ? selectedPlace.fullAddress : "Where are you going?"}
                        </p>
                      </div>
                    </SearchField>
                  </div>
                </PopoverTrigger>

                <PopoverContent 
                  className="w-[320px] p-0 border border-slate-200 bg-white shadow-xl dark:border-[#2B2544] dark:bg-[#050018]" 
                  align="start"
                  sideOffset={6}
                >
                  {/* Floating Input Box styled exactly like flight dropdown */}
                  <div className="flex items-center gap-2 border-b border-slate-100 p-3 dark:border-[#2B2544]">
                    <SearchIcon className="h-4 w-4 text-slate-400" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search destination city..."
                      className="w-full bg-transparent text-sm font-medium text-slate-800 outline-none placeholder:text-slate-400 dark:text-white"
                    />
                    {isSearchingDest && (
                      <Loader2 className="h-4 w-4 animate-spin text-primary dark:text-[#8B93FF]" />
                    )}
                  </div>

                  {/* Dropdown Options List */}
                  <div className="max-h-64 overflow-y-auto py-1">
                    {suggestions.length > 0 ? (
                      suggestions.map((place) => (
                        <button
                          key={place.id}
                          type="button"
                          onClick={() => handlePlaceSelect(place)}
                          className="block w-full px-4 py-2.5 text-left transition hover:bg-slate-50 dark:hover:bg-[#151222]"
                        >
                          <p className="text-sm font-bold text-slate-800 dark:text-white">
                            {place.name}
                          </p>
                          <p className="text-xs text-slate-400 dark:text-slate-400 truncate">
                            {place.fullAddress}
                          </p>
                        </button>
                      ))
                    ) : (
                      <div className="px-4 py-6 text-center text-xs text-slate-400">
                        No destinations found
                      </div>
                    )}
                  </div>
                </PopoverContent>
              </Popover>

              <DateField
                label="Check-in"
                date={checkIn}
                open={openPopover === "checkIn"}
                onOpenChange={(open) => setOpenPopover(open ? "checkIn" : null)}
                onSelect={handleCheckInSelect}
              />

              <DateField
                label="Check-out"
                date={checkOut}
                open={openPopover === "checkOut"}
                month={checkoutMonth}
                onMonthChange={setCheckoutMonth}
                disabled={(date) => date < checkIn}
                onOpenChange={(open) => setOpenPopover(open ? "checkOut" : null)}
                onSelect={(date) => {
                  setCheckOut(date);
                  setOpenPopover(null);
                }}
              />

              <GuestsField
                open={openPopover === "guests"}
                rooms={rooms}
                setRooms={setRooms}
                onOpenChange={(open) => setOpenPopover(open ? "guests" : null)}
              />

              <Popover open={openRadius} onOpenChange={setOpenRadius}>
                <PopoverTrigger asChild>
                  <div className="cursor-pointer">
                    <SearchField
                      label="Radius"
                      icon={<Compass className="h-5 w-5 text-slate-400 dark:text-[#8B93FF]" />}
                    >
                      <div className="mt-1 flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-800 dark:text-white">
                          {radius} Miles
                        </span>
                      </div>
                    </SearchField>
                  </div>
                </PopoverTrigger>

                <PopoverContent
                  className="w-48 border-slate-200 bg-white p-2 dark:border-[#2B2544] dark:bg-[#0B0B10]"
                  align="start"
                >
                  <div className="space-y-1">
                    {["10", "20", "30", "40", "50"].map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => {
                          setRadius(value);
                          setOpenRadius(false);
                        }}
                        className={`w-full rounded-sm px-3 py-2 text-left text-sm transition-colors ${
                          radius === value
                            ? "bg-primary text-primary-foreground dark:bg-[#8B93FF] dark:text-[#050018]"
                            : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-[#151222]"
                        }`}
                      >
                        {value} Miles
                      </button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>

              <Button
                type="button"
                onClick={handleSearch}
                disabled={isLoading}
                className="h-full min-h-12 bg-primary px-5 text-primary-foreground hover:bg-primary/90 dark:bg-[#8B93FF] dark:text-[#050018] dark:hover:bg-[#9AA1FF] md:w-14 lg:min-h-15 lg:w-18 lg:px-10"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Search className="h-5 w-5 lg:h-6 lg:w-6" />
                    <span className="text-sm font-semibold md:hidden">
                      Search Hotels
                    </span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}