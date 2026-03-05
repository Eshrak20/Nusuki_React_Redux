import type { Course, CourseApiResponse, CourseQueryParams } from "@/types/education/type.course";
import { baseApi } from "../baseApi";

export const educationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCourses: builder.query<CourseApiResponse, CourseQueryParams | void>({
            query: () => ({
                url: "/courses",
                method: "GET",
            }),
        }),
        getCoursesDetails: builder.query<Course, { id: string }>({
                query: ({ id }) => ({
                    url: `/courses/${id}`,
                    method: "GET",
                }),
            }),
    }),
});

export const { useGetCoursesQuery, useGetCoursesDetailsQuery } = educationApi;


