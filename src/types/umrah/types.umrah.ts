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

export interface Service {
  id: number;
  name: string;
  additional_fees: boolean;
}

export interface PackageServices {
  category: string;
  services: Service[];
}


export interface SightActivity {
  id: number;
  name: string;
  activity_duration: number;
  additional_fees: boolean;
}

export interface PackageSight {
  category: string;
  activities: SightActivity[];
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

export interface UmrahPackageDetails {
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
  package_services: PackageServices[];
  package_sight_seeings: PackageSight[];
}

/* ================= DETAILS API RESPONSE ================= */

export interface UmrahPackageDetailsResponse {
  success: boolean;
  message: string;
  data: UmrahPackageDetails;
  code: number;
}