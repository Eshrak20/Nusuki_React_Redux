import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface FlightSessionState {
  expiresAt: number | null;
}

const initialState: FlightSessionState = {
  expiresAt: null,
};

const flightSessionSlice = createSlice({
  name: "flightSession",
  initialState,
  reducers: {
    startFlightSession: (state, action: PayloadAction<number>) => {
      state.expiresAt = Date.now() + action.payload * 1000;
    },
    clearFlightSession: (state) => {
      state.expiresAt = null;
    },
    setFlightSessionExpiry: (state, action: PayloadAction<number | null>) => {
      state.expiresAt = action.payload;
    },
  },
});

export const {
  startFlightSession,
  clearFlightSession,
  setFlightSessionExpiry,
} = flightSessionSlice.actions;

export default flightSessionSlice.reducer;