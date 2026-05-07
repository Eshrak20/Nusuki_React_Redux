import { laravelApi } from "@/redux/api/laravelApi";
import type { FlightBookingDetailResponse, FlightBookingHistoryResponse, GetFlightBookingsParams } from "@/types/flight/flightBooking.types";
import type { CreatePnrRequest, CreatePnrResponse } from "@/types/flight/flightBookingPNR.types";
import type { CancelAirTicketRequest, CancelAirTicketResponse, IssueAirTicketRequest, IssueAirTicketResponse } from "@/types/flight/flightTicketPayment.types";


export const flightBookingApi = laravelApi.injectEndpoints({
  endpoints: (builder) => ({
    getFlightBookings: builder.query<FlightBookingHistoryResponse, GetFlightBookingsParams | void>({
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
    createPnr: builder.mutation<CreatePnrResponse, CreatePnrRequest>({
      query: (body) => ({
        url: "flights/create-pnr",
        method: "POST",
        body,
      }),
      invalidatesTags: ["UserProfile"],
    }),
    issueAirTicket: builder.mutation<IssueAirTicketResponse, IssueAirTicketRequest>({
      query: (body) => ({
        url: "flights/issue-air-ticket",
        method: "POST",
        body,
      }),
      invalidatesTags: ["FlightBookings"],
    }),
    cancelAirTicket: builder.mutation<CancelAirTicketResponse, CancelAirTicketRequest>({
      query: (body) => ({
        url: "flights/cancel-air-ticket",
        method: "POST",
        body,
      }),
      invalidatesTags: ["FlightBookings"],
    }),
  }),
});

export const {
  useGetFlightBookingsQuery,
  useGetFlightBookingDetailsQuery,
  useCreatePnrMutation,
  useIssueAirTicketMutation,
  useCancelAirTicketMutation,
} = flightBookingApi;