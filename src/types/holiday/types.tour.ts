export interface TourTypeRegion {
  id: number;
  name: string;
  is_selected: boolean;
}

export interface TourType {
  id: number;
  name: string;
  is_selected: boolean;
  has_regions: boolean;
  regions: TourTypeRegion[];
}

export interface Region {
  id: number;
  name: string;
  is_selected: boolean;
}

export interface TourListTourType {
  id: number;
  name: string;
}

export interface TourListRegion {
  id: number;
  name: string;
}

export interface Tour {
  id: number;
  city_name: string;
  country_name: string;
  display_name: string;
  bg_image: string;
  bg_image_url: string;
  tour_types: TourListTourType[];
  regions: TourListRegion[];
}

export interface ToursData {
  selected_tour_type_id: number | null;
  selected_tour_region_id: number | null;
  has_regions: boolean;
  tour_types: TourType[];
  regions: Region[];
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
  tours: Tour[];
}

export interface ToursApiResponse {
  success: boolean;
  message: string;
  data: ToursData;
  code: number;
}
export interface GetToursParams {
  tour_type_id: number;
  tour_region_id?: number;
}