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
  study_level?: string;
  country?: string;
  city?: string;
  university?: string;
}

//*********** CourseDetailsApiResponse ***********
export interface CourseDetailsApiResponse {
  success: boolean;
  message: string;
  data: CourseData;
  code: number;
}

export interface CourseData {
  id: number;
  name: string;
  university: string;
  city: string;
  country: string;
  study_level: string;
  logo: string;
  detail_json: CourseDetailJson;
  created_at: string;
  updated_at: string;
}

export interface CourseDetailJson {
  id: number;
  source: string;
  scraped_at: string;
  logo: string;
  name: string;
  university: string;
  badge: string | null;
  course_url: string;
  university_url: string;
  detail_url: string;

  ranking: Ranking;
  study_level: string;
  location: Location;
  next_intake: NextIntake;
  entry_score: EntryScore;
  tuition: Tuition;

  detail_json: CourseDetailContent; // 👈 nested content
}

export interface CourseDetailContent {
  final_url: string;
  status_code: number;
  meta: Meta;
  jsonld: JsonLd[];
  sections: Section[];
  tables: Table[];
  raw_text: string;
}

export interface Meta {
  title: string;
  description: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  og: any[];
}

export interface Ranking {
  raw: string;
  source: string;
  world_ranking: number;
}

export interface NextIntake {
  raw: string;
  iso_date: string;
}

export interface EntryScore {
  raw: string;
  test: string;
  score: string;
}

export interface Tuition {
  raw: string;
  currency: string;
  amount: number;
  year: number;
}

export interface Location {
  raw: string;
  city: string;
  country: string;
  flag_alt: string;
  flag_icon_url: string;
}

export interface Section {
  heading: string; 
  level: number;
  text: string;
}

export interface Table {
  headers: string[];
  rows: string[][];
}

export interface JsonLd {
  provider: Provider;
}

export interface Provider {
  name: string;
  url: string;
  logo: string;
}