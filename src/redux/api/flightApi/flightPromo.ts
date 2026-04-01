import { laravelApi } from "../laravelApi";
import type { ApiResponse, Pagination, Promotion } from "@/types/flight/flightHome.types";
export const flightPromoApi = laravelApi.injectEndpoints({
    endpoints: (builder) => ({
        flightPromoLists: builder.query<ApiResponse<Pagination<Promotion>>, void>({
            query: () => ({
                url: "/promotions",
                method: "GET",
            }),
        }),
        flightPromoDetails: builder.query<ApiResponse<Promotion>, number>({
            query: ( id ) => ({
                url: `/promotions/${id}`,
                method: "GET",
            }),
        }),
    }),
})

export const { useFlightPromoListsQuery, useFlightPromoDetailsQuery } = flightPromoApi;


