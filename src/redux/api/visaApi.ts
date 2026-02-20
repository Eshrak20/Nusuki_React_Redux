import type { CmnCardSliderListResponse } from "@/types/visa/types.cmnCardSliderList";
import { baseApi } from "./baseApi";

export const visaApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getVisaTourPackages: builder.query<CmnCardSliderListResponse, void>({
      query: () => ({
        url: "/visa/tour-packages",
        method: "GET",
      }),
      providesTags: ["Visa"],
    }),
    getVisaServices: builder.query<CmnCardSliderListResponse, void>({
      query: () => ({
        url: "/visa/services",
        method: "GET",
      }),
      providesTags: ["Visa"],
    }),
  }),
});

export const { useGetVisaTourPackagesQuery, useGetVisaServicesQuery } = visaApi;
