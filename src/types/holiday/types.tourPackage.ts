export interface TourPackageTour {
  id: number;
  city_name: string;
  country_name: string;
  display_name: string;
}

export interface TourPackageImage {
  id: number;
  image: string;
  image_url: string;
}

export interface TourPackageOffer {
  id: number;
  name: string;
  valid_from: string;
  valid_until: string;
  departs: string;
  price_per_person_single: string;
  price_per_person_double: string;
  price_per_person_twin: string;
  price_per_person_triple: string;
  price_per_person_child_3_to_6: string;
  price_per_person_child_7_to_12: string;
  description: string;
}

export interface TourPackageDetails {
  id: number;
  tour_id: string;
  tour: TourPackageTour;
  name: string;
  city_name: string;
  country_name: string;
  address: string;
  duration_days: string;
  highlights: string;
  itinerary: string;
  pickup_note: string;
  cancelation_policy: string;
  tax: string;
  included_service: string;
  general_condition: string;
  equated_monthly_installment: string;
  images: TourPackageImage[];
  offers: TourPackageOffer[];
}

export interface TourPackageDetailsApiResponse {
  success: boolean;
  message: string;
  data: TourPackageDetails;
  code: number;
}