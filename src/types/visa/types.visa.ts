// The base Visa object based on the data array items
export interface Visa {
  id: number;
  country: string;
  visa_category: string;
  visa_validity: string;
  service_fee: string;
  processing_time: string;
  entry_type: string;
  visa_type: string;
  imp_info: string;
  country_flag: string;
  created_at: string;
  updated_at: string;
  country_flag_url: string;
}
export interface CountryVisaCardProps {
  visas: Visa[];
}

// Reusing the pagination meta structure
export interface PaginationMeta {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
}

// Combining pagination meta with the Visa array
export interface PaginatedVisas extends PaginationMeta {
  data: Visa[];
}

// The top-level API response
export interface VisaApiResponse {
  code?: number; // Optional since it wasn't in the raw JSON, but was in your example
  success: boolean;
  message: string;
  data: PaginatedVisas;
}

// Similar query params tailored for visas
export interface VisaQueryParams {
  page?: number;
  country?: string;
  visa_category?: string;
}

export interface VisaDetailsApiResponse {
  code?: number; 
  success: boolean;
  message: string;
  data: Visa; // Notice this is a single Visa object, not PaginatedVisas
}