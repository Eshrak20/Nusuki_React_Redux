import { useState } from "react";
import { CalendarDays, Hotel, MapPin, Search, UsersRound } from "lucide-react";

import RoomSelector from "./RoomSelector";
import { useSearchHotelsMutation } from "@/redux/api/hotelApi/hotelApi";
import type { HotelRoom, HotelSearchPayload } from "@/types/hotel/types.hotel";
import { useNavigate } from "react-router-dom";

const HotelSearch = () => {
  const [searchHotels, { isLoading }] = useSearchHotelsMutation();

  const [destination, setDestination] = useState("New York");
  const [countryCode, setCountryCode] = useState("US");
  const [currencyCode, setCurrencyCode] = useState("BDT");

  const [checkIn, setCheckIn] = useState("2026-06-10");
  const [checkOut, setCheckOut] = useState("2026-06-12");

  const [latitude, setLatitude] = useState(40.775201);
  const [longitude, setLongitude] = useState(-73.963351);

  const [rooms, setRooms] = useState<HotelRoom[]>([
    {
      adults: 2,
      children: 0,
    },
  ]);

  const [showRoomBox, setShowRoomBox] = useState(false);

  const totalGuests = rooms.reduce(
    (total, room) => total + room.adults + room.children,
    0,
  );
  const navigate = useNavigate();
  const handleSearch = async () => {
    const payload: HotelSearchPayload = {
      check_in: checkIn,
      check_out: checkOut,
      latitude,
      longitude,
      radius: 50,
      uom: "MI",
      country_code: countryCode,
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

      console.log("Hotel Search Result:", result);

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
    <section className="relative min-h-screen bg-slate-100 mt-96">
      {/* Search Box */}
      <div className="relative z-10 mx-auto -mt-20 max-w-6xl px-4">
        <div className="overflow-visible rounded-lg bg-white shadow-2xl">
          <div className="p-5 md:p-8">
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1.3fr_1fr_1fr_1fr_auto]">
              {/* Destination */}
              <div className="rounded-lg border border-slate-200 bg-white px-4 py-3">
                <div className="flex items-center gap-4">
                  <div className="border-r border-slate-200 pr-4">
                    <MapPin className="h-5 w-5 text-slate-400" />
                  </div>

                  <div className="flex-1">
                    <label className="text-xs font-medium text-slate-400">
                      Destination
                    </label>
                    <input
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="mt-1 w-full bg-transparent text-sm font-semibold text-slate-800 outline-none"
                      placeholder="New York"
                    />
                  </div>
                </div>
              </div>

              {/* Check In */}
              <div className="rounded-lg border border-slate-200 bg-white px-4 py-3">
                <div className="flex items-center gap-4">
                  <div className="border-r border-slate-200 pr-4">
                    <CalendarDays className="h-5 w-5 text-slate-400" />
                  </div>

                  <div className="flex-1">
                    <label className="text-xs font-medium text-slate-400">
                      Check-in
                    </label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="mt-1 w-full bg-transparent text-sm font-semibold text-slate-800 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Check Out */}
              <div className="rounded-lg border border-slate-200 bg-white px-4 py-3">
                <div className="flex items-center gap-4">
                  <div className="border-r border-slate-200 pr-4">
                    <CalendarDays className="h-5 w-5 text-slate-400" />
                  </div>

                  <div className="flex-1">
                    <label className="text-xs font-medium text-slate-400">
                      Check-out
                    </label>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="mt-1 w-full bg-transparent text-sm font-semibold text-slate-800 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Guests */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowRoomBox((prev) => !prev)}
                  className="flex min-h-[58px] w-full items-center gap-4 rounded-lg border border-slate-200 bg-white px-4 py-3 text-left transition hover:border-orange-400"
                >
                  <div className="border-r border-slate-200 pr-4">
                    <UsersRound className="h-5 w-5 text-slate-400" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      {totalGuests} Guests
                    </p>
                    <p className="text-xs text-slate-500">
                      {rooms.length} Room
                    </p>
                  </div>
                </button>

                {showRoomBox && (
                  <div className="absolute right-0 top-[70px] z-30 w-full min-w-[280px] md:w-[320px]">
                    <RoomSelector rooms={rooms} setRooms={setRooms} />
                  </div>
                )}
              </div>

              {/* Search Button */}
              <button
                type="button"
                onClick={handleSearch}
                disabled={isLoading}
                className="flex min-h-[58px] items-center justify-center rounded-lg bg-orange-500 px-6 text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? (
                  <span className="text-sm font-semibold">Searching...</span>
                ) : (
                  <Search className="h-6 w-6" />
                )}
              </button>
            </div>

            {/* Advanced API Fields */}
            <div className="mt-5 grid grid-cols-1 gap-3 border-t border-slate-100 pt-5 md:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg border border-slate-200 px-4 py-3">
                <label className="text-xs font-medium text-slate-400">
                  Latitude
                </label>
                <input
                  type="number"
                  value={latitude}
                  onChange={(e) => setLatitude(Number(e.target.value))}
                  className="mt-1 w-full bg-transparent text-sm font-semibold text-slate-800 outline-none"
                />
              </div>

              <div className="rounded-lg border border-slate-200 px-4 py-3">
                <label className="text-xs font-medium text-slate-400">
                  Longitude
                </label>
                <input
                  type="number"
                  value={longitude}
                  onChange={(e) => setLongitude(Number(e.target.value))}
                  className="mt-1 w-full bg-transparent text-sm font-semibold text-slate-800 outline-none"
                />
              </div>

              <div className="rounded-lg border border-slate-200 px-4 py-3">
                <label className="text-xs font-medium text-slate-400">
                  Country Code
                </label>
                <input
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="mt-1 w-full bg-transparent text-sm font-semibold text-slate-800 outline-none"
                />
              </div>

              <div className="rounded-lg border border-slate-200 px-4 py-3">
                <label className="text-xs font-medium text-slate-400">
                  Currency Code
                </label>
                <input
                  value={currencyCode}
                  onChange={(e) => setCurrencyCode(e.target.value)}
                  className="mt-1 w-full bg-transparent text-sm font-semibold text-slate-800 outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotelSearch;
