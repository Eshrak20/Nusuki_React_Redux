export interface CategoryMetadata {
  Image?: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  description: string;
  handle: string;
  rank: number;
  metadata: CategoryMetadata | null;
  // ... other fields if needed
}

export interface CategoryResponse {
  product_categories: ProductCategory[];
  count: number;
  offset: number;
  limit: number;
}


export interface Product {
  id: string
  title: string
  brand: string | null
  image: string
  price: number
  currency: string
}

export interface ProductListResponse {
  products: Product[]
}