import type { ApiResponse } from "@/types/types.common";
import { baseApi } from "../baseApi";
import type { Pagination, Promotion } from "@/types/flight/flightHome.types";
export const flightPromoApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        flightPromoLists: builder.query<ApiResponse<Pagination<Promotion>>, void>({
            query: () => ({
                url: "/promotions",
                method: "GET",
            }),
        }),
        flightPromoDetails: builder.query<ApiResponse<Promotion>, number>({
            query: ({ id }) => ({
                url: "/promotions/id",
                method: "GET",
            }),
        }),
    }),
})

export const { useFlightPromoListsQuery, useFlightPromoDetailsQuery } = flightPromoApi;


