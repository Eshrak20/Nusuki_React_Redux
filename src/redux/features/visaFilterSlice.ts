import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface VisaFilterState {
  page: number;
  visa_category: string;
  country: string;
}

const initialState: VisaFilterState = {
  page: 1,
  visa_category: "All", // Defaulting to "All" to match your FilterCategory component
  country: ""
};

const visaFilterSlice = createSlice({
  name: "visaFilter",
  initialState,
  reducers: {
    setSearchVisa: (state, action: PayloadAction<string>) => {
      state.country = action.payload;
      state.page = 1;
    },
    setVisaCategory: (state, action: PayloadAction<string>) => {
      state.visa_category = action.payload;
      state.page = 1; 
    },
    setPageVisa: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
});

export const { setSearchVisa, setVisaCategory, setPageVisa } = visaFilterSlice.actions;
export default visaFilterSlice.reducer;