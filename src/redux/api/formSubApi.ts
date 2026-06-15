import type { ContactFormData } from "@/types/types.form";
import { laravelApi } from "./laravelApi";

export const formSubApi = laravelApi.injectEndpoints({
  endpoints: (builder) => ({
    postContactInfo: builder.mutation<{ message: string }, ContactFormData>({
      query: (formData) => ({
        url: "/contact",
        method: "POST",
        body: formData,
      }),
    }),
    postCouncellingInfo: builder.mutation<{ message: string }, ContactFormData>({
      query: (formData) => ({
        url: "/councelling-request",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { usePostContactInfoMutation, usePostCouncellingInfoMutation } = formSubApi;
