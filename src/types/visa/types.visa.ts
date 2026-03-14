// Sub-types for the detailed view
export interface VisaRequirement {
  id: number;
  visa_id: string;
  requirement_name: string;
  type: string;
  created_at: string;
  updated_at: string;
}

export interface VisaProcess {
  id: number;
  visa_id: string;
  step_title: string;
  description: string;
  sort_order: string;
  created_at: string;
  updated_at: string;
}

export interface DetBannerProps {
  details: VisaDetails;
}

// The base Visa object (used for list views/cards)
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

// The detailed Visa object (used for the single details page)
export interface VisaDetails extends Visa {
  requirements: VisaRequirement[];
  processes: VisaProcess[];
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

// The top-level API response for the list of visas
export interface VisaApiResponse {
  code?: number;
  success: boolean;
  message: string;
  data: PaginatedVisas;
}

// Query params tailored for filtering visas
export interface VisaQueryParams {
  page?: number;
  country?: string;
  visa_category?: string;
}

// The API response for a single visa detail page
export interface VisaDetailsApiResponse {
  code?: number;
  success: boolean;
  message: string;
  data: VisaDetails; // Now properly includes requirements and processes
}