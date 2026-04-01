import type { CategoryResponse, ProductListResponse } from "@/types/shop/types.shop";
import { medusaApi } from "../medusaApi";

export const shopHomeApi = medusaApi.injectEndpoints({
    endpoints: (builder) => ({
        shopHomeApiProductLists: builder.query<ProductListResponse, { type?: string }>({
            query: ({ type = "new" }) => ({
                url: `/custom/products-light?type=${type}`,
                method: "GET",
            }),
        }),
        shopHomeApiCategoryLists: builder.query<CategoryResponse, void>({
            query: () => ({
                url: "/product-categories",
                method: "GET",
            }),
        }),
    }),
});

export const { useShopHomeApiProductListsQuery, useShopHomeApiCategoryListsQuery } = shopHomeApi;


