// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { WorkOrderFrom } from "@/types/responsesFromServer"

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
    getMWorkOrders: builder.query<Success | Fail, void>({
      query: () => `/maintenance-work-orders`,
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
    }),
    getEWorkOrders: builder.query<WorkOrderFrom[], void>({
      query: () => `/employee-work-orders`,
      providesTags: (result) =>
        result
          ? result.map(({ _id }) => ({ type: "EmployeeWorkOrders", _id }))
          : []
    }),
    getWorkOrderById: builder.query<WorkOrderFrom, string>({
      query: (_id) => `/maintenance-work-orders/${_id}`
    })

    // ! Make sure createWorkOrder invalidates EmployeeWorkOrders to auto refetch
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

export const { useGetMWorkOrdersQuery, useGetEWorkOrdersQuery } = workOrdersApi

export const { endpoints } = workOrdersApi
