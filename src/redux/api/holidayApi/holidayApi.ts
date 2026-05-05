import { laravelApi } from "../laravelApi";
import type { GetToursParams, ToursApiResponse } from "@/types/holiday/types.tour";
import type { TourPackageDetailsApiResponse } from "@/types/holiday/types.tourPackage";
import type { TourPackagesListParams, TourPackagesListResponse } from "@/types/holiday/types.tourPackageLists";

export const holidayApi = laravelApi.injectEndpoints({
  endpoints: (builder) => ({
    getTours: builder.query<ToursApiResponse, GetToursParams>({
      query: (params) => ({
        url: "/tours",
        method: "GET",
        params,
      }),
    }),
    getTourPackagesList: builder.query<TourPackagesListResponse, TourPackagesListParams>({
      query: (params) => {
        const cleanParams = Object.fromEntries(
          Object.entries(params).filter(
            ([, value]) => value !== "" && value !== undefined && value !== null
          )
        );

        return {
          url: "/tours-packages",
          method: "GET",
          params: cleanParams,
        };
      },
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
  useGetTourPackagesListQuery,
  useGetTourPackageDetailsQuery
} = holidayApi;