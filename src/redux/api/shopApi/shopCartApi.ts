/* eslint-disable @typescript-eslint/no-explicit-any */
import { medusaApi } from "../medusaApi";

export const shopCartApi = medusaApi.injectEndpoints({
  endpoints: (builder) => ({

    // ✅ Create Cart
    createCart: builder.mutation<any, void>({
      query: () => ({
        url: "/carts",
        method: "POST",
        body:{
          region_id: import.meta.env.VITE_MEDUSA_REGION_ID,
        }
      }),
    }),

    // ✅ Get Cart
    getCart: builder.query<any, string>({
      query: (cartId) => ({
        url: `/carts/${cartId}`,
        method: "GET",
      }),
      providesTags: ["Cart"],
    }),

    // ✅ Add to Cart
    addToCart: builder.mutation<any, { cartId: string; variant_id: string; quantity: number }>({
      query: ({ cartId, ...body }) => ({
        url: `/carts/${cartId}/line-items`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Cart"],
    }),

    // ✅ Update Quantity
    updateLineItem: builder.mutation<any, { cartId: string; lineId: string; quantity: number }>({
      query: ({ cartId, lineId, quantity }) => ({
        url: `/carts/${cartId}/line-items/${lineId}`,
        method: "POST",
        body: { quantity },
      }),
      invalidatesTags: ["Cart"],
    }),

    // ✅ Remove Item
    removeLineItem: builder.mutation<any, { cartId: string; lineId: string }>({
      query: ({ cartId, lineId }) => ({
        url: `/carts/${cartId}/line-items/${lineId}`,
        method: "DELETE",
      }), 
      invalidatesTags: ["Cart"],
    }),

    // ✅ Add Shipping Address
    setShippingAddress: builder.mutation<any, { cartId: string; data: any }>({
      query: ({ cartId, data }) => ({
        url: `/carts/${cartId}`,
        method: "POST",
        body: data, // This can send email, shipping_address, etc.
      }),
      invalidatesTags: ["Cart"],
    }),

    // ✅ Add Shipping Method
    addShippingMethod: builder.mutation<any, { cartId: string; option_id: string }>({
      query: ({ cartId, option_id }) => ({
        url: `/carts/${cartId}/shipping-methods`,
        method: "POST",
        body: { option_id },
      }),
    }),
    getShippingOptions: builder.query<any, string>({
      query: (cartId) => ({
        url: `/shipping-options?cart_id=${cartId}`,
        method: "GET",
      }),
    }),
    // ✅ Create Payment Session
    createPaymentSessions: builder.mutation<any, string>({
      query: (cartId) => ({
        url: `/carts/${cartId}/payment-sessions`,
        method: "POST",
      }),
    }),

    // ✅ Select Payment Provider
    setPaymentSession: builder.mutation<any, { cartId: string; provider_id: string }>({
      query: ({ cartId, provider_id }) => ({
        url: `/carts/${cartId}/payment-session`,
        method: "POST",
        body: { provider_id },
      }),
    }),

    // ✅ Complete Order
    completeCart: builder.mutation<any, string>({
      query: (cartId) => ({
        url: `/carts/${cartId}/complete`,
        method: "POST",
      }),
    }),

  }),
});

export const {
  useCreateCartMutation,
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateLineItemMutation,
  useRemoveLineItemMutation,
  useSetShippingAddressMutation,
  useAddShippingMethodMutation,
  useGetShippingOptionsQuery,
  useCreatePaymentSessionsMutation,
  useSetPaymentSessionMutation,
  useCompleteCartMutation,
} = shopCartApi;