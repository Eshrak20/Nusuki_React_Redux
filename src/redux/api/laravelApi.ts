import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const laravelApi = createApi({
  reducerPath: "laravelApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://nusuki.downtown-bd.com/api/",
    // baseUrl: "https://engine.nusukibd.com/api/",
    credentials: "include",
  }),
  endpoints: () => ({}),
});
