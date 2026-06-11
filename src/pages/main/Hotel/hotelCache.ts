import type { HotelFilters, HotelItem } from "@/types/hotel/types.hotelList";

export type HotelCacheState = {
  searchKey: string;
  serverPage: number;
  serverTotalPages: number;
  totalHotels: number;
  apiFilters: HotelFilters | null;
  pageCache: Record<number, HotelItem[]>;
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
      type: "UPDATE_FILTERS";
      payload: {
        searchKey: string;
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
  totalHotels: 0,
  apiFilters: null,
  pageCache: {},
});

export const hotelCacheReducer = (
  state: HotelCacheState,
  action: HotelCacheAction,
): HotelCacheState => {
  switch (action.type) {
    case "SET_SERVER_PAGE": {
      const { searchKey, page } = action.payload;

      if (state.searchKey !== searchKey) {
        return {
          ...createInitialHotelCacheState(searchKey),
          serverPage: page,
        };
      }

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
        serverTotalPages: Math.max(totalPages, 1),
        totalHotels,
        apiFilters: filters,
        pageCache: {
          ...baseState.pageCache,
          [page]: hotels,
        },
      };
    }

    case "UPDATE_FILTERS": {
      const { searchKey, filters } = action.payload;

      const baseState =
        state.searchKey === searchKey
          ? state
          : createInitialHotelCacheState(searchKey);

      return {
        ...baseState,
        apiFilters: filters,
        serverPage: 1,
        pageCache: {},
      };
    }

    case "RESET_CACHE": {
      return createInitialHotelCacheState(action.payload.searchKey);
    }

    default:
      return state;
  }
};