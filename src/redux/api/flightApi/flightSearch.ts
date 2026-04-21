import type { FlightSearchRequest } from "@/types/flight/flightSearch.types";
import { laravelApi } from "../laravelApi";
import type { ApiResponse, Pagination, SearchDests } from "@/types/flight/flightHome.types";
import type { FlightSearchApiResponse } from "@/types/flight/flightResults.types";
export const flightSearchApi = laravelApi.injectEndpoints({
    endpoints: (builder) => ({
        flightSearchLists: builder.query<ApiResponse<Pagination<SearchDests>>, void>({
            query: () => ({
                url: "/airports",
                method: "GET",
            }),
        }),
        flightSearchTicketLists: builder.query<FlightSearchApiResponse, FlightSearchRequest>({
            query: (body) => ({
                url: "/flights/search",
                method: "POST",
                body,
            }),
        }),
    }),
});

export const { useFlightSearchListsQuery, useFlightSearchTicketListsQuery } = flightSearchApi;