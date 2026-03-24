// src/redux/features/examFilterSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface TestFilterState {
  page: number;
  size: number;
  examType: string;
}

const initialState: TestFilterState = {
  page: 1,
  size: 10, 
  examType: "",
};

const testFilterSlice = createSlice({
  name: "testFilter", 
  initialState,
  reducers: {
    setExamType: (state, action: PayloadAction<string>) => {
      state.examType = action.payload;
      state.page = 1; 
    },
    setSize: (state, action: PayloadAction<number>) => {
      state.size = action.payload;
      state.page = 1;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
});

export const { setExamType, setSize, setPage } = testFilterSlice.actions;
export default testFilterSlice.reducer;