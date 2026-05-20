export type PlaceSuggestion = {
  id: string;
  name: string;
  fullAddress: string;
  countryCode: string;
  searchHint: {
    latitude: number;
    longitude: number;
    country_code: string;
  };
};