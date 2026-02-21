import type { UniversityApiResponse, UniversityQueryParams } from "@/types/education/type.uni";
import { baseApi } from "../baseApi";

export const educationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUniversities: builder.query<UniversityApiResponse,UniversityQueryParams>({
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
    }),
});

export const { useGetUniversitiesQuery, } = educationApi;


