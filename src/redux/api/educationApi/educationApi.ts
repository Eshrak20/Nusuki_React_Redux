import { laravelApi } from "../laravelApi";
import type { DestinationApiResponse, DestinationQueryParams } from "@/types/education/type.country";

export const destinationApi = laravelApi.injectEndpoints({
    endpoints: (builder) => ({
        getCountries: builder.query<DestinationApiResponse, DestinationQueryParams>({
            query: ({ country = "" }) => ({
                url: "/country-details",
                method: "GET",
                params: {
                    country,
                },
            }),
        }),
    }),
});

export const { useGetCountriesQuery } = destinationApi;


