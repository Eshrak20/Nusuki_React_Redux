import type { ApiResponse } from "@/types/types.common";
import { laravelApi } from "../laravelApi";
import type { Pagination, TourPackage } from "@/types/flight/flightHome.types";
export const flightTourApi = laravelApi.injectEndpoints({
    endpoints: (builder) => ({
        flightTourLists: builder.query<ApiResponse<Pagination<TourPackage>>, void>({
            query: () => ({
                url: "/tour-packages",
                method: "GET",
            }),
        }),
        flightTourDetails: builder.query<ApiResponse<TourPackage>, number>({
            query: ( id ) => ({
                url: `/tour-packages/${id}`,
                method: "GET",
            }),
        }),
    }),
})

export const { useFlightTourListsQuery,useFlightTourDetailsQuery } = flightTourApi;


