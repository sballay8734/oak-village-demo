// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { WorkOrderFrom } from "@/types/responsesFromServer"

interface StatusUpdateParams {
  workOrderId: string
  status: string
}
interface SeenUpdateParams {
  workOrderId: string
  seenStatus: boolean
}
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

// Define a service using a base URL and expected endpoints
export const workOrdersApi = createApi({
  reducerPath: "workOrders",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/api/maintenance"
  }),
  tagTypes: ["MaintenanceWorkOrders", "EmployeeWorkOrders"],
  endpoints: (builder) => ({
    // First is what we get back, second is what we send TODO: !!!
    // * Maintenance Work Orders (ALL)
    getMWorkOrders: builder.query<Success | Fail, void>({
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
          : [{ type: "MaintenanceWorkOrders", _id: "LIST" }]
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
          : [{ type: "EmployeeWorkOrders", _id: "LIST" }]
    })
    // createWorkOrder: build.mutation<Post, Partial<Post>>({
    //   query: (body) => ({
    //     url: `posts`,
    //     method: "POST",
    //     body
    //   }),
    //   invalidatesTags: ["EmployeeWorkOrders"]
    // })
  })
})

export const {
  useGetMWorkOrdersQuery,
  useGetEWorkOrdersQuery,
  useUpdateStatusMutation,
  useUpdateSeenMutation
} = workOrdersApi

export const { endpoints } = workOrdersApi
