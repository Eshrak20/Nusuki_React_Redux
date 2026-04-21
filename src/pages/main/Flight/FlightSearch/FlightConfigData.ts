
// Updated Type

export const travelerConfig = [
    { key: "adults", label: "Adults", sub: "(12+ Years)", min: 1, max: 9 },
    { key: "children", label: "Child", sub: "(2-11 Years)", min: 0, max: 8 },
    { key: "infants", label: "Infants", sub: "(0-24 Months)", min: 0, max: 4 },
];

export const flightClasses = [
  { label: "Economy", value: "Y" },
  { label: "Premium Economy", value: "S" },
  { label: "Business Class", value: "C" },
  { label: "First Class", value: "F" },
];


export const fares = [
  { label: "Regular Fare", value: "regular" },
  { label: "Student Fare", value: "student" },
  { label: "Umrah Fare", value: "umrah" },
];
import type { FlightSearchState } from "@/types/flight/flightSearch.types";
import { addDays } from "date-fns";

export const initialState: FlightSearchState = {
  tripType: "one_way",
  fareType: "regular",
  searchDest: "",
  fromDest: null,
  toDest: null,
  departureDate: addDays(new Date(), 1).toISOString(),
  returnDate: addDays(new Date(), 3).toISOString(),
  segments: [
    {
      fromDest: null,
      toDest: null,
      departureDate: addDays(new Date(), 1).toISOString(),
    },
    {
      fromDest: null,
      toDest: null,
      departureDate: addDays(new Date(), 3).toISOString(),
    },
  ],
  travelers: { adults: 1, children: [], infants: 0 },
  cabin: "Y",
  filters: {
    airlines: [],
    aircraft: [],
    stops: [],
    refundability: [],
    price_min: null,
    price_max: null,
    flight_schedules: {
      departure: [],
      arrival: [],
    },
    layover_cities: [],
    layover_duration_min: null,
    layover_duration_max: null,
  },
  ui: {
    currentPage: 1,
    sortBy: "price",
    sortOrder: "asc",
    selectedAirlineCode: null,
  },
};