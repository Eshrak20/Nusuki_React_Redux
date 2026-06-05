import type { SocialLinksApiResponse } from "@/types/settings/types.social";
import { laravelApi } from "../laravelApi";
import type { AddressesApiResponse } from "@/types/settings/types.address";
export const settingApi = laravelApi.injectEndpoints({
    endpoints: (builder) => ({
        getSocialLinks: builder.query<SocialLinksApiResponse, void>({
            query: () => ({
                url: "/footer/social-links",
                method: "GET",
            }),
        }),
        getAddresses: builder.query<AddressesApiResponse, void>({
            query: () => ({
                url: "/footer/addresses",
                method: "GET",
            }),
        }),
    }),
});

export const { useGetAddressesQuery, useGetSocialLinksQuery } = settingApi;


