import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://engine.nusukibd.com/api/";

export const laravelApi = createApi({
  reducerPath: "laravelApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    credentials: "include",
  }),
  endpoints: () => ({}),
});