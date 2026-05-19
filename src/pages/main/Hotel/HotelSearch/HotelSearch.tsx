import { useState, useEffect } from "react";
import { CalendarDays, MapPin, Search, UsersRound, Loader2 } from "lucide-react";
import { format, addDays, startOfMonth } from "date-fns";
import { useNavigate } from "react-router-dom";

import RoomSelector from "./RoomSelector";
import { useSearchHotelsMutation } from "@/redux/api/hotelApi/hotelApi";
// UPDATED HOOK IMPORT NAME
import { useLazyGetPlaceAutoCompleteQuery } from "@/redux/api/hotelApi/hotelApi"; 

import type { HotelRoom, HotelSearchPayload } from "@/types/hotel/types.hotel";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface ExtendedHotelRoom extends HotelRoom {
  child_ages?: number[];
}

const HotelSearch = () => {
  const [searchHotels, { isLoading }] = useSearchHotelsMutation();
  
  // FIXED ARRAY DESTRUCTURING FOR THE LAZY TRIGGER HOOK
  const [triggerAutocomplete, { isFetching: isSearchingDest }] = 
    useLazyGetPlaceAutoCompleteQuery();

  // Core Search State
  const [destination, setDestination] = useState("New York");
  const [currencyCode] = useState("BDT");

  // Dynamic Dates
  const defaultCheckIn = addDays(new Date(), 2);
  const defaultCheckOut = addDays(defaultCheckIn, 2);
  const [checkIn, setCheckIn] = useState<Date>(defaultCheckIn);
  const [checkOut, setCheckOut] = useState<Date>(defaultCheckOut);

  // Visibility states for Popovers
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [showCheckOut, setShowCheckOut] = useState(false);
  const [showRoomBox, setShowRoomBox] = useState(false);
  const [checkoutMonth, setCheckoutMonth] = useState<Date>(startOfMonth(defaultCheckIn));

  const [rooms, setRooms] = useState<ExtendedHotelRoom[]>([
    { adults: 2, children: 0, child_ages: [] },
  ]);

  const totalGuests = rooms.reduce((total, room) => total + room.adults + room.children, 0);
  const navigate = useNavigate();

  // Debounced API Query effect
  useEffect(() => {
    if (!destination.trim() || destination === "New York") {
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      triggerAutocomplete({ 
        keyword: destination, 
        limit: 20 
      });
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [destination, triggerAutocomplete]);

  const handleSearch = async () => {
    const payload: HotelSearchPayload = {
      check_in: format(checkIn, "yyyy-MM-dd"),
      check_out: format(checkOut, "yyyy-MM-dd"),
      latitude: 40.775201, 
      longitude: -73.963351,
      country_code: "US",
      radius: 50,
      uom: "MI",
      currency_code: currencyCode,
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
        state: { hotelResponse: result, searchPayload: payload },
      });
    } catch (error) {
      console.error("Hotel Search Error:", error);
    }
  };

  return (
    <section className="relative w-full z-30">
      <div className="relative mx-auto max-w-6xl px-4">
        <div className="overflow-visible rounded-xl bg-white shadow-xl lg:shadow-2xl">
          <div className="p-4 sm:p-6 md:p-8">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr_auto]">

              {/* Destination Input */}
              <div className="relative rounded-lg border border-slate-200 bg-white px-4 py-3 transition-colors focus-within:border-primary">
                <div className="flex items-center gap-4">
                  <div className="hidden border-r border-slate-200 pr-4 sm:block">
                    <MapPin className="h-5 w-5 text-slate-400" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-medium text-slate-400">
                      Destination
                    </label>
                    <div className="flex items-center gap-1">
                      <input
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="mt-1 w-full bg-transparent text-sm font-semibold text-slate-800 outline-none"
                        placeholder="Where are you going?"
                      />
                      {isSearchingDest && (
                        <Loader2 className="h-4 w-4 animate-spin text-primary mt-1" />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Check In */}
              <Popover open={showCheckIn} onOpenChange={setShowCheckIn}>
                <PopoverTrigger asChild>
                  <div className="cursor-pointer rounded-lg border border-slate-200 bg-white px-4 py-3 transition-colors hover:border-primary">
                    <div className="flex items-center gap-4">
                      <div className="hidden border-r border-slate-200 pr-4 sm:block">
                        <CalendarDays className="h-5 w-5 text-slate-400" />
                      </div>
                      <div className="flex-1">
                        <label className="block text-xs font-medium text-slate-400">
                          Check-in
                        </label>
                        <p className={cn("mt-1 text-sm font-semibold", !checkIn && "text-muted-foreground")}>
                          {checkIn ? format(checkIn, "PP") : "Pick a date"}
                        </p>
                      </div>
                    </div>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={checkIn}
                    onSelect={(date) => {
                      if (date) {
                        setCheckIn(date);
                        setCheckoutMonth(startOfMonth(date));
                        if (date >= checkOut) {
                          setCheckOut(addDays(date, 2));
                        }
                        setShowCheckIn(false); 
                      }
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              {/* Check Out */}
              <Popover open={showCheckOut} onOpenChange={setShowCheckOut}>
                <PopoverTrigger asChild>
                  <div className="cursor-pointer rounded-lg border border-slate-200 bg-white px-4 py-3 transition-colors hover:border-primary">
                    <div className="flex items-center gap-4">
                      <div className="hidden border-r border-slate-200 pr-4 sm:block">
                        <CalendarDays className="h-5 w-5 text-slate-400" />
                      </div>
                      <div className="flex-1">
                        <label className="block text-xs font-medium text-slate-400">
                          Check-out
                        </label>
                        <p className={cn("mt-1 text-sm font-semibold", !checkOut && "text-muted-foreground")}>
                          {checkOut ? format(checkOut, "PP") : "Pick a date"}
                        </p>
                      </div>
                    </div>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={checkOut}
                    onSelect={(date) => {
                      if (date) {
                        setCheckOut(date);
                        setShowCheckOut(false);
                      }
                    }}
                    initialFocus
                    month={checkoutMonth}
                    onMonthChange={setCheckoutMonth}
                    disabled={(date) => (checkIn ? date < checkIn : false)}
                  />
                </PopoverContent>
              </Popover>

              {/* Guests Selector */}
              <Popover open={showRoomBox} onOpenChange={setShowRoomBox}>
                <PopoverTrigger asChild>
                  <button
                    id="guests-trigger"
                    type="button"
                    className="flex h-full min-h-[60px] w-full items-center gap-4 rounded-lg border border-slate-200 bg-white px-4 py-3 text-left transition hover:border-primary focus:border-primary outline-none"
                  >
                    <div className="hidden border-r border-slate-200 pr-4 sm:block">
                      <UsersRound className="h-5 w-5 text-slate-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        {totalGuests} Guests
                      </p>
                      <p className="text-xs text-slate-500">
                        {rooms.length} {rooms.length > 1 ? "Rooms" : "Room"}
                      </p>
                    </div>
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  side="bottom"
                  align="end"
                  sideOffset={12}
                  className="w-screen max-w-[380px] p-0 rounded-xl shadow-2xl z-50 bg-white border-none"
                  onInteractOutside={(event) => {
                    const target = event.target as HTMLElement;
                    if (target.closest("#guests-trigger")) {
                      event.preventDefault();
                    } else {
                      setShowRoomBox(false);
                    }
                  }}
                >
                  <RoomSelector
                    rooms={rooms}
                    setRooms={setRooms}
                    onClose={() => setShowRoomBox(false)}
                  />
                </PopoverContent>
              </Popover>

              {/* Search Button */}
              <button
                type="button"
                onClick={handleSearch}
                disabled={isLoading}
                className="flex min-h-[60px] items-center justify-center rounded-lg bg-primary px-8 text-primary-foreground transition-all hover:opacity-90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 md:w-full lg:w-auto"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span className="text-sm font-semibold">Searching...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 lg:block">
                    <Search className="h-6 w-6" />
                    <span className="text-sm font-semibold lg:hidden">Search Hotels</span>
                  </div>
                )}
              </button>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotelSearch;