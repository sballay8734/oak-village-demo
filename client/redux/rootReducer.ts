import { combineReducers } from "@reduxjs/toolkit"

import { authApi } from "./auth/authApi"
import employeeReducer from "./auth/employeeSlice"
import errorReducer from "./errorSlice/errorSlice"

export const rootReducer = combineReducers({
  employeeSlice: employeeReducer,
  errorSlice: errorReducer,
  [authApi.reducerPath]: authApi.reducer
})
