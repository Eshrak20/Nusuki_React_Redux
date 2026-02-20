import type { ApiResponse } from "../types.common";

/* ===============================
   API RESPONSE TYPES (RAW BACKEND)
================================== */

export interface VisaRequirementApiItem {
  id: number;
  hajj_visa_req_id: number;
  title: string;
  short_desc: string;
  created_at: string;
  updated_at: string;
}

export interface VisaRequirementApiSection {
  id: number;
  title: string;
  description: string;
  image?: string;   // single image optional
  image1?: string;  // multiple images optional
  image2?: string;  // multiple images optional
  imp_note: string;
  created_at: string;
  updated_at: string;
  items: VisaRequirementApiItem[];
}


/* Generic API Wrapper */
export type VisaRequirementsResponse = ApiResponse<VisaRequirementApiSection[]>;

/* ===============================
   UI NORMALIZED TYPES (FRONTEND)
================================== */

export interface VisaRequirementItem {
  id?: number;
  title: string;
  description: string;
}

export interface AboutHajjUmrahProps {
  about_title?: string;
  about_des?: string;
}

export interface VisaRequirementSection extends AboutHajjUmrahProps {
  requirements_title: string;
  requirements: VisaRequirementItem[];
  images: string[];
  note_des?: string;
}

export interface SideImagesProps {
  images: string[];
}


export interface ReqListProps {
  title: string;
  requirements: VisaRequirementItem[];
  note?: string;
}
