import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { IEmployee_From } from "./types"

const authSlice = createSlice({
  name: "authSlice",
  initialState: "",
  reducers: {
    setUser: (state, action: PayloadAction<IEmployee_From>) => {
      console.log(action.payload)
    }
  }
})

export const { setUser } = authSlice.actions

export default authSlice.reducer
