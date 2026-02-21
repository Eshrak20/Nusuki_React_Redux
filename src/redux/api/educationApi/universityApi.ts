import type { UniversityApiResponse, UniversityQueryParams } from "@/types/education/type.uni";
import { baseApi } from "../baseApi";

export const hajjApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUniversities: builder.query<UniversityApiResponse, UniversityQueryParams>({
            query: () => ({
                url: "/universities",
                method: "GET",
            }),
        }),
    }),
});

export const { useGetUniversitiesQuery, } = hajjApi;


