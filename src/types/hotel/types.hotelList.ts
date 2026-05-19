export type RoomSearch = {
    adults: number;
    children: number;
    child_ages?: number[];
};

export type HotelSearchResponse = {
    success: boolean;
    message: string;
    code: number;
    data: HotelSearchData;
};

export type HotelSearchData = {
    search_id: string;
    search_finished: boolean;
    total_hotels_in_region: number;
    total_available_hotels_without_filter: number;
    total_available_hotels_with_filter: number;
    is_last_page: boolean;
    expires_at: string;
    search: {
        check_in: string;
        check_out: string;
        currency_code: string;
        country_code: string;
        location: {
            latitude: number;
            longitude: number;
        };
        radius: number;
        uom: string;
        rooms: RoomSearch[];
        page: number;
        size: number;
    };
    available_hotels: HotelItem[];
    filters: HotelFilters;
    raw_meta?: {
        shop_key?: string;
        offset?: number;
        messages?: {
            code: string;
            text: string;
        }[];
    };
};
export type HotelAddress = {
    location?: string;
    full_address?: string;
    line1?: string;
    line2?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    country?: string;
    neighborhoods?: string[];
};

export type HotelItem = {
    id?: string | number;
    hotel_id?: string | number;
    name?: string;
    hotel_name?: string;
    address?: string | HotelAddress;
    location?: string | HotelAddress;
    city?: string;
    country?: string;
    star_rating?: number;
    rating?: number;
    images?: string[];
    image?: string;
    amenities?: string[];

    chain_code?: string;
    chain_name?: string;
    meal_plan?: string;
    meal_plans?: string[];

    refundable?: boolean;
    prepaid?: boolean;
    average_nightly_rate?: number;
    total_price?: number;
    currency_code?: string;
};

export type FilterOption<T = string | number | boolean> = {
    value: T;
    label: string;
    count: number;
    request_key?: string;
};

export type HotelFilters = {
    price_range: {
        min: number | null;
        max: number | null;
        request_min_key: string;
        request_max_key: string;
    };
    star_ratings: FilterOption<number>[];
    chains: FilterOption<string>[];
    amenities: FilterOption<string>[];
    meal_plans: FilterOption<string>[];
    refundability: FilterOption<boolean>[];
    payment_types: FilterOption<boolean>[];
};