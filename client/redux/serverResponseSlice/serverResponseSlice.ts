import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface ServerResponseState {
  successResult: true | false | null
  responseMessage: string | null
}

const initialState: ServerResponseState = {
  successResult: null,
  responseMessage: null
}

const serverResponseSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setResponseMessage: (
      state,
      action: PayloadAction<{ successResult: boolean; message: string }>
    ) => {
      const { successResult, message } = action.payload
      state.successResult = successResult
      state.responseMessage = message
    },
    hideResponseModal: (state) => {
      state.successResult = null
      state.responseMessage = null
    }
  }
})

export const { setResponseMessage, hideResponseModal } =
  serverResponseSlice.actions
export default serverResponseSlice.reducer
