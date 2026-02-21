import type { ApiResponse } from "../types.common";

/* ================= SINGLE PACKAGE ================= */
export interface HajjPackageItem {
  id: number;
  name: string;
  tagline: string;
  price: string;
  card_image: string;
  created_at: string;
  updated_at: string;
}

export interface HajjPackageList {
  current_page?: number;
  data: HajjPackageItem[];
  last_page?: number;
  per_page?: number;
  total?: number;
}

/* ================= COMPONENT PROPS ================= */
export interface HajjPackageApiResponse {
  success: boolean;
  message: string;
  data: HajjPackageList;
  code: number;
}

/* ================= API RESPONSE ================= */
export type HajjUmPackagesResponse = ApiResponse<HajjPackageApiResponse[]>;
