import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface HolidayPackageFiltersState {
  tour_id: string;
  search: string;
  min_price: string;
  max_price: string;
  duration_days: string;
  page: number;
  size: number;
}

const initialState: HolidayPackageFiltersState = {
  tour_id: "",
  search: "",
  min_price: "",
  max_price: "",
  duration_days: "",
  page: 1,
  size: 10,
};

const holidayPackageFilterSlice = createSlice({
  name: "holidayPackageFilters",
  initialState,
  reducers: {
    setTourId: (state, action: PayloadAction<string>) => {
      state.tour_id = action.payload;
      state.page = 1;
    },

    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
      state.page = 1;
    },

    setMinPrice: (state, action: PayloadAction<string>) => {
      state.min_price = action.payload;
      state.page = 1;
    },

    setMaxPrice: (state, action: PayloadAction<string>) => {
      state.max_price = action.payload;
      state.page = 1;
    },

    setDurationDays: (state, action: PayloadAction<string>) => {
      state.duration_days = action.payload;
      state.page = 1;
    },

    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },

    resetHolidayPackageFilters: (state) => {
      state.search = "";
      state.min_price = "";
      state.max_price = "";
      state.duration_days = "";
      state.page = 1;
      state.size = 10;
    },
  },
});

export const {
  setTourId,
  setSearch,
  setMinPrice,
  setMaxPrice,
  setDurationDays,
  setPage,
  resetHolidayPackageFilters,
} = holidayPackageFilterSlice.actions;

export default holidayPackageFilterSlice.reducer;