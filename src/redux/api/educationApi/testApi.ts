import type {
    TestPreparationsApiResponse,
    TestDetailsApiResponse,
    TestPreparationQueryParams,
    ExpertsApiResponse
} from "@/types/education/type.tests";
import { laravelApi } from "../laravelApi";

export const educationApi = laravelApi.injectEndpoints({
    endpoints: (builder) => ({
        getTests: builder.query<TestPreparationsApiResponse, TestPreparationQueryParams>({
            query: ({ page = 1, examType = "" }) => ({
                url: "/test-preparations",
                method: "GET",
                params: {
                    page,
                    examType,
                }
            }),
        }),

        getTestsDetails: builder.query<TestDetailsApiResponse, { id: string }>({
            query: ({ id }) => ({
                url: `/test-preparations/${id}`,
                method: "GET",
            }),
        }),

        getExperts: builder.query<ExpertsApiResponse, void>({
            query: () => ({
                url: `/our-expert-teams`,
                method: "GET",
            }),
        }),
    }),
});

export const {
    useGetTestsQuery,
    useGetTestsDetailsQuery,
    useGetExpertsQuery
} = educationApi;