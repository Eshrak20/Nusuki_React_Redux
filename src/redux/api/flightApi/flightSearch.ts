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
    }),
});

export const { useFlightSearchListsQuery } = flightSearchApi;