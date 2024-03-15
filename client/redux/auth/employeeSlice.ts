import { createSlice, PayloadAction } from "@reduxjs/toolkit"

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
  }
})

export const { setEmployee } = employeeSlice.actions

export default employeeSlice.reducer
