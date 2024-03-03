import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"

import { authApi } from "./auth/authApi"
import { rootReducer } from "./rootReducer"

const persistConfig = {
  key: "root",
  storage,
  version: 1
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware)
})

setupListeners(store.dispatch)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred
export type AppDispatch = typeof store.dispatch
export const persistor = persistStore(store)
