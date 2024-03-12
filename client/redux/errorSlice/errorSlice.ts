import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface ErrorState {
  errMessage: string | null
}

const initialState: ErrorState = {
  // TODO: Swap this back to null after styling
  errMessage: null
}

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string>) => {
      console.log("SETTING ERROR")
      state.errMessage = action.payload
    },
    hideErrorModal: (state) => {
      state.errMessage = null
    }
  }
})

export const { setError, hideErrorModal } = errorSlice.actions
export default errorSlice.reducer
