import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://127.0.0.1:8000/api",
    baseUrl: "http://192.168.10.33:8000/api/",


    credentials: "include",
  }),
  tagTypes: ["Flight", "Hajj", "Umrah", "Visa"],
  endpoints: () => ({}),
});
