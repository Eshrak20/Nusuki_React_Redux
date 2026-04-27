export interface TourPackageItem {
  id: number;
  name: string;
  address: string;
  duration_days: string;
  image: string;
  price: number | null;
}

export interface TourPackageDynamicFilters {
  price: {
    min: number | null;
    max: number | null;
  };
  duration_days: string[];
}

export interface TourPackagePagination {
  current_page: number;
  last_page: number;
  total: number;
}

export interface TourPackagesListData {
  filters_applied: Record<string, string>;
  filters: TourPackageDynamicFilters;
  data: TourPackageItem[];
  pagination: TourPackagePagination;
}

export interface TourPackagesListResponse {
  success: boolean;
  message: string;
  data: TourPackagesListData;
  code: number;
}

export interface TourPackagesListParams {
  tour_id: string;
  page?: number;
  size?: number;
  search?: string;
  min_price?: string;
  max_price?: string;
  duration_days?: string;
}