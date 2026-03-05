// The base Course object based on the data array items
export interface Course {
  id: number;
  name: string;
  study_level?: string; 
  university: string;
  city: string;
  country: string;
  logo?: string; 
  created_at: string; 
  updated_at: string; 
}

// Reusing the pagination meta structure from your example
export interface PaginationMeta {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
}

// Combining pagination meta with the Course array
export interface PaginatedCourses extends PaginationMeta {
  data: Course[];
}

// The top-level API response
export interface CourseApiResponse {
  code: number; 
  success: boolean;
  message: string;
  data: PaginatedCourses;
}

// Similar query params tailored for courses
export interface CourseQueryParams {
  page?: number;
  keyword?: string;
  country?: string;
  city?: string;
  university?: string;
}