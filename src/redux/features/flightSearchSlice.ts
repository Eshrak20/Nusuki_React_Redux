import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { addDays } from "date-fns";
import type {
  FlightFilters,
  FlightSearchState,
  FlightSegment,
  UpdateTravelerPayload,
} from "@/types/flight/flightSearch.types";

const initialState: FlightSearchState = {
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

export const flightSearchSlice = createSlice({
  name: "flightSearch",
  initialState,
  reducers: {
    setSearchDest: (state, action: PayloadAction<string>) => {
      state.searchDest = action.payload;
    },

    setSearchField: (state, action: PayloadAction<Partial<FlightSearchState>>) => {
      Object.assign(state, action.payload);

      if (state.fareType === "student") {
        state.travelers = {
          adults: state.travelers.adults,
          children: [],
          infants: 0,
        };
      }
    },

    updateSegment: (
      state,
      action: PayloadAction<{ index: number; data: Partial<FlightSegment> }>
    ) => {
      const { index, data } = action.payload;
      if (state.segments[index]) {
        state.segments[index] = { ...state.segments[index], ...data };
      }
    },

    addSegment: (state) => {
      if (state.segments.length < 5) {
        const lastSegment = state.segments[state.segments.length - 1];
        state.segments.push({
          fromDest: lastSegment?.toDest || null,
          toDest: null,
          departureDate: addDays(
            new Date(lastSegment?.departureDate || new Date()),
            2
          ).toISOString(),
        });
      }
    },

    removeSegment: (state, action: PayloadAction<number>) => {
      if (state.segments.length > 2) {
        state.segments.splice(action.payload, 1);
      }
    },

    updateTravelers: (state, action: PayloadAction<UpdateTravelerPayload>) => {
      const { childrenCount, childAgeUpdate, ...otherTravelers } = action.payload;

      if (state.fareType === "student") {
        if ("adults" in otherTravelers && typeof otherTravelers.adults === "number") {
          state.travelers.adults = Math.max(1, otherTravelers.adults);
        }

        state.travelers.children = [];
        state.travelers.infants = 0;
        return;
      }

      if (childrenCount !== undefined) {
        const currentAges = [...state.travelers.children];

        if (childrenCount > currentAges.length) {
          const needed = childrenCount - currentAges.length;
          state.travelers.children.push(...Array(needed).fill(2));
        } else {
          state.travelers.children = currentAges.slice(0, childrenCount);
        }
      } else if (childAgeUpdate) {
        const { index, age } = childAgeUpdate;
        if (state.travelers.children[index] !== undefined) {
          state.travelers.children[index] = age;
        }
      } else {
        state.travelers = {
          ...state.travelers,
          ...otherTravelers,
        };
      }
    },

    swapDestinations: (state) => {
      const temp = state.fromDest;
      state.fromDest = state.toDest;
      state.toDest = temp;
    },

    updateFilter: (
      state,
      action: PayloadAction<{ category: string; value: string | number }>
    ) => {
      const { category, value } = action.payload;

      if (category === "departure" || category === "arrival") {
        const target = state.filters.flight_schedules[category];
        state.filters.flight_schedules[category] = target.includes(String(value))
          ? target.filter((i) => i !== String(value))
          : [...target, String(value)];
        return;
      }

      const key = category as keyof FlightFilters;
      if (!(key in state.filters)) return;

      const currentField = state.filters[key];

      if (Array.isArray(currentField)) {
        const exists = currentField.includes(value as never);
        (state.filters[key] as (string | number)[]) = exists
          ? (currentField as (string | number)[]).filter((i) => i !== value)
          : [...(currentField as (string | number)[]), value];
      } else {
        (state.filters[key] as number | null) = value as number | null;
      }
    },

    setRangeFilter: (
      state,
      action: PayloadAction<{
        category: "price" | "layover";
        min: number | null;
        max: number | null;
      }>
    ) => {
      const { category, min, max } = action.payload;

      if (category === "price") {
        state.filters.price_min = min;
        state.filters.price_max = max;
      } else {
        state.filters.layover_duration_min = min;
        state.filters.layover_duration_max = max;
      }
    },

    resetFilters: (state) => {
      state.filters = initialState.filters;
    },

    resetFlightSearchState: () => initialState,

    setUiField: (
      state,
      action: PayloadAction<
        Partial<{
          currentPage: number;
          sortBy: "price" | "duration" | "departure_at";
          sortOrder: "asc" | "desc";
          selectedAirlineCode: string | null;
        }>
      >
    ) => {
      state.ui = { ...state.ui, ...action.payload };
    },

    resetFlightUiState: (state) => {
      state.ui.currentPage = 1;
      state.ui.sortBy = "price";
      state.ui.sortOrder = "asc";
      state.ui.selectedAirlineCode = null;
    },
  },
});

export const {
  setSearchDest,
  setSearchField,
  updateSegment,
  addSegment,
  removeSegment,
  updateTravelers,
  swapDestinations,
  updateFilter,
  setRangeFilter,
  resetFilters,
  resetFlightSearchState,
  setUiField,
  resetFlightUiState,
} = flightSearchSlice.actions;

export default flightSearchSlice.reducer;