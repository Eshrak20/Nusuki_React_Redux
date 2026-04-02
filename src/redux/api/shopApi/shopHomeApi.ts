import type { CategoryResponse } from "@/types/shop/types.shop";
import { medusaApi } from "../medusaApi";

export const shopHomeApi = medusaApi.injectEndpoints({
    endpoints: (builder) => ({
        shopHomeApiCategoryLists: builder.query<CategoryResponse, void>({
            query: () => ({
                url: "/product-categories",
                method: "GET",
            }),
        }),
    }),
});

export const { useShopHomeApiCategoryListsQuery } = shopHomeApi;


