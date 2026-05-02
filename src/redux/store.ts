import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import universityFilterReducer from "./features/universityFilterSlice";
import courseFilterReducer from "./features/courseFilterSlice";
import visaFilterReducer from "./features/visaFilterSlice";
import testFilterReducer from "./features/testFilterSlice";
import { laravelApi } from "./api/laravelApi";
import { medusaApi } from "./api/medusaApi";
import flightSearchReducer from "@/redux/features/flightSearchSlice";
import flightSessionReducer from "@/redux/features/flightSessionSlice";
import holidayPackageFilterReducer from "@/redux/features/holidayPackageFilterSlice";


// ✅ Persist ONLY selected fields of flightSearch
const flightSearchPersistConfig = {
  key: "flightSearch",
  storage,
  blacklist: ["departureDate", "returnDate", "segments", "ui"],
};


// ✅ Root reducer
const rootReducer = combineReducers({
  holidayPackageFilters: holidayPackageFilterReducer,

  flightSearch: persistReducer(
    flightSearchPersistConfig,
    flightSearchReducer
  ),

  flightSession: flightSessionReducer,
  universityFilter: universityFilterReducer,
  courseFilter: courseFilterReducer,
  visaFilter: visaFilterReducer,
  testFilter: testFilterReducer,

  [laravelApi.reducerPath]: laravelApi.reducer,
  [medusaApi.reducerPath]: medusaApi.reducer,
});


// ✅ Store
export const store = configureStore({
  reducer: rootReducer, // ✅ NOT persistedReducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(laravelApi.middleware, medusaApi.middleware),
});


// ✅ Persistor (still needed)
export const persistor = persistStore(store);


// ✅ Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;