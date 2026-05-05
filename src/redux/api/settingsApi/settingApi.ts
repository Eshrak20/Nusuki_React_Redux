import type { SocialLinksApiResponse } from "@/types/settings/types.social";
import { laravelApi } from "../laravelApi";
import type { AddressesApiResponse } from "@/types/settings/types.address";
export const settingApi = laravelApi.injectEndpoints({
    endpoints: (builder) => ({
        getSocialLinks: builder.query<SocialLinksApiResponse, void>({
            query: () => ({
                url: "/social-links",
                method: "GET",
            }),
        }),
        getAddresses: builder.query<AddressesApiResponse, void>({
            query: () => ({
                url: "/addresses",
                method: "GET",
            }),
        }),
    }),
});

export const { useGetAddressesQuery, useGetSocialLinksQuery } = settingApi;


