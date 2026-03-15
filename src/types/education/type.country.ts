export interface MetaData {
  title: string;
  description: string;
  canonical: string;
  og_title: string;
  og_description: string;
}

export interface HeroSection {
  title: string;
  background_image: string;
  overlay_image: string;
  cta_text: string;
  cta_url: string;
}

export interface OnPageNavItem {
  text: string;
  href: string;
}

export interface OverviewSection {
  section_titles: string[];
  paragraphs: string[];
  lists: string[][];
}

export interface FactItem {
  value: string;
  label: string;
}

export interface KeyFactsCategory {
  category: string;
  facts: FactItem[];
}

export interface AcademicIntakeTable {
  headers: string[];
  rows: string[][];
}

export interface AcademicIntake {
  title: string;
  description: string;
  table: AcademicIntakeTable;
}

export interface ProgramDurationTable {
  headers: string[];
  rows: string[][];
}

export interface ProgramsDuration {
  title: string;
  description: string;
  table: ProgramDurationTable;
}

export interface UniversityItem {
  name: string;
  website: string;
  image: string;
}

export interface StudyCostTable {
  headers: string[];
  rows: string[][];
}

export interface StudyCost {
  title: string;
  table: StudyCostTable;
}

export interface CityItem {
  number: string;
  city: string;
  description: string;
  image: string;
}

export interface WorkOpportunity {
  title: string;
  content: string;
}

export interface ArticleMeta {
  title: string;
  summary: string;
  meta: string[];
  url: string;
  image: string;
}

export interface FAQItem {
  number: string;
  question: string;
  answer: string;
}

export interface DestinationData {
  url: string;
  meta: MetaData;
  hero: HeroSection;
  on_page_nav: OnPageNavItem[];
  overview: OverviewSection;
  key_facts: KeyFactsCategory[];
  admission_requirements: string[];
  academic_intake: AcademicIntake;
  programs_duration: ProgramsDuration;
  popular_programs: string[];
  top_universities: UniversityItem[];
  study_cost: StudyCost;
  top_cities: CityItem[];
  work_opportunities: WorkOpportunity[];
  articles: ArticleMeta[];
  faqs: FAQItem[];
}

export interface DestinationApiResponse {
  success: boolean;
  message: string;
  data: DestinationData;
  code: number;
}




export interface DestinationQueryParams {
  page?: number;
  keyword?: string;
  country?: string;
}