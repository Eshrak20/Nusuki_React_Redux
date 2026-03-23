// ==========================================
// SHARED INTERFACES
// ==========================================

export interface PaginationMeta {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
}

// ==========================================
// 1. MAIN TESTS DATA (LIST)
// ==========================================

// The base Test Preparation object
export interface TestPreparation {
  id: number;
  testDesc: string;
  date: string;
  duration: string;
  batch: string;
  examType: string;
  time: string;
  image: string;
  created_at: string;
  updated_at: string;
}

// Combining pagination meta with the Test Preparation array
export interface PaginatedTestPreparations extends PaginationMeta {
  data: TestPreparation[];
}

// The top-level API response for the test list
export interface TestPreparationsApiResponse {
  success: boolean;
  message: string;
  data: PaginatedTestPreparations;
  code: number;
}

// Optional query params tailored for test preparations
export interface TestPreparationQueryParams {
  page?: number;
  examType?: string;
  size?: number; // e.g., "Online" or "Offline"
}

// ==========================================
// 2. TEST DETAILS DATA
// ==========================================

// Top-level API response for single test detail
export interface TestDetailsApiResponse {
  success: boolean;
  message: string;
  data: TestPreparationData;
  code: number;
}

// Extends the base TestPreparation to include the nested detail_json
export interface TestPreparationData extends TestPreparation {
  detail_json: TestDetailWrapper;
}

// The first layer of the detail_json
export interface TestDetailWrapper {
  id: number;
  testImagePath: string;
  testDesc: string;
  date: string;
  duration: string;
  batch: string;
  locale: string;
  published_at: string;
  created_at: string;
  updated_at: string;
  examType: string;
  testtestImageAltTag: string | null;
  testImageAltTag: string | null;
  time: string;
  button: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  localizations: any[];
  detail_json: TestDetailContent; // 👈 Nested deeply mapped content
}

// The deep nested content inside detail_json.detail_json
export interface TestDetailContent {
  url: string;
  page_title: string;
  hero: Hero;
  about_exam: AboutExam;
  exam_structure: Record<string, string>; // Dynamic key-value pairs
  other_details: Record<string, string>;  // Dynamic key-value pairs
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prep_benefits: any[];
  upcoming_batches: UpcomingBatch[];
  offerings: Offering[];
  faqs: Faq[];
  seven_easy_steps: EasyStep[];
}

export interface Hero {
  title: string;
  description: string;
  image: string;
  image_alt: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  breadcrumbs: any[];
}

export interface AboutExam {
  title: string;
  image: string;
  image_alt: string;
  paragraphs: string[];
}

export interface UpcomingBatch {
  title: string;
  raw_lines: string[];
  date: string;
  time: string;
  duration: string;
  batch_mode: string;
}

export interface Offering {
  plan: string;
  price: string;
  extra_text: string;
  features: string[];
}

export interface Faq {
  question: string;
  answer: string;
}

export interface EasyStep {
  step_no: string;
  title: string;
  description: string;
}

// ==========================================
// 3. OUR EXPERTS DATA
// ==========================================

// The base Expert object
export interface Expert {
  id: number;
  name: string;
  title: string;
  years_in_industry: string;
  qualification: string | null;
  image: string;
  created_at: string;
  updated_at: string;
}

// The top-level API response for the experts list
export interface ExpertsApiResponse {
  success: boolean;
  message: string;
  data: Expert[];
  code: number;
}