import { configureStore } from "@reduxjs/toolkit";
import universityFilterReducer from "./features/universityFilterSlice";
import courseFilterReducer from "./features/courseFilterSlice";
import visaFilterReducer from "./features/visaFilterSlice";
import testFilterReducer from "./features/testFilterSlice";
import { laravelApi } from "./api/laravelApi";
import { medusaApi } from "./api/medusaApi";

export const store = configureStore({
  reducer: {
    universityFilter: universityFilterReducer,
    courseFilter: courseFilterReducer,
    visaFilter: visaFilterReducer,
    testFilter: testFilterReducer,
    [laravelApi.reducerPath]: laravelApi.reducer,
    [medusaApi.reducerPath]: medusaApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      laravelApi.middleware,
      medusaApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;