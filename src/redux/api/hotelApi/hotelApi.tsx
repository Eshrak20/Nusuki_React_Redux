import type {
  HotelSearchPayload,
  HotelSearchResponse,
} from "@/types/hotel/types.hotel";
import { laravelApi } from "../laravelApi";

export type HotelDetailPayload = {
  search_id: string;
  hotel_id: string;
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
  }),
});

export const {
  useSearchHotelsMutation,
  useGetHotelDetailMutation,
} = hotelApi;