import type { HotelFilters, HotelItem } from "@/types/hotel/types.hotelList";

export type HotelCacheState = {
  searchKey: string;
  serverPage: number;
  serverTotalPages: number;
  serverTotalHotels: number;
  pageCache: Record<number, HotelItem[]>;
  apiFilters: HotelFilters | null;
};

export type HotelCacheAction =
  | {
      type: "SET_SERVER_PAGE";
      payload: {
        searchKey: string;
        page: number;
      };
    }
  | {
      type: "MERGE_RESPONSE";
      payload: {
        searchKey: string;
        page: number;
        hotels: HotelItem[];
        totalPages: number;
        totalHotels: number;
        filters: HotelFilters | null;
      };
    }
  | {
      type: "RESET_CACHE";
      payload: {
        searchKey: string;
      };
    };

export const createInitialHotelCacheState = (
  searchKey: string,
): HotelCacheState => ({
  searchKey,
  serverPage: 1,
  serverTotalPages: 1,
  serverTotalHotels: 0,
  pageCache: {},
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

      if (state.serverPage === page) return state;

      return {
        ...state,
        serverPage: page,
      };
    }

    case "MERGE_RESPONSE": {
      const { searchKey, page, hotels, totalPages, totalHotels, filters } =
        action.payload;

      const baseState =
        state.searchKey === searchKey
          ? state
          : createInitialHotelCacheState(searchKey);

      return {
        ...baseState,
        searchKey,
        serverPage: page,
        serverTotalPages: totalPages,
        serverTotalHotels: totalHotels,
        apiFilters: filters ?? baseState.apiFilters,
        pageCache: {
          ...baseState.pageCache,
          [page]: hotels,
        },
      };
    }

    case "RESET_CACHE": {
      return createInitialHotelCacheState(action.payload.searchKey);
    }

    default:
      return state;
  }
};