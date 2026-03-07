// src/redux/features/universityFilterSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface UniversityFilterState {
  keyword: string;
  country: string;
  page: number;
}

const initialState: UniversityFilterState = {
  keyword: "",
  country: "",
  page: 1,
};

const universityFilterSlice = createSlice({name: "universityFilter",initialState,
  reducers: {
    setSearchUni: (state, action: PayloadAction<string>) => {
      state.keyword = action.payload;
      state.page = 1;
    },
    setCountry: (state, action: PayloadAction<string>) => {
      state.country = action.payload;
      state.page = 1;
    },
    setPageUni: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
});

export const { setSearchUni, setCountry, setPageUni } = universityFilterSlice.actions;
  
export default universityFilterSlice.reducer;