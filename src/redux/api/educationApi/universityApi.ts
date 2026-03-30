import type { UniversityApiResponse, UniversityQueryParams } from "@/types/education/type.uni";
import { laravelApi } from "../laravelApi";
import type { UniversityDetailsResponse } from "@/types/education/type.uniDet";

export const educationApi = laravelApi.injectEndpoints({
    endpoints: (builder) => ({
        getUniversities: builder.query<UniversityApiResponse, UniversityQueryParams>({
            query: ({ page = 1, keyword = "", country = "" }) => ({
                url: "/universities",
                method: "GET", 
                params: {
                    page,
                    keyword,
                    country,
                },
            }),
        }),
        getUniversitiesDetails: builder.query<UniversityDetailsResponse, { id: string }>({
            query: ({ id }) => ({
                url: `/universities/${id}`,
                method: "GET",
            }),
        }),
    }),
});

export const { useGetUniversitiesQuery, useGetUniversitiesDetailsQuery } = educationApi;


