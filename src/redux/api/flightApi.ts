// import { baseApi } from "./baseApi";
// import { env } from "../../config/env";
// import { mockFlightOffersResponse } from "../../mock/flight/flightOffers.mock";
// import type { FlightOffersResponse } from "../../types/types.flight";

// export const flightApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     getExclusiveFlightOffers: builder.query<FlightOffersResponse, void>({
//       queryFn: async (_arg, _api, _extraOptions, baseQuery) => {
//         // ✅ MOCK MODE
//         if (env.useMock) {
//           return { data: mockFlightOffersResponse };
//         }

//         // ✅ REAL API MODE
//         const result = await baseQuery({
//           url: "/flights/exclusive-offers",
//           method: "GET",
//         });

//         return result as { data: FlightOffersResponse };
//       },

//       providesTags: ["Flight"],
//     }),
//   }),
// });

// export const { useGetExclusiveFlightOffersQuery } = flightApi;
