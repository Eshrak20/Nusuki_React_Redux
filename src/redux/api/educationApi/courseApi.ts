import type { CourseApiResponse, CourseDetailsApiResponse, CourseQueryParams } from "@/types/education/type.course";
import { baseApi } from "../baseApi";

export const educationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCourses: builder.query<CourseApiResponse, CourseQueryParams >({
            query: ({ page = 1, study_level="", keyword = "" }) => ({
                url: "/courses",
                method: "GET",
                params: {
                    page,
                    study_level,
                    keyword,
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
    })

export const { useGetCoursesQuery, useGetCoursesDetailsQuery } = educationApi;


