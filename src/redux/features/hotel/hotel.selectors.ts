// src/redux/features/hotel/hotel.selectors.ts

import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";
import {
  getClientFilteredHotels,
  paginateHotels,
  sortHotelsClientSide,
} from "./hotelFilter.helpers";

export const selectHotelSearchState = (state: RootState) => state.hotelSearch;

export const selectHotelCache = (state: RootState) => state.hotelSearch.cache;

export const selectHotelApiFilters = createSelector(
  selectHotelCache,
  (cache) => cache.apiFilters,
);

export const selectCachedHotelPages = createSelector(
  selectHotelCache,
  (cache) => cache.pageCache,
);

export const selectAllCachedHotels = createSelector(
  selectCachedHotelPages,
  (pageCache) => {
    return Object.keys(pageCache)
      .map(Number)
      .sort((a, b) => a - b)
      .flatMap((page) => pageCache[page] ?? []);
  },
);

export const selectClientFilteredHotels = createSelector(
  [
    selectAllCachedHotels,
    (state: RootState) => state.hotelSearch.filters,
  ],
  (hotels, filters) => {
    return getClientFilteredHotels({
      hotels,
      filters,
    });
  },
);

export const selectSortedFilteredHotels = createSelector(
  [
    selectClientFilteredHotels,
    (state: RootState) => state.hotelSearch.sortBy,
    (state: RootState) => state.hotelSearch.sortOrder,
  ],
  (hotels, sortBy, sortOrder) => {
    return sortHotelsClientSide({
      hotels,
      sortBy,
      sortOrder,
    });
  },
);

export const selectVisibleHotels = createSelector(
  [
    selectSortedFilteredHotels,
    (state: RootState) => state.hotelSearch.clientPage,
    (state: RootState) => state.hotelSearch.clientPageSize,
  ],
  (hotels, currentPage, pageSize) => {
    return paginateHotels({
      hotels,
      currentPage,
      pageSize,
    });
  },
);

export const selectHotelResultMeta = createSelector(
  [
    selectAllCachedHotels,
    selectClientFilteredHotels,
    (state: RootState) => state.hotelSearch.clientPage,
    (state: RootState) => state.hotelSearch.clientPageSize,
  ],
  (allHotels, filteredHotels, clientPage, clientPageSize) => {
    return {
      totalCached: allHotels.length,
      totalFiltered: filteredHotels.length,
      clientPage,
      clientPageSize,
      clientTotalPages: Math.max(
        Math.ceil(filteredHotels.length / clientPageSize),
        1,
      ),
    };
  },
);