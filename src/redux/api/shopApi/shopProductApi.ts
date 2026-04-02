import type { ProductListResponse } from "@/types/shop/types.shop";
import { medusaApi } from "../medusaApi";

export const shopProductApi = medusaApi.injectEndpoints({
    endpoints: (builder) => ({
        ProductLists: builder.query<ProductListResponse, { type?: string }>({
            query: ({ type = "new" }) => ({
                url: `/custom/products-light?type=${type}`,
                method: "GET",
            }),
        }),
        ProductDetails: builder.query<ProductListResponse, { type?: string }>({
            query: ({ type = "new" }) => ({
                url: `/custom/products-light?type=${type}`,
                method: "GET",
            }),
        }),
    }),
});

export const { useProductListsQuery } = shopProductApi;


