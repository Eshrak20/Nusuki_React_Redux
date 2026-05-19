"use client";

import { useMemo, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

import HotelFilterSidebar from "./HotelFilterSidebar";
import HotelResultHeader from "./HotelResultHeader";
import HotelSortBar from "./HotelSortBar";
import HotelCard from "./HotelCard";
import NoHotelFound from "./NoHotelFound";
import Pagination from "./Pagination";
import SearchSummary from "./SearchSummary";
import type { HotelSearchPayload, HotelSearchResponse } from "@/types/hotel/types.hotel";
import type { HotelSearchData } from "@/types/hotel/types.hotelList";


type HotelLocationState = {
  hotelResponse?: HotelSearchResponse;
  searchPayload?: HotelSearchPayload;
};

const HotelLists = () => {
  const location = useLocation();

  const state = location.state as HotelLocationState | null;

  const hotelResponse = state?.hotelResponse;
  const searchPayload = state?.searchPayload;

  const data = hotelResponse?.data as HotelSearchData | undefined;

  const [page, setPage] = useState<number>(data?.search?.page || 1);

  const size = searchPayload?.size || data?.search?.size || 20;

  const totalPages = useMemo(() => {
    if (!data) return 1;

    return Math.max(
      1,
      Math.ceil(data.total_available_hotels_with_filter / size)
    );
  }, [data, size]);

  const nights = useMemo(() => {
    if (!data) return 1;

    const checkIn = new Date(data.search.check_in);
    const checkOut = new Date(data.search.check_out);
    const diff = checkOut.getTime() - checkIn.getTime();

    return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }, [data]);

  if (!data) {
    return <Navigate to="/hotel" replace />;
  }

  return (
    <section className="min-h-screen bg-[#f3f6fb] px-3 py-4 sm:px-5 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SearchSummary data={data} nights={nights} />

        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[320px_1fr]">
          <HotelFilterSidebar filters={data.filters} />

          <main className="space-y-4 overflow-hidden">
            <HotelResultHeader data={data} />

            <HotelSortBar />

            {data.available_hotels.length > 0 ? (
              <div className="space-y-4">
                {data.available_hotels.map((hotel, index) => (
                  <HotelCard
                    key={hotel.id || hotel.hotel_id || index}
                    hotel={hotel}
                    currency={data.search.currency_code}
                  />
                ))}
              </div>
            ) : (
              <NoHotelFound messages={data.raw_meta?.messages} />
            )}

            <Pagination
              page={page}
              totalPages={totalPages}
              onPrev={() => setPage((prev) => Math.max(1, prev - 1))}
              onNext={() => setPage((prev) => Math.min(totalPages, prev + 1))}
            />
          </main>
        </div>
      </div>
    </section>
  );
};

export default HotelLists;