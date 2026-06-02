import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

import { logout } from "@/redux/features/auth/authSlice";

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

const rawBaseQuery = fetchBaseQuery({
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
});

const isLogoutRequest = (args: string | FetchArgs) => {
  if (typeof args === "string") {
    return args.includes("logout");
  }

  return String(args.url).includes("logout");
};

const baseQueryWithAuthCheck: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  const isAuthError =
    result.error?.status === 401 || result.error?.status === 403;

  if (isAuthError) {
    api.dispatch(logout());

    const currentPath = window.location.pathname;
    const shouldSkipRedirect =
      currentPath === "/login" || isLogoutRequest(args);

    if (!shouldSkipRedirect) {
      window.location.href = `/login?redirect=${encodeURIComponent(
        currentPath,
      )}`;
    }
  }

  return result;
};

export const laravelApi = createApi({
  reducerPath: "laravelApi",
  baseQuery: baseQueryWithAuthCheck,
  tagTypes: ["UserProfile", "FlightBookings","MyTravellers"],
  endpoints: () => ({}),
});