import { laravelApi } from "@/redux/api/laravelApi";
import type { FlightBookingDetailResponse, FlightBookingHistoryResponse, GetFlightBookingsParams } from "@/types/flight/flightBooking.types";


export const flightBookingApi = laravelApi.injectEndpoints({
  endpoints: (builder) => ({
    getFlightBookings: builder.query<FlightBookingHistoryResponse,GetFlightBookingsParams | void>({
      query: (params) => {
        const page = params?.page ?? 1;
        const size = params?.size ?? 10;

        return {
          url: `flights/bookings?page=${page}&size=${size}`,
          method: "GET",
        };
      },
      providesTags: ["FlightBookings"],
    }),

    getFlightBookingDetails: builder.query<FlightBookingDetailResponse, number>({
      query: (bookingId) => ({
        url: `flights/bookings/${bookingId}`,
        method: "GET",
      }),
      providesTags: (_result, _error, bookingId) => [
        { type: "FlightBookings", id: bookingId },
      ],
    }),
  }),
});

export const {
  useGetFlightBookingsQuery,
  useGetFlightBookingDetailsQuery,
} = flightBookingApi;