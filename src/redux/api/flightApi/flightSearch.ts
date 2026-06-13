import type { FlightSearchRequest } from "@/types/flight/flightSearch.types";
import { laravelApi } from "../laravelApi";
import type { ApiResponse, FlightSearchListsParams, Pagination, SearchDests } from "@/types/flight/flightHome.types";
import type { FlightSearchApiResponse } from "@/types/flight/flightResults.types";

export const flightSearchApi = laravelApi.injectEndpoints({
    endpoints: (builder) => ({
        flightSearchLists: builder.query<ApiResponse<Pagination<SearchDests>>, FlightSearchListsParams | void>({
            query: (params) => {
                const page = params?.page ?? 1;
                const size = params?.size ?? 10;
                const search = params?.search?.trim();

                return {
                    url: "/airports",
                    method: "GET",
                    params: {
                        page,
                        size,
                        ...(search ? { search } : {}),
                    },
                };
            },
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

export const { useFlightSearchListsQuery, useLazyFlightSearchListsQuery, useFlightSearchTicketListsQuery, } = flightSearchApi;