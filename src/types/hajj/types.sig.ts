import type { ApiResponse } from "../types.common";

// ===== Child step item (LI) =====
export interface StepItem {
  id: string;
  title: string;
  description: string;
}

// ===== Step section (parent) =====
export interface StepSection {
  id: string;
  title: string;
  items: StepItem[];
}

export interface SignificanceAbout {
  title: string;
  description: string;
}
export interface SignificanceImages {
  image: string;
}
export interface SignificanceGuide {
  // Guide section
  guide_title: string;
  guide_des: string;

  // Step-by-step guide
  requirements: StepSection[];
}
export interface SignificanceFooter {
  // Footer section
  footer_title: string;
  footer_des: string;
}

export interface SignificanceItem
  extends
    SignificanceAbout,
    SignificanceImages,
    SignificanceGuide,
    SignificanceFooter {}

// ===== Full list type =====
export type SignificanceResponse = ApiResponse<SignificanceItem[]>;
