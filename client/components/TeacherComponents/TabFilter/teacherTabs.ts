import { useGetEWorkOrdersQuery } from "@/redux/workOrdersSlice/workOrdersApi"

export const teacherFilters = [
  "All",
  "Pending",
  "Received",
  "Documented",
  "Awaiting Materials",
  "In Progress",
  "Completed",
  "Could Not Complete"
]

export function handleFilterLogic(filterName: string) {
  // * Return All work orders
  if (filterName === "All") {
    return useGetEWorkOrdersQuery().data?.payload.length
    // * Return New work orders (Work orders not seen by Maintenance)
  } else if (filterName === "New") {
    const workOrders = useGetEWorkOrdersQuery(undefined, {
      selectFromResult: ({ data }) => ({
        workOrdersLength: data?.payload.filter(
          (workOrder) => workOrder.seenByMaintenance === false
        )
      })
    })
    return workOrders.workOrdersLength?.length
  }
  // * Return work orders the match category
  const workOrders = useGetEWorkOrdersQuery(undefined, {
    selectFromResult: ({ data }) => ({
      workOrdersLength: data?.payload.filter(
        (workOrder) => workOrder.status === filterName
      )
    })
  })
  return workOrders.workOrdersLength?.length
}
