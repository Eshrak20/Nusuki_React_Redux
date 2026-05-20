import type {
  HotelDetailPayload,
  HotelSearchPayload,
  HotelSearchResponse,
  PlaceAutocompleteArgs,
  PlaceAutocompleteResponse,
} from "@/types/hotel/types.hotel";
import { laravelApi } from "../laravelApi";



export const hotelApi = laravelApi.injectEndpoints({
  endpoints: (builder) => ({
    searchHotels: builder.mutation<HotelSearchResponse, HotelSearchPayload>({
      query: (body) => ({
        url: "/hotels/search",
        method: "POST",
        body,
      }),
    }),

    getHotelDetail: builder.mutation<void, HotelDetailPayload>({
      query: (body) => ({
        url: "/hotels/detail",
        method: "POST",
        body,
      }),
    }),

    getPlaceAutoComplete: builder.query<PlaceAutocompleteResponse, PlaceAutocompleteArgs>({
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