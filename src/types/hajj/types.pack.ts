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






/* ================= DETAILS TYPES ================= */

export interface ImageItem {
  id: number;
  image: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

export interface AccommodationImage {
  id: number;
  image: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

export interface Accommodation {
  id: number;
  name: string;
  location: string;
  short_description: string;
  rating: string;
  created_at: string;
  updated_at: string;
  images: AccommodationImage[];
}

export interface PackageAccommodation {
  id: number;
  hajj_package_id: string;
  accommodation_id: string;
  nights: string;
  created_at: string;
  updated_at: string;
  accommodation: Accommodation;
}

export interface ItineraryImage {
  id: number;
  image: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

export interface Itinerary {
  id: number;
  name: string;
  location: string;
  short_description: string;
  created_at: string;
  updated_at: string;
  images: ItineraryImage[];
}

export interface PackageItinerary {
  id: number;
  hajj_package_id: string;
  itinerary_id: string;
  duration: string;
  created_at: string;
  updated_at: string;
  itinerary: Itinerary;
}

export interface HajjPackageDetails {
  id: number;
  name: string;
  tagline: string;
  price: string;
  company_name: string;
  per_person_price: string;
  overview: string;
  date: string;
  num_of_nights: string;
  package_type: string;
  card_image: string;
  is_active: string;
  created_at: string;
  updated_at: string;
  images: ImageItem[];
  package_accommodations: PackageAccommodation[];
  package_itineraries: PackageItinerary[];
}

/* ================= DETAILS API RESPONSE ================= */

export interface HajjPackageDetailsResponse {
  success: boolean;
  message: string;
  data: HajjPackageDetails;
  code: number;
}
