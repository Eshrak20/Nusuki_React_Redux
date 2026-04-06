import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const medusaApi = createApi({
  reducerPath: "medusaApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9000/store",
    // baseUrl: "http://192.168.10.215:9000/store",

    prepareHeaders: (headers) => {
      headers.set(
        "x-publishable-api-key",
        import.meta.env.VITE_MEDUSA_PUBLISHABLE_KEY
      );
      return headers;
    },
  }),
  tagTypes: ['Cart'], 
  endpoints: () => ({}),
});