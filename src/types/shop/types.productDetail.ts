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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  metadata: Record<string, any> | null;
  product_id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  values: OptionValue[];
}

export interface OptionValue {
  id: string;
  value: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  metadata: Record<string, any> | null;
  option_id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface Variant {
  id: string;
  title: string;
  thumbnail: string;
  options: VariantOption[];
  prices: Price[];
  sku?: string;
  // ... add other fields like weight, material if needed
}

export interface VariantOption {
  id: string;
  value: string;
  option_id: string; // Added to match JSON
  option: {
    id: string;
    title: string;
    product_id: string;
  };
}

export interface Price {
  id: string;
  currency_code: string;
  amount: number;
  raw_amount: {
    value: string;
    precision: number;
  };
}

export interface Tag {
    id: string;
    value: string;
}