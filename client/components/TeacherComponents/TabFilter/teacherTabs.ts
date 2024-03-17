import { useGetEWorkOrdersQuery } from "@/redux/workOrdersSlice/workOrdersApi"

export const teacherFilters = [
  "All",
  "Pending",
  "Active",
  "Paused",
  "Completed",
  "Could Not Complete"
]

export function handleFilterLogic(filterName: string) {
  // * Return All work orders
  if (filterName === "All") {
    return useGetEWorkOrdersQuery().data?.payload.length
    // * Return New work orders (Work orders not seen by Maintenance)
  } else if (filterName === "Pending") {
    const workOrders = useGetEWorkOrdersQuery(undefined, {
      selectFromResult: ({ data }) => ({
        workOrdersLength: data?.payload.filter(
          (workOrder) => workOrder.seenByMaintenance === false
        )
      })
    })
    return workOrders.workOrdersLength?.length
  } else if (filterName === "Active") {
    const workOrders = useGetEWorkOrdersQuery(undefined, {
      selectFromResult: ({ data }) => ({
        workOrdersLength: data?.payload.filter((workOrder) =>
          ["Received", "Documented", "In Progress"].includes(workOrder.status)
        )
      })
    })
    return workOrders.workOrdersLength?.length
  } else if (filterName === "Paused") {
    const workOrders = useGetEWorkOrdersQuery(undefined, {
      selectFromResult: ({ data }) => ({
        workOrdersLength: data?.payload.filter(
          (workOrder) => workOrder.status === "Awaiting Materials"
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
