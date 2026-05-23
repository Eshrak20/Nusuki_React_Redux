import type {
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
import type {
  CreateHotelBookingRequest,
  HotelBookingResponse,
} from "@/types/hotel/hotelBooking.types";
import type { HotelBookingListResponse } from "@/types/hotel/hotelBookingList.types";
import type { HotelBookingDetailResponse } from "@/types/hotel/hotelBookingDetails.types";
import type { HotelDetailPayload, HotelDetailResponse } from "@/types/hotel/hotelDetail.types";



export const hotelApi = laravelApi.injectEndpoints({
  endpoints: (builder) => ({
    getHotelDetail: builder.mutation<HotelDetailResponse, HotelDetailPayload>({
      query: (body) => ({
        url: "/hotels/detail",
        method: "POST",
        body,
      }),
    }),
    searchHotels: builder.mutation<HotelSearchResponse, HotelSearchPayload>({
      query: (body) => ({
        url: "/hotels/search",
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
    createHotelBooking: builder.mutation<
      HotelBookingResponse,
      CreateHotelBookingRequest
    >({
      query: (body) => ({
        url: "/hotels/book",
        method: "POST",
        body,
      }),
    }),
    listHotelBooking: builder.query<
      HotelBookingListResponse,
      { page?: number; per_page?: number }
    >({
      query: ({ page = 1, per_page = 15 }) => ({
        url: "/hotels/bookings",
        method: "GET",
        params: {
          page,
          per_page,
        },
      }),
    }),
    getHotelBookingDetails: builder.query<
      HotelBookingDetailResponse,
      number | string
    >({
      query: (id) => ({
        url: `/hotels/bookings/${id}`,
        method: "GET",
      }),
    }),
  }),

  overrideExisting: true,
});

export const {
  useSearchHotelsMutation,
  useGetHotelDetailMutation,
  useGetPriceCheckMutation,
  useCreateHotelBookingMutation,
  useListHotelBookingQuery,
  useGetHotelBookingDetailsQuery,
  useLazyGetPlaceAutoCompleteQuery,
} = hotelApi;
