import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { IEmployee_From } from "./types"

interface EmployeeState {
  employee: IEmployee_From | null
}

const initialState = {
  employee: null
}

const employeeSlice = createSlice({
  name: "employee",
  initialState: initialState,
  reducers: {
    setEmployee: (state, action: PayloadAction<IEmployee_From>) => {
      console.log(action.payload)
    }
  }
})

export const { setEmployee } = employeeSlice.actions

export default employeeSlice.reducer
