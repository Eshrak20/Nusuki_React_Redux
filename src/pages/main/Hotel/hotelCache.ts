import type { HotelFilters } from "@/types/hotel/types.hotelList";

export type HotelCacheState = {
  searchKey: string;
  serverPage: number;
  apiFilters: HotelFilters | null;
};

export type HotelCacheAction =
  | {
      type: "SET_SERVER_PAGE";
      payload: { searchKey: string; page: number };
    }
  | {
      type: "UPDATE_FILTERS";
      payload: { searchKey: string; filters: HotelFilters | null };
    }
  | {
      type: "RESET_CACHE";
      payload: { searchKey: string };
    };

export const createInitialHotelCacheState = (
  searchKey: string,
): HotelCacheState => ({
  searchKey,
  serverPage: 1,
  apiFilters: null,
});

export const hotelCacheReducer = (
  state: HotelCacheState,
  action: HotelCacheAction,
): HotelCacheState => {
  switch (action.type) {
    case "SET_SERVER_PAGE": {
      const { searchKey, page } = action.payload;
      if (state.searchKey !== searchKey) {
        return createInitialHotelCacheState(searchKey);
      }
      return { ...state, serverPage: page };
    }

    case "UPDATE_FILTERS": {
      const { searchKey, filters } = action.payload;
      const baseState = state.searchKey === searchKey ? state : createInitialHotelCacheState(searchKey);
      return {
        ...baseState,
        apiFilters: filters,
        serverPage: 1, // Reset page on filter changes
      };
    }

    case "RESET_CACHE": {
      return createInitialHotelCacheState(action.payload.searchKey);
    }

    default:
      return state;
  }
};