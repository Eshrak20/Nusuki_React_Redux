import type {
  VisaApiResponse,
  VisaQueryParams,
  VisaDetailsApiResponse
} from "@/types/visa/types.visa";
import { baseApi } from "./baseApi";

export const visaApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 2. Updated to use VisaQueryParams instead of void
    getVisas: builder.query<VisaApiResponse, VisaQueryParams>({
      query: ({
        page = 1,
        visa_category = "",
        country = "",
      }) => ({
        url: "/visas",
        method: "GET",
        params: {
          page,
          visa_category,
          country,
        }
      }),
    }),

    // 3. Removed the extra 'void' type argument and updated the return type
    getVisaDetails: builder.query<VisaDetailsApiResponse, string>({
      // We can just pass the string directly instead of an object { id: string }
      query: (id) => ({
        url: `/visas/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetVisasQuery, useGetVisaDetailsQuery } = visaApi;