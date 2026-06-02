import type { MyTravellerFormPayload, MyTravellerResponse, MyTravellersResponse } from "@/types/flight/myTravellers.types";
import { laravelApi } from "../laravelApi";
export const myTravellersApi = laravelApi.injectEndpoints({
    endpoints: (builder) => ({
        getMyTravellers: builder.query<MyTravellersResponse, void>({
            query: () => ({
                url: "my-travellers",
                method: "GET",
            }),
            providesTags: ["MyTravellers"],
        }),

        createMyTraveller: builder.mutation<MyTravellerResponse, MyTravellerFormPayload>({
            query: (body) => ({
                url: "my-travellers",
                method: "POST",
                body,
            }),
            invalidatesTags: ["MyTravellers"],
        }),
        updateMyTraveller: builder.mutation<MyTravellersResponse, { id: number; body: MyTravellerFormPayload }>({
            query: ({ id, body }) => ({
                url: `my-travellers/${id}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: ["MyTravellers"],

        }),

        deleteMyTraveller: builder.mutation<{ success: boolean; message: string }, number>({
            query: (id) => ({
                url: `my-travellers/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["MyTravellers"],
        }),
    }),
})

export const { useGetMyTravellersQuery, useCreateMyTravellerMutation, useDeleteMyTravellerMutation, useUpdateMyTravellerMutation } = myTravellersApi;


