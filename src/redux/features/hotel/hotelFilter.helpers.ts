import type { HotelItem, HotelSearchResponse } from "@/types/hotel/types.hotelList";
import type { HotelFiltersState, HotelSortBy, HotelSortOrder } from "./hotelSearchSlice";

const normalizeText = (value: unknown): string =>
  String(value ?? "").trim().toLowerCase();

const toNumber = (value: unknown): number => {
  const numberValue = Number(value);
  return Number.isNaN(numberValue) ? 0 : numberValue;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const buildHotelSearchResetKey = (payload: any) => {
  return JSON.stringify({
    check_in: payload.check_in,
    check_out: payload.check_out,
    latitude: payload.latitude,
    longitude: payload.longitude,
    radius: payload.radius,
    uom: payload.uom,
    country_code: payload.country_code,
    currency_code: payload.currency_code,
    rooms: payload.rooms,
    sort_by: payload.sort_by,
    sort_order: payload.sort_order,
  });
};

export const extractHotels = (
  response?: HotelSearchResponse,
): HotelItem[] => {
  return response?.data?.available_hotels ?? [];
};

export const extractHotelFilters = (response?: HotelSearchResponse) => {
  return response?.data?.filters ?? null;
};

export const extractHotelTotalPages = (
  response?: HotelSearchResponse,
): number => {
  const data = response?.data;

  if (!data) return 1;

  const size = data.search?.size || 20;
  const total = data.total_available_hotels_without_filter || 0;

  return Math.max(Math.ceil(total / size), 1);
};

export const extractHotelTotalCount = (
  response?: HotelSearchResponse,
): number => {
  return response?.data?.total_available_hotels_without_filter ?? 0;
};

export const getHotelPrice = (hotel: HotelItem): number => {
  return toNumber(hotel.total_price ?? hotel.average_nightly_rate);
};

export const getHotelStarRating = (hotel: HotelItem): number | null => {
  const value = hotel.star_rating ?? hotel.rating;

  if (value === undefined || value === null) return null;

  const numberValue = Number(value);

  return Number.isNaN(numberValue) ? null : numberValue;
};

export const getHotelAmenities = (hotel: HotelItem): string[] => {
  if (!Array.isArray(hotel.amenities)) return [];

  return hotel.amenities.map((item) => normalizeText(item));
};

export const getHotelRefundable = (hotel: HotelItem): boolean | null => {
  return typeof hotel.refundable === "boolean" ? hotel.refundable : null;
};

export const getHotelPrepaid = (hotel: HotelItem): boolean | null => {
  return typeof hotel.prepaid === "boolean" ? hotel.prepaid : null;
};

export const getClientFilteredHotels = ({
  hotels,
  filters,
}: {
  hotels: HotelItem[];
  filters: HotelFiltersState;
}): HotelItem[] => {
  return hotels.filter((hotel) => {
    const price = getHotelPrice(hotel);
    const starRating = getHotelStarRating(hotel);
    const hotelAmenities = getHotelAmenities(hotel);
    const refundable = getHotelRefundable(hotel);
    const prepaid = getHotelPrepaid(hotel);

    const matchPriceMin =
      filters.price_min === null || price >= filters.price_min;

    const matchPriceMax =
      filters.price_max === null || price <= filters.price_max;

    const matchStarRatings =
      filters.star_ratings.length === 0 ||
      (starRating !== null && filters.star_ratings.includes(starRating));

    /**
     * Your HotelItem type does not have chain_code.
     * So chain filter will not work unless backend sends chain_code in hotel item.
     */
    const matchChains = filters.chain_codes.length === 0;

    /**
     * Your HotelItem amenities are string[].
     * But API filter amenities have value string.
     * So this will work if both values are same/name based.
     */
    const matchAmenities =
      filters.amenity_codes.length === 0 ||
      filters.amenity_codes.every((amenity) =>
        hotelAmenities.includes(normalizeText(amenity)),
      );

    /**
     * Your HotelItem type does not have meal_plan.
     * So meal_plan filter will not work unless backend sends meal_plan in hotel item.
     */
    const matchMealPlan = filters.meal_plan.length === 0;

    const matchRefundable =
      filters.refundable === null || refundable === filters.refundable;

    const matchPrepaid = filters.prepaid === null || prepaid === filters.prepaid;

    return (
      matchPriceMin &&
      matchPriceMax &&
      matchStarRatings &&
      matchChains &&
      matchAmenities &&
      matchMealPlan &&
      matchRefundable &&
      matchPrepaid
    );
  });
};

export const sortHotelsClientSide = ({
  hotels,
  sortBy,
  sortOrder,
}: {
  hotels: HotelItem[];
  sortBy: HotelSortBy
  sortOrder: HotelSortOrder;
}): HotelItem[] => {
  const sorted = [...hotels];

  sorted.sort((a, b) => {
    if (sortBy === "price") {
      const aPrice = getHotelPrice(a);
      const bPrice = getHotelPrice(b);

      return sortOrder === "asc" ? aPrice - bPrice : bPrice - aPrice;
    }

    if (sortBy === "star") {
      const aStar = getHotelStarRating(a) ?? 0;
      const bStar = getHotelStarRating(b) ?? 0;

      return sortOrder === "asc" ? aStar - bStar : bStar - aStar;
    }

    const aName = normalizeText(a.name ?? a.hotel_name);
    const bName = normalizeText(b.name ?? b.hotel_name);

    return sortOrder === "asc"
      ? aName.localeCompare(bName)
      : bName.localeCompare(aName);
  });

  return sorted;
};

export const paginateHotels = ({
  hotels,
  currentPage,
  pageSize,
}: {
  hotels: HotelItem[];
  currentPage: number;
  pageSize: number;
}): HotelItem[] => {
  const start = (currentPage - 1) * pageSize;
  return hotels.slice(start, start + pageSize);
};