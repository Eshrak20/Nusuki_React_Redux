import { useMemo, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react"; // Imported for a clean modern spinner element

import HotelFilterSidebar from "./HotelFilterSidebar";
import HotelResultHeader from "./HotelResultHeader";
import HotelSortBar from "./HotelSortBar";
import HotelCard from "./HotelCard";
import NoHotelFound from "./NoHotelFound";
import EduPagination from "../../../../components/education/EduPagination";
import SearchSummary from "./SearchSummary";

import { useAppSelector } from "@/redux/hooks";
import { useSearchHotelsMutation } from "@/redux/api/hotelApi/hotelApi";
import type {
  HotelSearchPayload,
  HotelSearchResponse,
} from "@/types/hotel/types.hotel";
import type { HotelItem, HotelSearchData } from "@/types/hotel/types.hotelList";

type HotelLocationState = {
  hotelResponse?: HotelSearchResponse;
  searchPayload?: HotelSearchPayload;
};

const PAGE_SIZE = 20;

const HotelLists = () => {

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  
  const location = useLocation();
  const state = location.state as HotelLocationState | null;

  const initialData = state?.hotelResponse?.data as HotelSearchData | undefined;
  const searchPayload = state?.searchPayload;

  // Destructured 'isLoading' directly from RTK Query mutation hook options state tracking
  const [searchHotels, { isLoading }] = useSearchHotelsMutation();

  const [data, setData] = useState<HotelSearchData | undefined>(initialData);
  const [page, setPage] = useState(initialData?.search.page ?? 1);
  const [sortBy, setSortBy] = useState("cheapest");

  const selectedFilters = useAppSelector((state) => state.hotelSearch.filters);

  const nights = useMemo(() => {
    if (!data) return 1;

    const checkIn = new Date(data.search.check_in);
    const checkOut = new Date(data.search.check_out);
    const diff = checkOut.getTime() - checkIn.getTime();

    return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }, [data]);

  const filteredHotels = useMemo(() => {
    if (!data) return [];

    let hotels: HotelItem[] = [...data.available_hotels];

    const {
      price_min,
      price_max,
      star_ratings,
      chain_codes,
      amenity_codes,
      meal_plan,
      refundable,
      prepaid,
    } = selectedFilters;

    hotels = hotels.filter((hotel) => {
      const price =
        hotel.rate?.total_price ??
        hotel.total_price ??
        hotel.rate?.average_nightly_rate ??
        hotel.average_nightly_rate ??
        0;

      const star = hotel.star_rating ?? hotel.rating ?? 0;
      const chainCode = hotel.chain?.code ?? hotel.chain_code;

      const hotelAmenityCodes =
        hotel.amenities?.map((item) => String(item.code)) ?? [];

      const mealId = hotel.rate?.meal?.id ?? hotel.meal_plan;

      const isRefundable =
        hotel.rate?.cancellation_policy?.is_refundable ??
        hotel.refundable ??
        false;

      const isPrepaid = hotel.rate?.prepaid ?? hotel.prepaid ?? false;

      if (price_min !== null && price < price_min) return false;
      if (price_max !== null && price > price_max) return false;

      if (star_ratings.length > 0 && !star_ratings.includes(star)) {
        return false;
      }

      if (
        chain_codes.length > 0 &&
        (!chainCode || !chain_codes.includes(chainCode))
      ) {
        return false;
      }

      if (
        amenity_codes.length > 0 &&
        !amenity_codes.every((code) => hotelAmenityCodes.includes(String(code)))
      ) {
        return false;
      }

      if (meal_plan.length > 0 && (!mealId || !meal_plan.includes(mealId))) {
        return false;
      }

      if (refundable !== null && isRefundable !== refundable) {
        return false;
      }

      if (prepaid !== null && isPrepaid !== prepaid) {
        return false;
      }

      return true;
    });

    hotels.sort((a, b) => {
      const priceA =
        a.rate?.average_nightly_rate ??
        a.average_nightly_rate ??
        a.rate?.total_price ??
        a.total_price ??
        0;

      const priceB =
        b.rate?.average_nightly_rate ??
        b.average_nightly_rate ??
        b.rate?.total_price ??
        b.total_price ??
        0;

      if (sortBy === "cheapest") return priceA - priceB;

      if (sortBy === "highest-rating") {
        return (b.star_rating ?? b.rating ?? 0) - (a.star_rating ?? a.rating ?? 0);
      }

      if (sortBy === "nearest") {
        return (a.distance ?? 0) - (b.distance ?? 0);
      }

      if (sortBy === "refundable") {
        const aRefundable =
          a.rate?.cancellation_policy?.is_refundable ?? a.refundable ?? false;
        const bRefundable =
          b.rate?.cancellation_policy?.is_refundable ?? b.refundable ?? false;

        return Number(bRefundable) - Number(aRefundable);
      }

      return 0;
    });

    return hotels;
  }, [data, selectedFilters, sortBy]);

  const totalPages = useMemo(() => {
    if (!data) return 1;

    return Math.max(1, Math.ceil(data.total_hotels_in_region / PAGE_SIZE));
  }, [data]);

  const handlePageChange = async (nextPage: number) => {
    if (!searchPayload) return;

    // 1. SCROLL TO TOP IMMEDIATELY (Instantly reacts when the pagination option is clicked)
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setPage(nextPage);

    const payload: HotelSearchPayload = {
      ...searchPayload,
      page: nextPage,
      size: PAGE_SIZE,
    };

    try {
      const result = await searchHotels(payload).unwrap();
      setData(result.data as HotelSearchData);
    } catch (error) {
      console.error("Hotel pagination error:", error);
    }
  };

  if (!data) {
    return <Navigate to="/hotel" replace />;
  }

  return (
    <section className="min-h-screen bg-[#f3f6fb] dark:bg-background px-3 py-4 mt-20 sm:px-5 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SearchSummary data={data} nights={nights} />

        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[320px_1fr]">
          <HotelFilterSidebar
            filters={data.filters}
            onChange={() => setPage(1)}
          />

          <main className="space-y-4 overflow-hidden relative">
            <HotelResultHeader
              data={data}
              totalFilteredHotels={filteredHotels.length}
            />

            <HotelSortBar value={sortBy} onChange={setSortBy} />

            {/* 2. DYNAMIC LOADING FEEDBACK LOGIC */}
            {isLoading ? (
              <div className="flex flex-col items-center justify-center gap-3 rounded-[24px] border border-border bg-background p-20 text-center shadow-sm min-h-100">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-sm font-bold text-muted-foreground animate-pulse">
                  Fetching next page results...
                </p>
              </div>
            ) : filteredHotels.length > 0 ? (
              <div className="space-y-4">
                {filteredHotels.map((hotel, index) => (
                  <HotelCard
                    key={hotel.hotel_id ?? hotel.id ?? hotel.hotel_code ?? index}
                    hotel={hotel}
                    currency={data.search.currency_code}
                  />
                ))}
              </div>
            ) : (
              <NoHotelFound messages={data.raw_meta?.messages} />
            )}

          </main>

        </div>
        <EduPagination
          pagination={{
            current_page: page,
            last_page: totalPages,
          }}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  );
};

export default HotelLists;