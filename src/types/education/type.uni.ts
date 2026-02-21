export interface University {
  id: number;
  name: string;
  country: string;
  location: string | null;
  universityUrl: string;
  uni_logo: string;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}

export interface PaginationMeta {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
}

export interface PaginatedUniversities extends PaginationMeta {
  data: University[];
}

export interface UniversityApiResponse {
  success: boolean;
  message: string;
  data: PaginatedUniversities;
}


export interface UniversityQueryParams {
  page?: number;
  search?: string;
  country?: string;
}