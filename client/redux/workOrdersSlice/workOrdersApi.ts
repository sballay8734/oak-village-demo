// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { WorkOrderFrom } from "@/types/responsesFromServer"

// Define a service using a base URL and expected endpoints
export const workOrdersApi = createApi({
  reducerPath: "wordOrders",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/api/maintenance"
  }),
  endpoints: (builder) => ({
    // First is what we get back, second is what we send TODO: !!!
    fetchMaintenanceWorkOrders: builder.query<WorkOrderFrom[], void>({
      query: () => ({
        url: `/maintenance-work-orders`,
        method: "GET"
      })
    }),
    fetchEmployeeWorkOrders: builder.query<WorkOrderFrom[], void>({
      query: () => ({
        url: `/employee-work-orders`,
        method: "GET"
      })
    })
  })
})

export const {
  useFetchMaintenanceWorkOrdersQuery,
  useFetchEmployeeWorkOrdersQuery
} = workOrdersApi
