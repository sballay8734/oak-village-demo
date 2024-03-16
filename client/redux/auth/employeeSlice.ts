import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { PURGE } from "redux-persist"

import { AuthenticatedUser } from "@/types/responsesFromServer"

interface EmployeeState {
  employee: AuthenticatedUser | null
}

const initialState: EmployeeState = {
  employee: null
}

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    // TODO: STILL NEED TO REMOVE ROLE FROM AUTHENTICATED USER
    setEmployee: (state, action: PayloadAction<AuthenticatedUser | null>) => {
      state.employee = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => {
      console.log("Purging Employees")
      return initialState
    })
  }
})

export const { setEmployee } = employeeSlice.actions

export default employeeSlice.reducer
