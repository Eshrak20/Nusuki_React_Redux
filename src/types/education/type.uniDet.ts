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
  location: string;
  universityUrl: string;
  extraDetail?: string;

  overviewSection: OverviewSection;
  rankingSection: RankingSection;
  intakeSection: IntakeSection;
  topCourseDetail: TopCourseCategory[];
  costToStudySection: CostToStudySection;
  admissionRequirementDetail: AdmissionRequirementDetail;
  universityPlacementSection: PlacementSection;

  // ✅ Fixed property names to match API response
  cultureSection?: CultureSection;      // matches API response
  faqSection: FAQSection;               // matches API response
  scholarshipsAvailable: ScholarshipsSection; // Fixed: was scholarshipsAvailable, not scholarshipsSection
  accomplishSection: AccomplishSection; // matches API response
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
  id: number;
  heading: string;
  description: string;
  iconImge?: {
    imageUrl: string;
    alt: string | null;
  };
  intakeDetail: {
    id: number;
    intake: string; // The API uses "intake" instead of "name"
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
  id: number;
  heading: string;
  description: string;
  note: string;
  currency: string;

  iconImage?: {
    id: number;
    imageUrl: string;
    alt: string | null;
    imageAltTag: string | null;
  };

  costToStudy: {
    id: number;
    expenseType: string;
    diploma: string | null;
    degree: string | null;
    isTotal: boolean | null;
    annualExpenses: string;
  }[];
}
/* ================= ADMISSION ================= */
export interface RequirementCard {
  id: number;
  title: string;
  description?: string | null;
  cardDetails: string; // HTML string containing ✅ content
}

export interface AdmissionRequirementCategory {
  id: number;
  name: string; // e.g., "Postgrad", "Undergrad"
  requirementCard: RequirementCard[];
  // Optional legacy fields in case other API endpoints use them
  gpa?: string;
  ielts?: string;
  toefl?: string;
  gre?: string;
  sat?: string;
}

// The main type used in your component props
// Since the API returns [ {Postgrad}, {Undergrad} ]
export type AdmissionRequirementDetail = AdmissionRequirementCategory[];

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

//DetInstitutionCultural 
export interface MediaImage {
  id: number;
  name?: string;
  alternativeText?: string;
  url: string;
  width?: number;
  height?: number;
}

export interface MediaItem {
  id: number;
  videoUrl: string | null;
  desktopImage: MediaImage | null;
  mobileImage: MediaImage | null;
}

export interface CultureSection {
  id: number;
  title: string;
  medias: MediaItem[];
}

export interface DetInstitutionCulturalProps {
  culture?: CultureSection;
}



// Faq
export interface FAQDetail {
  id: number;
  title: string;
  description: string;
}

export interface FAQSection {
  id: number;
  heading: string;
  description: string | null;
  iconImage?: {
    imageUrl: string;
    imageAltTag?: string | null;
  };
  faqDetail: FAQDetail[];
}

export interface DetInstitutionFaqProps {
  faq: FAQSection;
}

//DetInstitutionScholarships

export interface ScholarshipCard {
  id: number;
  name: string;
  detail: string[]; // Array of strings like ["Type : Merit Based", "Level : Masters", "Amount : $3600 to $4500"]
}

export interface ScholarshipsSection {
  id: number;
  heading: string;
  description: string;
  iconImage?: {
    imageUrl: string;
    imageAltTag?: string | null;
  };
  scholarshipsCard: ScholarshipCard[];
}

export interface DetInstitutionScholarshipsProps {
  scholarships?: ScholarshipsSection;
}
// DetInstitutionAccomplish

export interface Button {
  id: number;
  label: string;
  bgColor: string | null;
  textColor: string | null;
}

export interface AccomplishSection {
  id: number;
  sectionTitle: string;
  sectionBgColorTop?: string;
  sectionBgColorBottom?: string;
  sectionBgColor?: string;
  sectionTitleColor?: string;
  button: Button;
}

export interface DetInstitutionAccomplishProps {
  accomplish?: AccomplishSection;
}


/* ================= MINI BANNER TYPE ================= */

export interface UniversityBannerCardMini {
  uni_logo: string;
  universityName: string;
  extraDetail?: string;
  location: string;
  universityUrl: string;
  universityBannerImage: string;
}