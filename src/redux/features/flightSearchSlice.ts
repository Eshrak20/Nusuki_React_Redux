import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { SearchDests } from "@/types/flight/flightHome.types";
import { addDays } from "date-fns";

// Define what a single flight segment looks like
export interface FlightSegment {
    fromDest: SearchDests | null;
    toDest: SearchDests | null;
    departureDate: string;
}

interface FlightSearchState {
    tripType: string;
    fareType: string;
    // Single trip data (used for One-Way/Round-Trip)
    fromDest: SearchDests | null;
    toDest: SearchDests | null;
    departureDate: string;
    returnDate: string;
    // Multi-way data
    segments: FlightSegment[]; 
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
    fromDest: null,
    toDest: null,
    departureDate: addDays(new Date(), 0).toISOString(),
    returnDate: addDays(new Date(), 3).toISOString(),
    // Initialize with 2 default segments for multi-way view
    segments: [
        { fromDest: null, toDest: null, departureDate: addDays(new Date(), 0).toISOString() },
        { fromDest: null, toDest: null, departureDate: addDays(new Date(), 2).toISOString() },
    ],
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
        // Specialized reducer to update a specific segment in multi-way
        updateSegment: (state, action: PayloadAction<{ index: number; data: Partial<FlightSegment> }>) => {
            const { index, data } = action.payload;
            if (state.segments[index]) {
                state.segments[index] = { ...state.segments[index], ...data };
            }
        },
        // Add a new segment (Max 5)
        addSegment: (state) => {
            if (state.segments.length < 5) {
                const lastSegment = state.segments[state.segments.length - 1];
                state.segments.push({
                    fromDest: lastSegment?.toDest || null, // Auto-fill next start with previous end
                    toDest: null,
                    departureDate: addDays(new Date(lastSegment?.departureDate || new Date()), 2).toISOString(),
                });
            }
        },
        removeSegment: (state, action: PayloadAction<number>) => {
            if (state.segments.length > 2) {
                state.segments.splice(action.payload, 1);
            }
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

export const { 
    setSearchField, 
    updateSegment, 
    addSegment, 
    removeSegment, 
    updateTravelers, 
    swapDestinations 
} = flightSearchSlice.actions;

export default flightSearchSlice.reducer;