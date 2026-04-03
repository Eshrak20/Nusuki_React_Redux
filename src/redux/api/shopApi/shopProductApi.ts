import type { ProductListResponse } from "@/types/shop/types.shop";
import { medusaApi } from "../medusaApi";
import type { ProductResponse } from "@/types/shop/types.productDetail";

export const shopProductApi = medusaApi.injectEndpoints({
    endpoints: (builder) => ({
        getProductLists: builder.query<ProductListResponse, { type?: string }>({
            query: ({ type = "new" }) => ({
                url: `/custom/products-light?type=${type}`,
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


