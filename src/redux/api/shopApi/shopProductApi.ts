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

            // 1. Cache key customization (VERY IMPORTANT)
            serializeQueryArgs: ({ endpointName, queryArgs }) => {
                return `${endpointName}-${queryArgs.type}`;
            },

            // 2. Merge results into cache instead of replacing
            merge: (currentCache, newItems) => {
                if (!currentCache.products) {
                    currentCache.products = [];
                }

                // prevent duplicates
                const existingIds = new Set(currentCache.products.map((p) => p.id));

                const filteredNew = newItems.products.filter(
                    (p) => !existingIds.has(p.id)
                );

                currentCache.products.push(...filteredNew);
            },

            // 3. Force refetch when offset changes
            forceRefetch({ currentArg, previousArg }) {
                return currentArg?.offset !== previousArg?.offset;
            },
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


