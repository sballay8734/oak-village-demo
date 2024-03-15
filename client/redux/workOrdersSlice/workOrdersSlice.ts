import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { IWorkOrder_From } from "@/types/workOrders"

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
  }
})

export const { setWorkOrders } = workOrdersSlice.actions
export default workOrdersSlice.reducer
