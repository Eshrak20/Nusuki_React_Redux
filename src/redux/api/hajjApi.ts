import type { SignificanceResponse } from "@/types/hajj/types.sig";
import type { VisaRequirementsResponse } from "../../types/hajj/types.visa";
import { baseApi } from "./baseApi";
import type { HajjUmPackagesResponse } from "@/types/hajj/types.pack";

export const hajjApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getHajjVisa: builder.query<VisaRequirementsResponse, void>({
      query: () => ({
        url: "/hajj-visa-requirements",
        method: "GET",
      }),
      providesTags: ["Hajj"],
    }),
    getHajjPreRegister: builder.query<VisaRequirementsResponse, void>({
      query: () => ({
        url: "/hajj-pre-registration",
        method: "GET",
      }),
      providesTags: ["Hajj"],
    }),
    getHajjSig: builder.query<SignificanceResponse, void>({
      query: () => ({
        url: "/hajj-significance",
        method: "GET",
      }),
      providesTags: ["Hajj"],
    }),
    getHajjPack: builder.query<HajjUmPackagesResponse, void>({
      query: () => ({
        url: "/hajj-packages",
        method: "GET",
      }),
      providesTags: ["Hajj"],
    }),
  }),
});

export const {
  useGetHajjVisaQuery,
  useGetHajjPreRegisterQuery,
  useGetHajjSigQuery,
  useGetHajjPackQuery,
} = hajjApi;
