import type { HotelRoom } from "./types.hotel";

export type HotelDetailPayload = {
  search_id: string;
  hotel_id: string;
};

export type HotelCoordinateLocation = {
  type: string;
  coordinates: [number, number];
  latitude: number;
  longitude: number;
};

export type HotelCity = {
  code: string | null;
  name: string | null;
};

export type HotelState = {
  code: string | null;
  name: string | null;
};

export type HotelCountry = {
  code: string | null;
  name: string | null;
};

export type HotelAddress = {
  location: HotelCoordinateLocation;
  full_address: string;
  line1: string | null;
  line2: string | null;
  city: HotelCity;
  state: HotelState;
  postal_code: string | null;
  country: HotelCountry;
  neighborhoods: unknown[];
};

export type HotelContact = {
  phone: string | null;
  fax: string | null;
};

export type HotelChain = {
  code: string | null;
  name: string | null;
};

export type HotelBrand = {
  code: string | null;
  name: string | null;
};

export type HotelPropertyType = {
  id: string | null;
  code: string | number | null;
  name: string | null;
};

export type HotelPropertyQuality = {
  id: string | null;
  code: number | null;
  name: string | null;
};

export type HotelAmenity = {
  id: string;
  code: number;
  name: string;
  complimentary: boolean | null;
  value: string | null;
};

export type HotelSecurityFeature = {
  id: string;
  code: number;
  name: string;
  complimentary: boolean | null;
  value: string | null;
};

export type HotelImageCategory = {
  code: number;
  description: string;
};

export type HotelImageAdditionalInfo = {
  type: string;
  value: string | null;
  description: string | null;
};

export type HotelImage = {
  id: string;
  caption: string | null;
  url: string;
  height: number;
  width: number;
  type: string;
  source: string;
  is_room_specific: boolean;
  category: HotelImageCategory | null;
  room_type_codes: string[];
  additional_info: HotelImageAdditionalInfo[];
};

export type HotelPolicy = {
  type: string;
  value: string;
};

export type HotelPropertyInfo = {
  floors: string | null;
  rooms: string | null;
  policies: HotelPolicy[];
  property_types: HotelPropertyType[];
  property_quality: HotelAmenity[];
};

export type HotelDescription = {
  type: string;
  value: string;
};

export type HotelDetailHotel = {
  hotel_code: string;
  code_context: string | null;
  sabre_hotel_code: string | null;
  name: string;
  star_rating: number | null;
  chain: HotelChain | null;
  brand: HotelBrand | null;
  property_type: HotelPropertyType | null;
  property_quality: HotelPropertyQuality | null;
  distance: number | null;
  direction: string | null;
  distance_uom: string | null;
  ordinal: number | null;
  logo: string | null;
  address: HotelAddress;
  contact: HotelContact;
  amenities: HotelAmenity[];
  security_features: HotelSecurityFeature[];
  tier_labels: string[];
  images: HotelImage[];
  property_info: HotelPropertyInfo | null;
  descriptions: HotelDescription[];
  sustainability: unknown | null;
};

export type HotelStay = {
  check_in: string;
  check_out: string;
  rooms: HotelRoom[];
};

export type HotelRoomView = {
  code: string | null;
  description: string | null;
};

export type HotelRoomOccupancy = {
  min: number | null;
  max: number | null;
};

export type HotelBedType = {
  code: number;
  name: string;
};

export type HotelMeal = {
  has_meal: boolean;
  id: string | null;
  type: string | null;
  breakfast: boolean;
  lunch: boolean;
  dinner: boolean;
  code: number | null;
};

export type HotelCommission = {
  amount: number | null;
  percent: number | null;
  currency: string | null;
  type: string | null;
};

export type HotelCancellationDeadline = {
  AbsoluteDeadline?: string;
};

export type HotelCancellationPolicy = {
  is_refundable: boolean;
  free_cancellation_before: HotelCancellationDeadline | null;
  description: string | null;
};

export type HotelGuaranteeAccepted = {
  id: number;
  name: string | number;
  value: string;
};

export type HotelGuarantee = {
  type: string | null;
  accepted: HotelGuaranteeAccepted[];
};

export type HotelDailyRate = {
  start_date: string;
  end_date: string;
  amount_before_tax: number;
  amount_after_tax: number | null;
  currency: string;
};

export type HotelRateInfo = {
  rate_key: string;
  rate_source: string;
  currency: string;
  total_price: number;
  amount_before_tax: number;
  amount_after_tax: number;
  average_nightly_rate: number;
  average_nightly_rate_before_tax: number;
  highest_nightly_rate: number;
  tax_and_fees: number;
  tax_inclusive: boolean;
  additional_fees_inclusive: boolean;
  commission: HotelCommission;
  cancellation_policy: HotelCancellationPolicy;
  guarantee: HotelGuarantee;
  daily_rates: HotelDailyRate[];
};

export type HotelRatePlan = {
  name: string;
  code: string;
  type: string | null;
  type_description: string | null;
  prepaid: boolean;
  available_quantity: number;
  limited_availability: string | boolean;
  rate_source: string;
  rate_key: string;
  client_id: string | null;
  product_code: string;
  refundability: string | null;
  loyalty_points: boolean;
  loyalty_program_name: string | null;
  description: string | null;
  inclusions: string[];
  meal: HotelMeal | null;
  rate_info: HotelRateInfo;
};

export type HotelAvailableRoom = {
  room_index: number;
  name: string;
  type: string | null;
  type_code: string | null;
  category: string | null;
  room_id: string;
  floor: string | null;
  view: HotelRoomView;
  adults: number;
  children: number | null;
  non_smoking: boolean;
  occupancy: HotelRoomOccupancy;
  bed_types: HotelBedType[];
  amenities: HotelAmenity[];
  rate_plans: HotelRatePlan[];
  images: HotelImage[];
  room_set_attributes: unknown[];
  image_count: number;
  has_room_images: boolean;
};

export type HotelDetailData = {
  search_id: string;
  hotel_id: string;
  hotel: HotelDetailHotel;
  stay: HotelStay;
  shop_key: string | null;
  rooms: HotelAvailableRoom[];
};

export type HotelDetailResponse = {
  success: boolean;
  message: string;
  code: number;
  data: HotelDetailData;
};