import { useGetMWorkOrdersQuery } from "@/redux/workOrdersSlice/workOrdersApi"

export const maintenanceFilters = [
  "All",
  "New",
  "Pending",
  "Received",
  "Documented",
  "In Progress",
  "Awaiting Materials",
  "Completed",
  "Could Not Complete"
]

export function handleFilterLogic(filterName: string) {
  // * Return All work orders
  if (filterName === "All") {
    return useGetMWorkOrdersQuery().data?.length
    // * Return New work orders (Work orders not seen by Maintenance)
  } else if (filterName === "New") {
    const workOrders = useGetMWorkOrdersQuery(undefined, {
      selectFromResult: ({ data }) => ({
        workOrdersLength: data?.filter(
          (workOrder) => workOrder.seenByMaintenance === false
        )
      })
    })
    return workOrders.workOrdersLength?.length
  }
  // * Return work orders the match category
  const workOrders = useGetMWorkOrdersQuery(undefined, {
    selectFromResult: ({ data }) => ({
      workOrdersLength: data?.filter(
        (workOrder) => workOrder.status === filterName
      )
    })
  })
  return workOrders.workOrdersLength?.length
}
