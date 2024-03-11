import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface ErrorState {
  errMessage: string | null
}

const initialState: ErrorState = {
  errMessage: ""
}

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string>) => {
      state.errMessage = action.payload
    },
    hideErrorModal: (state) => {
      state.errMessage = null
    }
  }
})

export const { setError, hideErrorModal } = errorSlice.actions
export default errorSlice.reducer
