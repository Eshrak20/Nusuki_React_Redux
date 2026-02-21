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
    }),
    getHajjPreRegister: builder.query<VisaRequirementsResponse, void>({
      query: () => ({
        url: "/hajj-pre-registration",
        method: "GET",
      }),
    }),
    getHajjSig: builder.query<SignificanceResponse, void>({
      query: () => ({
        url: "/hajj-significance",
        method: "GET",
      }),
    }),
    getHajjPack: builder.query<HajjUmPackagesResponse, void>({
      query: () => ({
        url: "/hajj-packages",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetHajjVisaQuery,
  useGetHajjPreRegisterQuery,
  useGetHajjSigQuery,
  useGetHajjPackQuery,
} = hajjApi;
