import { useEffect, useMemo, useState } from "react";
import { addDays, format, startOfMonth } from "date-fns";
import { Loader2, MapPin, Search, Compass } from "lucide-react";
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
  fullAddress: "Dhaka",
  countryCode: "BD",
  searchHint: {
    latitude: 23.8103,
    longitude: 90.4125,
    country_code: "BD",
  },
};

const DEFAULT_DESTINATION = DEFAULT_PLACE.fullAddress;
const DEFAULT_CURRENCY = "BDT";
const AUTOCOMPLETE_LIMIT = 20;

export default function HotelSearch() {
  const navigate = useNavigate();

  const [searchHotels, { isLoading }] = useSearchHotelsMutation();

  const [triggerAutocomplete, { isFetching: isSearchingDest }] =
    useLazyGetPlaceAutoCompleteQuery();

  const defaultCheckIn = useMemo(() => addDays(new Date(), 2), []);

  const defaultCheckOut = useMemo(
    () => addDays(defaultCheckIn, 2),
    [defaultCheckIn],
  );

  const [destination, setDestination] = useState(DEFAULT_DESTINATION);

  const [selectedPlace, setSelectedPlace] = useState<PlaceSuggestion | null>(
    DEFAULT_PLACE,
  );

  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);

  const [checkIn, setCheckIn] = useState(defaultCheckIn);
  const [checkOut, setCheckOut] = useState(defaultCheckOut);

  const [checkoutMonth, setCheckoutMonth] = useState(
    startOfMonth(defaultCheckIn),
  );

  const [radius, setRadius] = useState<string>("50");
  const [openRadius, setOpenRadius] = useState(false);

  const [openPopover, setOpenPopover] = useState<
    "checkIn" | "checkOut" | "guests" | null
  >(null);

  const [rooms, setRooms] = useState<ExtendedHotelRoom[]>([
    { adults: 2, children: 0, child_ages: [] },
  ]);

  useEffect(() => {
    const keyword = destination.trim();

    const shouldSearch =
      keyword.length > 0 && selectedPlace?.fullAddress !== keyword;

    if (!shouldSearch) return;

    const timer = window.setTimeout(() => {
      triggerAutocomplete({
        keyword,
        limit: AUTOCOMPLETE_LIMIT,
      })
        .unwrap()
        .then((result) => {
          setSuggestions(result.response ?? []);
        })
        .catch((error) => {
          console.error("Place Autocomplete Error:", error);
          setSuggestions([]);
        });
    }, 400);

    return () => window.clearTimeout(timer);
  }, [destination, selectedPlace, triggerAutocomplete]);

  const handleDestinationChange = (value: string) => {
    setDestination(value);
    setSelectedPlace(null);

    if (!value.trim()) {
      setSuggestions([]);
    }
  };

  const handlePlaceSelect = (place: PlaceSuggestion) => {
    setDestination(place.fullAddress);
    setSelectedPlace(place);
    setSuggestions([]);
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
      alert("Please select a destination from the dropdown list.");
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
      <div className="relative mx-auto max-w-6xl px-4">
        <div className="overflow-visible rounded-xl border border-slate-200 bg-white shadow-xl dark:border-[#272047] dark:bg-[#050018] lg:shadow-2xl">
          <div className="p-4 sm:p-6 md:p-8">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr_0.8fr_auto]">
              <div className="relative">
                <SearchField
                  label="Destination"
                  icon={<MapPin className="h-5 w-5 text-slate-600 dark:text-[#8B93FF]" />}
                >
                  <div className="flex items-center gap-1">
                    <input
                      value={destination}
                      onChange={(event) => handleDestinationChange(event.target.value)}
                      className="mt-1 w-full bg-transparent text-sm font-semibold text-slate-800 outline-none placeholder:text-slate-400 dark:text-white dark:placeholder:text-slate-500"
                      placeholder="Where are you going?"
                    />

                    {isSearchingDest && (
                      <Loader2 className="mt-1 h-4 w-4 animate-spin text-primary dark:text-[#8B93FF]" />
                    )}
                  </div>
                </SearchField>

                {suggestions.length > 0 && (
                  <div className="absolute left-0 top-full z-50 mt-2 max-h-72 w-full overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-xl dark:border-[#2B2544] dark:bg-[#0B0B10]">
                    {suggestions.map((place) => (
                      <button
                        key={place.id}
                        type="button"
                        onClick={() => handlePlaceSelect(place)}
                        className="block w-full px-4 py-3 text-left transition hover:bg-slate-50 dark:hover:bg-[#151222]"
                      >
                        <p className="text-sm font-semibold text-slate-800 dark:text-white">
                          {place.name}
                        </p>

                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {place.fullAddress}
                        </p>
                      </button>
                    ))}
                  </div>
                )}
              </div>

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
                onOpenChange={(open) =>
                  setOpenPopover(open ? "checkOut" : null)
                }
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
                        <span className="text-sm font-semibold text-slate-800 dark:text-white">
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
                        className={`w-full rounded-md px-3 py-2 text-left text-sm transition-colors ${radius === value
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
                className="min-h-15 bg-primary px-10 text-primary-foreground hover:bg-primary/90 dark:bg-[#8B93FF] dark:text-[#050018] dark:hover:bg-[#9AA1FF] md:w-18"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </>
                ) : (
                  <>
                    <Search className="h-6 w-6" />
                    <span className="text-sm font-semibold lg:hidden">
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