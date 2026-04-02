import { laravelApi } from "../laravelApi";
import type { ApiResponse, Pagination, TourCollection } from "@/types/flight/flightHome.types";
export const flightTourCollectionApi = laravelApi.injectEndpoints({
    endpoints: (builder) => ({
        flightTourCollectionLists: builder.query<ApiResponse<Pagination<TourCollection>>, void>({
            query: () => ({
                url: "/tour-collections",
                method: "GET",
            }),
        }),
        flightTourCollectionDetails: builder.query<ApiResponse<TourCollection>, number>({
            query: (id) => ({
                url: `/tour-collections/${id}`,
                method: "GET",
            }),
        }),
    }),
});

export const { useFlightTourCollectionListsQuery, useFlightTourCollectionDetailsQuery } = flightTourCollectionApi;


