import type { ApiResponse } from "@/types/types.common";
import { baseApi } from "../baseApi";
import type { Pagination, TourCollection } from "@/types/flight/flightHome.types";
export const flightTourCollectionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        flightTourCollectionLists: builder.query<ApiResponse<Pagination<TourCollection>>, void>({
            query: () => ({
                url: "/tour-collections",
                method: "GET",
            }),
        }),
        flightTourCollectionDetails: builder.query<ApiResponse<TourCollection>, number>({
            query: ({ id }) => ({
                url: "/tour-collections/id",
                method: "GET",
            }),
        }),
    }),
});

export const { useFlightTourCollectionListsQuery, useFlightTourCollectionDetailsQuery } = flightTourCollectionApi;


