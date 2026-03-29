import type { ApiResponse } from "@/types/types.common";
import { baseApi } from "../baseApi";
import type { Pagination, TourPackage } from "@/types/flight/flightHome.types";
export const flightTourApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        flightTourLists: builder.query<ApiResponse<Pagination<TourPackage>>, void>({
            query: () => ({
                url: "/tour-packages",
                method: "GET",
            }),
        }),
        flightTourDetails: builder.query<ApiResponse<TourPackage>, number>({
            query: ({ id }) => ({
                url: "/tour-packages/id",
                method: "GET",
            }),
        }),
    }),
})

export const { useFlightTourListsQuery,useFlightTourDetailsQuery } = flightTourApi;


