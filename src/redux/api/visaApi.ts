import type {
  VisaApiResponse,
  VisaQueryParams,
  VisaDetailsApiResponse,
  VisaAssistanceApiResponse
} from "@/types/visa/types.visa";
import { laravelApi } from "./laravelApi";

export const visaApi = laravelApi.injectEndpoints({
  endpoints: (builder) => ({

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

    getVisaDetails: builder.query<VisaDetailsApiResponse, string>({
      query: (id) => ({
        url: `/visas/${id}`,
        method: "GET",
      }), 
    }),
    getVisaAssistance: builder.query<VisaAssistanceApiResponse, void>({
      query: () => ({
        url: `/visa-assistance`,
        method: "GET",
      }), 
    }),
  }),
});

export const { useGetVisasQuery, useGetVisaDetailsQuery, useGetVisaAssistanceQuery } = visaApi;