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

const rootReducer = combineReducers({
  flightSearch: flightSearchReducer,
  universityFilter: universityFilterReducer,
  courseFilter: courseFilterReducer,
  visaFilter: visaFilterReducer,
  testFilter: testFilterReducer,
  [laravelApi.reducerPath]: laravelApi.reducer,
  [medusaApi.reducerPath]: medusaApi.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["flightSearch"], // only persist flight search
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(laravelApi.middleware, medusaApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;