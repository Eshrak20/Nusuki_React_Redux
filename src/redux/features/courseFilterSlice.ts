// src/redux/features/courseFilterSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface CourseFilterState {
  keyword: string;
  study_level: string;
  page: number;
}

const initialState: CourseFilterState = {
  keyword: "",
  study_level: "",
  page: 1,
};

const courseFilterSlice = createSlice({
  name: "courseFilter", initialState,
  reducers: {
    setSearchCourse: (state, action: PayloadAction<string>) => {
      state.keyword = action.payload;
      state.page = 1;
    },
    setDegree: (state, action: PayloadAction<string>) => {
      state.study_level = action.payload;
      state.page = 1;
    },
    setPageCourse: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
});

export const { setSearchCourse, setDegree, setPageCourse } = courseFilterSlice.actions;
export default courseFilterSlice.reducer;