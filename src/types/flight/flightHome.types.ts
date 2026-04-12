export interface SearchDests {
  id: number;
  iata_code: string;
  name: string;
  city_id: string;
  city_name: string;
  country: string;
  country_id: string;
  iso: string;
  created_at: string;
  updated_at: string;
}

// Single Destination Item
export interface Destination {
  id: number;
  name: string;
  image: string;
  image_url: string;
  starting_price: string;
  currency: string;
  is_popular: string; // "1" | "0"
  is_dream: string;   // "1" | "0"
  sort_order: string;
  is_active: string;
  created_at: string;
  updated_at: string;
}
// Single Promotion
export interface Promotion {
  id: number;
  type: string;
  title: string;
  subtitle: string;
  image: string;
  image_url: string;
  description: string;
  link_url: string;
  sort_order: string;
  is_active: string;
  created_at: string;
  updated_at: string;
}

// Nested Destination (simplified version inside tour)
export interface TourDestination {
  id: number;
  name: string;
  image: string;
  image_url: string;
  starting_price: string;
  currency: string;
}


// Single Tour Collection
export interface TourCollection {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  image_url: string;
  tour_count: string;
  button_link: string;
  sort_order: string;
  is_active: string;
  created_at: string;
  updated_at: string;
}

// Tour Package
export interface TourPackage {
  id: number;
  destination_id: string;
  package_title: string;
  image: string;
  image_url: string;
  rating: string;
  review_count: string;
  price: string;
  is_featured: string;
  created_at: string;
  updated_at: string;
  destination: TourDestination;
}




//! Pagination Wrapper 
export interface Pagination<T> {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
  data: T[];
}

//! API Response Wrapper (Generic) 
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  code: number;
}