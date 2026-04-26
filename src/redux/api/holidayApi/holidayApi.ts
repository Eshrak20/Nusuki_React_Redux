import { laravelApi } from "../laravelApi";
import type { ToursApiResponse } from "@/types/holiday/types.tour";
import type { TourPackageDetailsApiResponse } from "@/types/holiday/types.tourPackage";

export const holidayApi = laravelApi.injectEndpoints({
  endpoints: (builder) => ({
    getTours: builder.query<ToursApiResponse, void>({
      query: () => ({
        url: "/tours",
        method: "GET",
      }),
    }),

    getTourPackageDetails: builder.query<TourPackageDetailsApiResponse, number | string>({
      query: (id) => ({
        url: `/tours-packages/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetToursQuery,
  useGetTourPackageDetailsQuery,
} = holidayApi;