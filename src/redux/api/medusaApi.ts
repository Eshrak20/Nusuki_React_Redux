import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const medusaApi = createApi({
    reducerPath: "medusaApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:9000/store",
    }),
    endpoints: () => ({}),
});
