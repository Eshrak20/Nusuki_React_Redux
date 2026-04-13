import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface FlightFilterState {
  searchDest: string;
}

const initialState: FlightFilterState = {
  searchDest: "",
};

const flightFilterSlice = createSlice({
  name: "flightFilter",
  initialState,
  reducers: {
    setSearchDest: (state, action: PayloadAction<string>) => {
      state.searchDest = action.payload;
    }
  },
});

export const { setSearchDest } = flightFilterSlice.actions;
export default flightFilterSlice.reducer;