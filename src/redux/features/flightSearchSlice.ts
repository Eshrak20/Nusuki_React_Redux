import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { SearchDests } from "@/types/flight/flightHome.types";
import { addDays } from "date-fns";

interface FlightSearchState {
    tripType: string;
    fareType: string;
    fromDest: SearchDests | null;
    toDest: SearchDests | null;
    departureDate: string;
    returnDate: string;
    travelers: {
        adults: number;
        children: number;
        kids: number;
        infants: number;
    };
    flightClass: string;
}

const initialState: FlightSearchState = {
    tripType: "one-way",
    fareType: "regular",
    fromDest: null, // Initialized in component or by first searchDests item
    toDest: null,
    departureDate: addDays(new Date(), 1).toISOString(),
    returnDate: addDays(new Date(), 3).toISOString(),
    travelers: { adults: 1, children: 0, kids: 0, infants: 0 },
    flightClass: "Economy",
};

export const flightSearchSlice = createSlice({
    name: "flightSearch",
    initialState,
    reducers: {
        setSearchField: (state, action: PayloadAction<Partial<FlightSearchState>>) => {
            return { ...state, ...action.payload };
        },
        updateTravelers: (state, action: PayloadAction<Partial<FlightSearchState["travelers"]>>) => {
            state.travelers = { ...state.travelers, ...action.payload };
        },
        swapDestinations: (state) => {
            const temp = state.fromDest;
            state.fromDest = state.toDest;
            state.toDest = temp;
        }
    }
});

export const { setSearchField, updateTravelers, swapDestinations } = flightSearchSlice.actions;
export default flightSearchSlice.reducer;