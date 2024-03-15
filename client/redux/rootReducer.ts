import { combineReducers } from "@reduxjs/toolkit"

import { authApi } from "./auth/authApi"
import employeeReducer from "./auth/employeeSlice"
import serverResponseReducer from "./serverResponseSlice/serverResponseSlice"
import workOrdersReducer from "./workOrdersSlice/workOrdersSlice"

export const rootReducer = combineReducers({
  employeeSlice: employeeReducer,
  serverResponseSlice: serverResponseReducer,
  workOrdersSlice: workOrdersReducer,
  [authApi.reducerPath]: authApi.reducer
})
