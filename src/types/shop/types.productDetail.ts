// types/product.ts

export interface ProductResponse {
    product: Product;
}

export interface Product {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    handle: string;
    thumbnail: string;

    material: string;
    weight: string;
    length: string;
    height: string;
    width: string;

    collection: Collection;
    type: ProductType;

    images: Image[];
    options: ProductOption[];
    variants: Variant[];
    tags: Tag[];
}

export interface Collection {
    id: string;
    title: string;
}

export interface ProductType {
    id: string;
    value: string;
}

export interface Image {
    id: string;
    url: string;
    rank: number;
}

export interface ProductOption {
    id: string;
    title: string;
    values: OptionValue[];
}

export interface OptionValue {
    id: string;
    value: string;
}

export interface Variant {
    id: string;
    title: string;
    options: VariantOption[];
    prices: Price[];
}

export interface VariantOption {
    id: string;
    value: string;
    option: {
        id: string;
        title: string;
    };
}

export interface Price {
    id: string;
    currency_code: string;
    amount: number;
}

export interface Tag {
    id: string;
    value: string;
}