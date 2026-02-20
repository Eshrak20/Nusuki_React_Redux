import type { ContactFormData } from "@/types/types.form";
import { baseApi } from "./baseApi";

export const formSubApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postContactInfo: builder.mutation<{ message: string }, ContactFormData>({
      query: (formData) => ({
        url: "/contact",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { usePostContactInfoMutation } = formSubApi;
