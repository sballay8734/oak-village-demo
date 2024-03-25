// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import {
  ModifiedWorkOrderFrom,
  WorkOrderFrom
} from "@/types/responsesFromServer"
import {
  CreateUserFormData,
  StatusUpdateParams,
  SeenUpdateParams
} from "@/types/requestsToServer"
import { setResponseMessage } from "../serverResponseSlice/serverResponseSlice"
import { handleMutationErrors } from "@/helpers/errorHandling"
import { handleMutationSuccess } from "@/helpers/successHandling"
import { LAPTOP_HOME_IP } from "@/constants/ipConfig"

// ! TODO: Get RID OF SUCCESS, FAIL, etc... and use the custom error handler you made (Also try and move the error handler out of the components)
interface Success {
  message: string
  payload: WorkOrderFrom[]
  success: true
}
interface Fail {
  message: string
  payload: WorkOrderFrom[]
  success: false
}
interface CreateSuccess {
  message: string
  payload: WorkOrderFrom
  success: true
}

// Define a service using a base URL and expected endpoints
export const workOrdersApi = createApi({
  reducerPath: "workOrders",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://${LAPTOP_HOME_IP}:3001/api/maintenance`
  }),
  tagTypes: ["MaintenanceWorkOrders", "EmployeeWorkOrders"],
  endpoints: (builder) => ({
    // First is what we get back, second is what we send TODO: !!!
    // * Maintenance Work Orders (ALL)
    getMWorkOrders: builder.query<WorkOrderFrom[], void>({
      query: () => `/maintenance-work-orders`,
      providesTags: (result) =>
        Array.isArray(result)
          ? [
              ...result.map(({ _id }) => ({
                type: "MaintenanceWorkOrders" as const,
                _id
              })),
              { type: "MaintenanceWorkOrders", _id: "LIST" }
            ]
          : [{ type: "MaintenanceWorkOrders", _id: "LIST" }],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled
          // handleMutationSuccess(dispatch, "Found work orders!")
        } catch (err) {
          handleMutationErrors(err, dispatch)
        }
      }
    }),
    updateStatus: builder.mutation<WorkOrderFrom, StatusUpdateParams>({
      query: (body) => ({
        url: `/maintenance-work-orders/update-status`,
        method: "PUT",
        body
      }),
      // TODO: This SHOULD only invalidate specific work order (need to test)
      invalidatesTags: (result, error, { workOrderId }) => [
        { type: "MaintenanceWorkOrders", workOrderId }
      ]
    }),
    updateSeen: builder.mutation<WorkOrderFrom, SeenUpdateParams>({
      query: (body) => ({
        url: `/maintenance-work-orders/update-seen`,
        method: "PUT",
        body
      }),
      // TODO: This SHOULD only invalidate specific work order (need to test)
      invalidatesTags: (result, error, { workOrderId }) => [
        { type: "MaintenanceWorkOrders", workOrderId }
      ]
    }),
    // * Employee Work Orders (ALL by employeeId)
    getEWorkOrders: builder.query<WorkOrderFrom[], void>({
      query: () => `/employee-work-orders`,
      providesTags: (result) =>
        Array.isArray(result)
          ? [
              ...result.map(({ _id }) => ({
                type: "EmployeeWorkOrders" as const,
                _id
              })),
              { type: "EmployeeWorkOrders", _id: "LIST" }
            ]
          : [{ type: "EmployeeWorkOrders", _id: "LIST" }],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled
          // handleMutationSuccess(dispatch, "Found work orders!")
        } catch (err) {
          handleMutationErrors(err, dispatch)
        }
      }
    }),
    createWorkOrder: builder.mutation<CreateSuccess, CreateUserFormData>({
      query: (body) => ({
        url: `/create-work-order`,
        method: "POST",
        body
      }),
      invalidatesTags: ["EmployeeWorkOrders"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled
          handleMutationSuccess(dispatch, "Successfully created work order!")
        } catch (err) {
          handleMutationErrors(err, dispatch)
        }
      }
    })
  })
})

export const {
  useGetMWorkOrdersQuery,
  useGetEWorkOrdersQuery,
  useUpdateStatusMutation,
  useUpdateSeenMutation,
  useCreateWorkOrderMutation
} = workOrdersApi

export const { endpoints } = workOrdersApi
