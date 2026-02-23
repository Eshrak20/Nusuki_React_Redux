/* ================= ROOT RESPONSE ================= */
export interface UniversityDetailsResponse {
  success: boolean;
  message: string;
  data: UniversityData;
}

/* ================= MAIN DATA ================= */
export interface UniversityData {
  id: number;
  name: string;
  country: string;
  location: string;
  universityUrl: string;
  uni_logo: string;
  detail_json: UniversityDetailJson;
}

/* ================= DETAIL JSON ================= */
export interface UniversityDetailJson {
  universityBannerImage: string;
  universityName: string;
  extraDetail?: string;
  overviewSection: OverviewSection;
  rankingSection: RankingSection;
  intakeSection: IntakeSection;
  topCourseDetail: TopCourseCategory[];
  costToStudySection: CostToStudySection;
  admissionRequirementDetail: AdmissionRequirementDetail;
  universityPlacementSection: PlacementSection;
}

/* ================= OVERVIEW ================= */
export interface OverviewSection {
  heading: string;
  description: string;
  overviewCard?: {
    id: number;
    title: string;
    subTitle: string;
  }[];
  whyChoose?: string[]; // for DetInstitutionWhyChose
}

/* ================= RANKING ================= */
export interface RankingSection {
  heading: string;
  rankingCard?: {
    id: number;
    title: string;
    subTitle: string;
  }[];
}

/* ================= INTAKES ================= */
export interface IntakeSection {
  heading: string;
  intakes?: {
    id: number;
    name: string;
    description: string;
  }[];
}

/* ================= PROGRAMS ================= */
export interface TopCourseCategory {
  id: number;
  name: string;
  cardDetail?: {
    id: number;
    courseName: string;
    title1: string;
    subTitle1: string;
    title2: string;
    subTitle2: string;
  }[];
}

/* ================= COST ================= */
export interface CostToStudySection {
  heading: string;
  cost?: {
    id: number;
    expenseType: string;
    annualExpenses: string;
  }[];
}

/* ================= ADMISSION ================= */
export interface AdmissionRequirementDetail {
  bachelors?: AdmissionRequirementCategory;
  masters?: AdmissionRequirementCategory;
}

export interface AdmissionRequirementCategory {
  gpa?: string;
  ielts?: string;
  toefl?: string;
  gre?: string;
  sat?: string;
  id?: number;
  name?: string;
  requirementCard?: {
    id?: number;
    title?: string;
    cardDetails?: string;
  }[];
}

/* ================= PLACEMENT ================= */
export interface PlacementSection {
  heading: string;
  recruiters?: string[]; // simple array of recruiter names
  placementCard?: {
    id: number;
    image: string;
  }[];
  averageSalary?: {
    id: number;
    expenceType: string;
    totalSalary: string;
  }[];
}