import type {
  HotelDetailPayload,
  HotelSearchPayload,
  HotelSearchResponse,
  PlaceAutocompleteArgs,
  PlaceAutocompleteResponse,
} from "@/types/hotel/types.hotel";

import { laravelApi } from "../laravelApi";

import type {
  HotelPriceCheckResponse,
  PriceCheckRequest,
} from "@/types/hotel/type.room.types";

export type HotelDetailResponse = {
  success: boolean;
  message: string;
  code: number;
  data?: {
    search_id?: string;
    hotel?: any;
    stay?: any;
    rooms?: any[];
  };
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

    getHotelDetail: builder.mutation<HotelDetailResponse, HotelDetailPayload>({
      query: (body) => ({
        url: "/hotels/detail",
        method: "POST",
        body,
      }),
    }),

    getPlaceAutoComplete: builder.query<
      PlaceAutocompleteResponse,
      PlaceAutocompleteArgs
    >({
      query: ({ keyword, limit = 20 }) => ({
        url: "/hotels/place-autocomplete",
        method: "GET",
        params: {
          keyword,
          limit,
        },
      }),
    }),

    getPriceCheck: builder.mutation<HotelPriceCheckResponse, PriceCheckRequest>(
      {
        query: (body) => ({
          url: "/hotels/price-check",
          method: "POST",
          body,
        }),
      },
    ),
  }),

  overrideExisting: true,
});

export const {
  useSearchHotelsMutation,
  useGetHotelDetailMutation,
  useGetPriceCheckMutation,
  useLazyGetPlaceAutoCompleteQuery,
} = hotelApi;
