// src/redux/features/hotel/hotelSearch.slice.ts

import { createInitialHotelCacheState, hotelCacheReducer, type HotelCacheState } from "@/pages/main/Hotel/hotelCache";
import type { HotelFilters, HotelItem } from "@/types/hotel/types.hotelList";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


export type HotelSortBy = "price" | "star" | "name";
export type HotelSortOrder = "asc" | "desc";

export type HotelFiltersState = {
  price_min: number | null;
  price_max: number | null;
  star_ratings: number[];
  chain_codes: string[];
  amenity_codes: string[];
  meal_plan: string[];
  refundable: boolean | null;
  prepaid: boolean | null;
};

export type HotelSearchState = {
  searchKey: string;
  cache: HotelCacheState;
  filters: HotelFiltersState;
  sortBy: HotelSortBy;
  sortOrder: HotelSortOrder;
  clientPage: number;
  clientPageSize: number;
};

export const initialHotelFilters: HotelFiltersState = {
  price_min: null,
  price_max: null,
  star_ratings: [],
  chain_codes: [],
  amenity_codes: [],
  meal_plan: [],
  refundable: null,
  prepaid: null,
};

const initialSearchKey = "initial-hotel-search";

const initialState: HotelSearchState = {
  searchKey: initialSearchKey,
  cache: createInitialHotelCacheState(initialSearchKey),
  filters: initialHotelFilters,
  sortBy: "price",
  sortOrder: "asc",
  clientPage: 1,
  clientPageSize: 20,
};

const hotelSearchSlice = createSlice({
  name: "hotelSearch",
  initialState,
  reducers: {
    setHotelSearchKey: (state, action: PayloadAction<string>) => {
      const searchKey = action.payload;

      if (state.searchKey === searchKey) return;

      state.searchKey = searchKey;
      state.cache = createInitialHotelCacheState(searchKey);
      state.filters = initialHotelFilters;
      state.clientPage = 1;
    },

    setHotelServerPage: (
      state,
      action: PayloadAction<{
        searchKey: string;
        page: number;
      }>,
    ) => {
      state.cache = hotelCacheReducer(state.cache, {
        type: "SET_SERVER_PAGE",
        payload: action.payload,
      });
    },

    mergeHotelSearchResponse: (
      state,
      action: PayloadAction<{
        searchKey: string;
        page: number;
        hotels: HotelItem[];
        totalPages: number;
        totalHotels: number;
        filters: HotelFilters | null;
      }>,
    ) => {
      state.cache = hotelCacheReducer(state.cache, {
        type: "MERGE_RESPONSE",
        payload: action.payload,
      });

      state.searchKey = action.payload.searchKey;
    },

    setHotelPriceFilter: (
      state,
      action: PayloadAction<{
        min: number;
        max: number;
      }>,
    ) => {
      state.filters.price_min = action.payload.min;
      state.filters.price_max = action.payload.max;
    },

    toggleHotelArrayFilter: (
      state,
      action: PayloadAction<{
        key: "star_ratings" | "chain_codes" | "amenity_codes" | "meal_plan";
        value: string | number;
      }>,
    ) => {
      const { key, value } = action.payload;

      if (key === "star_ratings") {
        const numberValue = Number(value);
        const exists = state.filters.star_ratings.includes(numberValue);

        state.filters.star_ratings = exists
          ? state.filters.star_ratings.filter((item) => item !== numberValue)
          : [...state.filters.star_ratings, numberValue];

        state.clientPage = 1;
        return;
      }

      const stringValue = String(value);
      const oldValues = state.filters[key] as string[];
      const exists = oldValues.includes(stringValue);

      state.filters[key] = exists
        ? oldValues.filter((item) => item !== stringValue)
        : [...oldValues, stringValue];

      state.clientPage = 1;
    },

    setHotelBooleanFilter: (
      state,
      action: PayloadAction<{
        key: "refundable" | "prepaid";
        value: boolean;
      }>,
    ) => {
      const { key, value } = action.payload;

      state.filters[key] = state.filters[key] === value ? null : value;
      state.clientPage = 1;
    },

    resetHotelFilters: (state) => {
      state.filters = initialHotelFilters;
      state.clientPage = 1;
    },

    setHotelSort: (
      state,
      action: PayloadAction<{
        sortBy: HotelSortBy;
        sortOrder: HotelSortOrder;
      }>,
    ) => {
      state.sortBy = action.payload.sortBy;
      state.sortOrder = action.payload.sortOrder;
      state.clientPage = 1;
    },

    setHotelClientPage: (state, action: PayloadAction<number>) => {
      state.clientPage = action.payload;
    },

    setHotelClientPageSize: (state, action: PayloadAction<number>) => {
      state.clientPageSize = action.payload;
      state.clientPage = 1;
    },

    resetHotelSearch: (state) => {
      state.searchKey = initialSearchKey;
      state.cache = createInitialHotelCacheState(initialSearchKey);
      state.filters = initialHotelFilters;
      state.sortBy = "price";
      state.sortOrder = "asc";
      state.clientPage = 1;
      state.clientPageSize = 20;
    },
  },
});

export const {
  setHotelSearchKey,
  setHotelServerPage,
  mergeHotelSearchResponse,
  setHotelPriceFilter,
  toggleHotelArrayFilter,
  setHotelBooleanFilter,
  resetHotelFilters,
  setHotelSort,
  setHotelClientPage,
  setHotelClientPageSize,
  resetHotelSearch,
} = hotelSearchSlice.actions;

export default hotelSearchSlice.reducer;