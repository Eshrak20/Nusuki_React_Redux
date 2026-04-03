export interface Price {
  id: string;
  currency_code: string;
  amount: number;
}

export interface Variant {
  id: string;
  title: string;
  prices: Price[];
}

export interface Product {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  thumbnail: string;
  images: { id: string; url: string }[];
  variants: Variant[];
}

export interface ProductResponse {
  product: Product;
}