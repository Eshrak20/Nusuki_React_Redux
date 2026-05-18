import type { HotelSearchPayload, HotelSearchResponse } from "@/types/hotel/types.hotel";
import { laravelApi } from "../laravelApi";
export const hotelApi = laravelApi.injectEndpoints({
  endpoints: (builder) => ({
    searchHotels: builder.mutation<HotelSearchResponse, HotelSearchPayload>({
      query: (body) => ({
        url: "/search",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useSearchHotelsMutation } = hotelApi;