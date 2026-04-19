/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FlightSearchRequest } from "@/types/flight/flightSearch.types";
import { laravelApi } from "../laravelApi";
import type { ApiResponse, Pagination, SearchDests } from "@/types/flight/flightHome.types";
export const flightSearchApi = laravelApi.injectEndpoints({
    endpoints: (builder) => ({
        flightSearchLists: builder.query<ApiResponse<Pagination<SearchDests>>, void>({
            query: () => ({
                url: "/airports",
                method: "GET",
            }),
        }),
        flightSearchTicketLists: builder.query<any, FlightSearchRequest>({
            query: (body) => ({
                url: "/flights/search", // Ensure full path is correct
                method: "POST",
                body, // Use the actual parameter here
            }),
        }),
    }),
});

export const { useFlightSearchListsQuery, useFlightSearchTicketListsQuery } = flightSearchApi;