import type {
  HotelSearchPayload,
  HotelSearchResponse,
} from "@/types/hotel/types.hotel";
import { laravelApi } from "../laravelApi";

export type HotelDetailPayload = {
  search_id: string;
  hotel_id: string;
};

export type PlaceAutocompleteArgs = {
  keyword: string;
  limit?: number; 
};

export const hotelApi = laravelApi.injectEndpoints({
  endpoints: (builder) => ({
    searchHotels: builder.mutation<HotelSearchResponse, HotelSearchPayload>({
      query: (body) => ({
        url: "/hotels/search",
        method: "POST",
        body,
      }),
    }),

    getHotelDetail: builder.mutation<any, HotelDetailPayload>({
      query: (body) => ({
        url: "/hotels/detail",
        method: "POST",
        body,
      }),
    }),

    getPlaceAutoComplete: builder.query<any, PlaceAutocompleteArgs>({
      query: ({ keyword, limit = 20 }) => ({
        url: "/hotels/place-autocomplete",
        method: "GET",
        params: {
          keyword,
          limit,
        },
      }),
    }),
  }),
});

export const {
  useSearchHotelsMutation,
  useGetHotelDetailMutation,
  // CHANGED TO LAZY FOR ON-CHANGE TYPING EVENTS:
  useLazyGetPlaceAutoCompleteQuery, 
} = hotelApi;