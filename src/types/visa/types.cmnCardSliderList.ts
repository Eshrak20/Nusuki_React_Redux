import type { ApiResponse } from "../types.common";

// Single card item
export interface CmnCardSliderList {
  id: number;
  location: string;
  image: string;
  rating: number;
  reviews: number;
}

// Props for the component
export interface CmnCardSliderProps {
  cmnCardSliderList?: CmnCardSliderList[];
}

// API response type (optional)
export type CmnCardSliderListResponse = ApiResponse<CmnCardSliderList[]>;
