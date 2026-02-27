import type { SignificanceResponse } from "@/types/hajj/types.sig";
import type { VisaRequirementsResponse } from "../../types/hajj/types.visa";
import { baseApi } from "./baseApi";
import type { HajjPackageApiResponse } from "@/types/hajj/types.pack";
import type { UmrahPackageDetailsResponse } from "@/types/umrah/types.umrah";

export const umrahApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUmrahVisa: builder.query<VisaRequirementsResponse, void>({
      query: () => ({
        url: "/umrah-visa-requirements",
        method: "GET",
      }),
    }),
    getUmrahSig: builder.query<SignificanceResponse, void>({
      query: () => ({
        url: "/umrah-significance",
        method: "GET",
      }),
    }),
    getUmrahPack: builder.query<HajjPackageApiResponse, void>({
      query: () => ({
        url: "/umrah-packages",
        method: "GET",
      }),
    }),
    getUmrahPackDetails: builder.query<UmrahPackageDetailsResponse, number>({
          query: (id) => ({
            url: `/umrah-packages/detail/${id}`,
            method: "GET",
          }),
        }),
  }),
});

export const {
  useGetUmrahVisaQuery,
  useGetUmrahSigQuery,
  useGetUmrahPackQuery,
  useGetUmrahPackDetailsQuery
} = umrahApi;
