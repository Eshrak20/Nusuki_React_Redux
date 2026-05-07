import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://engine.nusukibd.com/api/";

const getAuthToken = () => {
  return (
    localStorage.getItem("token") ||
    sessionStorage.getItem("token") ||
    localStorage.getItem("authToken") ||
    sessionStorage.getItem("authToken") ||
    localStorage.getItem("access_token") ||
    sessionStorage.getItem("access_token")
  );
};

export const laravelApi = createApi({
  reducerPath: "laravelApi",

  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    credentials: "include",

    prepareHeaders: (headers) => {
      const token = getAuthToken();

      headers.set("Accept", "application/json");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  tagTypes: ["UserProfile"],

  endpoints: () => ({}),
});