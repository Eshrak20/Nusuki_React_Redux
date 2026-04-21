import type { FlightDetailApiResponse, FlightDetailRequest } from "@/types/flight/flightTicket.types";
import { laravelApi } from "../laravelApi";

export const flightTicketApi = laravelApi.injectEndpoints({
  endpoints: (builder) => ({
    flightDetailTicket: builder.query<FlightDetailApiResponse,FlightDetailRequest>({
      query: ({ flight_id, search_id }) => ({
        url: "/flights/detail",
        method: "GET",
        params: {
          flight_id,
          search_id,
        },
      }),
    }),
  }),
});

export const { useLazyFlightDetailTicketQuery } = flightTicketApi;