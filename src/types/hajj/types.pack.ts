import type { ApiResponse } from "../types.common";

/* ================= SINGLE PACKAGE ================= */
export interface HajjUmPackageItem {
  id: string;
  is_featured: boolean;
  category:
    | "Fixed Package"
    | "Economy Fixed Package"
    | "Platinum Shifting Package";

  special_package?: boolean;

  title: string;

  /* 🔥 FIXED NAME */
  short_description: string;

  /* 🔥 FIXED — price is object */
  price: string;

  duration: string;
  flight: string;

  /* 🔥 FLATTENED HOTELS (since component uses flat fields) */
  hotel_makkah: string;
  hotel_madinah: string;
  hotel_aziziyah_shisha?: string;

  food: string;

  /* 🔥 FIXED — component uses services */
  services: string;

  /* 🔥 USED IN DOWNLOAD BUTTON */
  attachment?: string;
}

/* ================= COMPONENT PROPS ================= */
export interface HajjUmPackCardProps {
  packages?: HajjUmPackageItem[];
  isSpecial?: boolean;
}

/* ================= API RESPONSE ================= */
export type HajjUmPackagesResponse = ApiResponse<HajjUmPackageItem[]>;
