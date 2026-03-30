import type { ApiResponse } from "@/types/types.common";
import { laravelApi } from "../laravelApi";
import type { Destination, Pagination } from "@/types/flight/flightHome.types";
export const flightDestinationApi = laravelApi.injectEndpoints({
    endpoints: (builder) => ({
        flightDestinationLists: builder.query<ApiResponse<Pagination<Destination>>, void>({
            query: () => ({
                url: "/destinations",
                method: "GET",
            }),
        }),
        flightDestinationDetails: builder.query<ApiResponse<Destination>, number>({
            query: (id) => ({
                url: `/destinations/${id}`,
                method: "GET",
            }),
        }),
    }),
});

export const { useFlightDestinationListsQuery, useFlightDestinationDetailsQuery } = flightDestinationApi;


