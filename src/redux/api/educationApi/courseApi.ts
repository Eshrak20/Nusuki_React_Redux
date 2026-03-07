import type { Course, CourseApiResponse, CourseDetailsApiResponse, CourseQueryParams } from "@/types/education/type.course";
import { baseApi } from "../baseApi";

export const educationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCourses: builder.query<CourseApiResponse, CourseQueryParams | void>({
            query: ({ page = 1, keyword = "", country = "" }) => ({
                url: "/courses",
                method: "GET",
                params: {
                    page,
                    keyword,
                    country,
                }
            }),
        }),
        getCoursesDetails: builder.query<CourseDetailsApiResponse, { id: string }>({
                query: ({ id }) => ({
                    url: `/courses/${id}`,
                    method: "GET",
                }),
            }),
    }),
});

export const { useGetCoursesQuery, useGetCoursesDetailsQuery } = educationApi;


