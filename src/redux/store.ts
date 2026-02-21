import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import universityFilterReducer from "./features/universityFilterSlice";

export const store = configureStore({
  reducer: {
    universityFilter: universityFilterReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;