import { combineReducers } from "@reduxjs/toolkit"

import { authApi } from "./auth/authApi"
import employeeReducer from "./auth/employeeSlice"
import serverResponseReducer from "./serverResponseSlice/serverResponseSlice"

export const rootReducer = combineReducers({
  employeeSlice: employeeReducer,
  serverResponseSlice: serverResponseReducer,
  [authApi.reducerPath]: authApi.reducer
})
