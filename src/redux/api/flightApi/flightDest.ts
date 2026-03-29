import type { ApiResponse } from "@/types/types.common";
import { baseApi } from "../baseApi";
import type { Destination, Pagination } from "@/types/flight/flightHome.types";
export const flightDestinationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        flightDestinationLists: builder.query<ApiResponse<Pagination<Destination>>, void>({
            query: () => ({
                url: "/destinations",
                method: "GET",
            }),
        }),
        flightDestinationDetails: builder.query<ApiResponse<Destination>, number>({
            query: ({ id }) => ({
                url: "/destinations/id",
                method: "GET",
            }),
        }),
    }),
});

export const { useFlightDestinationListsQuery, useFlightDestinationDetailsQuery } = flightDestinationApi;


