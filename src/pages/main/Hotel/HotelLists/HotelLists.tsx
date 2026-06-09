import { useMemo, useState, useEffect, useCallback } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";

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
  const location = useLocation();
  const state = location.state as HotelLocationState | null;

  const initialData = state?.hotelResponse?.data as HotelSearchData | undefined;
  const searchPayload = state?.searchPayload;

  const [searchHotels, { isLoading }] = useSearchHotelsMutation();

  const [data, setData] = useState<HotelSearchData | undefined>(initialData);
  const [page, setPage] = useState(initialData?.search.page ?? 1);
  const [sortBy, setSortBy] = useState("cheapest");

  // Read current filters from global Redux slice
  const selectedFilters = useAppSelector((state) => state.hotelSearch.filters);

  // Scroll logic
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Centralized data fetch controller
  const fetchHotelsFromServer = useCallback(
    async (targetPage: number, currentFilters: typeof selectedFilters) => {
      if (!searchPayload) return;

      scrollToTop();

      // Combine search parameters, target page details, and Sabre-supported filters
      const payload: HotelSearchPayload = {
        ...searchPayload,
        page: targetPage,
        size: PAGE_SIZE,
        // Map selectedFilters object key names directly to your Sabre endpoint expectations below:
        price_min: currentFilters.price_min,
        price_max: currentFilters.price_max,
        star_ratings: currentFilters.star_ratings,
        chain_codes: currentFilters.chain_codes,
        amenity_codes: currentFilters.amenity_codes,
        meal_plan: currentFilters.meal_plan,
        refundable: currentFilters.refundable,
        prepaid: currentFilters.prepaid,
      };

      try {
        const result = await searchHotels(payload).unwrap();
        setData(result.data as HotelSearchData);
        setPage(targetPage);
      } catch (error) {
        console.error("Error fetching hotel records from Sabre:", error);
      }
    },
    [searchPayload, searchHotels]
  );

  // Fire live backend API update sequence whenever filters change
  useEffect(() => {
    // Prevent initial dual-triggering if data matches standard payload configuration
    if (data && data.search.page === 1) {
      // Optional optimization layer: Check if filter states match initialization conditions
    }
    
    fetchHotelsFromServer(1, selectedFilters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilters]);

  const nights = useMemo(() => {
    if (!data) return 1;
    const checkIn = new Date(data.search.check_in);
    const checkOut = new Date(data.search.check_out);
    const diff = checkOut.getTime() - checkIn.getTime();
    return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }, [data]);

  // Client side sorting layout execution ONLY (filtering runs on the endpoint)
  const sortedHotels = useMemo(() => {
    if (!data || !data.available_hotels) return [];

    const hotels = [...data.available_hotels];

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
        const aRefundable = a.rate?.cancellation_policy?.is_refundable ?? a.refundable ?? false;
        const bRefundable = b.rate?.cancellation_policy?.is_refundable ?? b.refundable ?? false;
        return Number(bRefundable) - Number(aRefundable);
      }

      return 0;
    });

    return hotels;
  }, [data, sortBy]);

  // Dynamically map total page ranges via matching filter results or regional limits
  const totalPages = useMemo(() => {
    if (!data) return 1;
    
    // Fallback order: Explicitly filtered dynamic aggregate count -> regional collection
    const trackingCount = 
      data.total_available_hotels_with_filter ?? 
      data.total_hotels_in_region ?? 
      0;

    return Math.max(1, Math.ceil(trackingCount / PAGE_SIZE));
  }, [data]);

  const handlePageChange = (nextPage: number) => {
    fetchHotelsFromServer(nextPage, selectedFilters);
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
            onChange={() => {}} // No longer resets state locally; useEffect hooks into Redux updates
          />

          <main className="space-y-4 overflow-hidden relative">
            <HotelResultHeader
              data={data}
              totalFilteredHotels={sortedHotels.length}
            />

            <HotelSortBar value={sortBy} onChange={setSortBy} />

            {isLoading ? (
              <div className="flex flex-col items-center justify-center gap-3 rounded-[0px] border border-border bg-background p-20 text-center shadow-sm min-h-100">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-sm font-bold text-muted-foreground animate-pulse">
                  Updating live server results...
                </p>
              </div>
            ) : sortedHotels.length > 0 ? (
              <div className="space-y-4">
                {sortedHotels.map((hotel, index) => (
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