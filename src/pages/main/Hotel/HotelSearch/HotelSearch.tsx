import { useEffect, useMemo, useState } from "react";
import { addDays, format, startOfMonth } from "date-fns";
import { Loader2, MapPin, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

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

const DEFAULT_DESTINATION = "Dhaka";
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
    null,
  );
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);

  const [checkIn, setCheckIn] = useState(defaultCheckIn);
  const [checkOut, setCheckOut] = useState(defaultCheckOut);
  const [checkoutMonth, setCheckoutMonth] = useState(
    startOfMonth(defaultCheckIn),
  );

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
      radius: 50,
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
        <div className="overflow-visible rounded-xl bg-white shadow-xl lg:shadow-2xl">
          <div className="p-4 sm:p-6 md:p-8">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr_auto]">
              <div className="relative">
                <SearchField
                  label="Destination"
                  icon={<MapPin className="h-5 w-5 text-slate-400" />}
                >
                  <div className="flex items-center gap-1">
                    <input
                      value={destination}
                      onChange={(event) =>
                        handleDestinationChange(event.target.value)
                      }
                      className="mt-1 w-full bg-transparent text-sm font-semibold text-slate-800 outline-none"
                      placeholder="Where are you going?"
                    />

                    {isSearchingDest && (
                      <Loader2 className="mt-1 h-4 w-4 animate-spin text-primary" />
                    )}
                  </div>
                </SearchField>

                {suggestions.length > 0 && (
                  <div className="absolute left-0 top-full z-50 mt-2 max-h-72 w-full overflow-y-auto rounded-xl border bg-white shadow-xl">
                    {suggestions.map((place) => (
                      <button
                        key={place.id}
                        type="button"
                        onClick={() => handlePlaceSelect(place)}
                        className="block w-full px-4 py-3 text-left transition hover:bg-slate-50"
                      >
                        <p className="text-sm font-semibold text-slate-800">
                          {place.name}
                        </p>
                        <p className="text-xs text-slate-500">
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

              <Button
                type="button"
                onClick={handleSearch}
                disabled={isLoading}
                className="min-h-15 px-8 md:w-full lg:w-auto"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm font-semibold">Searching...</span>
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
