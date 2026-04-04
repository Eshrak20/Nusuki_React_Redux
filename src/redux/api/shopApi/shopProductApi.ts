import type { ProductListResponse } from "@/types/shop/types.shop";
import { medusaApi } from "../medusaApi";
import type { ProductResponse } from "@/types/shop/types.productDetail";

export const shopProductApi = medusaApi.injectEndpoints({
    endpoints: (builder) => ({
        getProductLists: builder.query<ProductListResponse, { type?: string; limit?: number; offset: number }>({
            query: ({ type = "new", limit = 8, offset = 0 }) => ({
                url: `/custom/products-light?type=${type}&limit=${limit}&offset=${offset}`,
                method: "GET",
            }),
        }),
        getProductDetails: builder.query<ProductResponse, string>({
            query: (productId) => ({
                url: `/products/${productId}`,
                method: "GET",
                params: {
                    fields: "*variants.prices",
                },
            }),
        }),
    }),
});

export const { useGetProductListsQuery, useGetProductDetailsQuery } = shopProductApi;


