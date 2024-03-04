import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { IEmployee_From } from "./types"

interface EmployeeState {
  employee: IEmployee_From | null
}

const initialState: EmployeeState = {
  employee: null
}

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    // TODO: Replace "string" with IEmployee_From eventually
    setEmployee: (state, action: PayloadAction<IEmployee_From | null>) => {
      state.employee = action.payload
    }
  }
})

export const { setEmployee } = employeeSlice.actions

export default employeeSlice.reducer
