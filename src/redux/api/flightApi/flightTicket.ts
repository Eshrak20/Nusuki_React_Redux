// import type { FlightSearchRequest } from "@/types/flight/flightSearch.types";
// import { laravelApi } from "../laravelApi";
// export const flightTicketApi = laravelApi.injectEndpoints({
//     endpoints: (builder) => ({
//         flightSearchTicketLists: builder.query<any, FlightSearchRequest>({
//             query: (body) => ({
//                 url: "/flights/search",
//                 method: "POST",
//                 body,
//             }),
//         }),
//     }),
// });

// export const { useFlightSearchListsQuery } = flightTicketApi;