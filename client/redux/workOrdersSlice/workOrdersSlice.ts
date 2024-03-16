import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { IWorkOrder_From } from "@/types/workOrders"
import { PURGE } from "redux-persist"

interface WorkOrdersState {
  workOrders: IWorkOrder_From[]
}

const initialState: WorkOrdersState = {
  workOrders: []
}

const workOrdersSlice = createSlice({
  name: "workOrders",
  initialState,
  reducers: {
    setWorkOrders: (state, action: PayloadAction<IWorkOrder_From[]>) => {
      state.workOrders = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => {
      console.log("Purging Workorders")
      return initialState
    })
  }
})

export const { setWorkOrders } = workOrdersSlice.actions
export default workOrdersSlice.reducer
