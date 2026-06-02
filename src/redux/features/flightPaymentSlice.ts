import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type FlightPaymentState = {
  bookingCode: string | null;
};

const initialState: FlightPaymentState = {
  bookingCode: null,
};

const flightPaymentSlice = createSlice({
  name: "flightPayment",
  initialState,
  reducers: {
    setFlightBookingCode: (state, action: PayloadAction<string | null>) => {
      state.bookingCode = action.payload;
    },
    clearFlightBookingCode: (state) => {
      state.bookingCode = null;
    },
  },
});

export const { setFlightBookingCode, clearFlightBookingCode } =
  flightPaymentSlice.actions;

export default flightPaymentSlice.reducer;