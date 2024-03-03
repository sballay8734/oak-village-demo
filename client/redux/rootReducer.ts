import { combineReducers } from "@reduxjs/toolkit"

import { authApi } from "./auth/authApi"
import employeeReducer from "./auth/employeeSlice"

export const rootReducer = combineReducers({
  employeeSlice: employeeReducer,
  [authApi.reducerPath]: authApi.reducer
})
