import type { 
    TestPreparationsApiResponse, 
    TestDetailsApiResponse, 
    TestPreparationQueryParams,
    ExpertsApiResponse 
} from "@/types/education/type.tests"; // 👈 Update this path to match your file structure
import { baseApi } from "../baseApi";

export const educationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // 1. Fetch the paginated list of tests
        getTests: builder.query<TestPreparationsApiResponse, TestPreparationQueryParams | void>({
            query: (params) => ({
                url: "/test-preparations",
                method: "GET",
                params: params ? params : undefined,
            }),
        }),
        
        // 2. Fetch the deep details of a single test by ID
        getTestsDetails: builder.query<TestDetailsApiResponse, { id: string | number }>({
            query: ({ id }) => ({
                url: `/test-preparations/${id}`,
                method: "GET",
            }),
        }),
        
        // 3. Fetch the list of experts
        getExperts: builder.query<ExpertsApiResponse, void>({
            query: () => ({
                url: `/our-expert-teams`,
                method: "GET",
            }),
        }),
    }),
    overrideExisting: false, // Optional: useful if you are hot-reloading
});

export const { 
    useGetTestsQuery, 
    useGetTestsDetailsQuery, 
    useGetExpertsQuery 
} = educationApi;