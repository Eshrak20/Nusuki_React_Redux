import { laravelApi } from "@/redux/api/laravelApi";

import type {
  FlightBookingDetailResponse,
  FlightBookingHistoryResponse,
  GetFlightBookingsParams,
} from "@/types/flight/flightBooking.types";

import type { CreatePnrResponse } from "@/types/flight/flightBookingPNR.types";
import type { FlightDetailApiResponse, FlightDetailRequest } from "@/types/flight/flightTicket.types";

import type {
  CancelAirTicketRequest,
  CancelAirTicketResponse,
  InitiateFlightPaymentRequest,
  InitiateFlightPaymentResponse,
  IssueAirTicketRequest,
  IssueAirTicketResponse,
} from "@/types/flight/flightTicketPayment.types";

import type { CreatePnrPayload } from "@/types/flight/myTravellers.types";


export const flightBookingApi = laravelApi.injectEndpoints({
  endpoints: (builder) => ({
    getFlightBookings: builder.query<
      FlightBookingHistoryResponse,
      GetFlightBookingsParams | void
    >({
      query: (params) => {
        const page = params?.page ?? 1;
        const size = params?.size ?? 10;

        return {
          url: `flights/bookings?page=${page}&size=${size}`,
          method: "GET",
        };
      },
      providesTags: ["FlightBookings", "MyTravellers"],
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

    getFlightDetail: builder.query<FlightDetailApiResponse, FlightDetailRequest>(
      {
        query: ({ flight_id, search_id }) => ({
          url: "flights/detail",
          method: "GET",
          params: {
            flight_id,
            search_id,
          },
        }),
      },
    ),

    createPnr: builder.mutation<CreatePnrResponse, CreatePnrPayload>({
      query: (body) => ({
        url: "flights/create-pnr",
        method: "POST",
        body,
      }),
      invalidatesTags: ["MyTravellers"],
    }),

    cancelAirTicket: builder.mutation<
      CancelAirTicketResponse,
      CancelAirTicketRequest
    >({
      query: (body) => ({
        url: "flights/cancel-booking",
        method: "POST",
        body,
      }),
      invalidatesTags: ["FlightBookings", "MyTravellers"],
    }),

    initiateFlightBookingPayment: builder.mutation<
      InitiateFlightPaymentResponse,
      InitiateFlightPaymentRequest
    >({
      query: ({ bookingCode }) => ({
        url: `/flights/bookings/${bookingCode}/initiate-payment`,
        method: "POST",
      }),
      invalidatesTags: ["FlightBookings"],
    }),

    //! This will be deleted issue ticket
    issueAirTicket: builder.mutation<
      IssueAirTicketResponse,
      IssueAirTicketRequest
    >({
      query: (body) => ({
        url: "flights/issue-air-ticket",
        method: "POST",
        body,
      }),
      invalidatesTags: ["FlightBookings", "MyTravellers"],
    }),
  }),
});

export const {
  useGetFlightBookingsQuery,
  useGetFlightBookingDetailsQuery,
  useGetFlightDetailQuery,
  useIssueAirTicketMutation,
  useCancelAirTicketMutation,
  useCreatePnrMutation,
  useInitiateFlightBookingPaymentMutation,
} = flightBookingApi;