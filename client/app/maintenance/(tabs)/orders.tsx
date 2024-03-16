import { FlatList, ScrollView, StyleSheet } from "react-native"
import { useSelector } from "react-redux"
import { useState } from "react"

import { View, Text } from "@/components/Themed"
import { RootState } from "@/redux/store"
import { useFetchMaintenanceWorkOrdersQuery } from "@/redux/workOrdersSlice/workOrdersApi"
import { maintenanceFilters } from "@/components/MaintenanceComponents/TabFilter/tabs"
import TabFilter from "@/components/MaintenanceComponents/TabFilter/TabFilter"
import WorkOrderCard from "@/components/MaintenanceComponents/WorkOrderRequestCard/WorkOrderCard"
import { IWorkOrder_From } from "@/types/workOrders"

// ! GET TYPES CORRECT FROM API (IT IS NOT EXPECTING THE RIGHT FORMAT)

export default function WorkOrdersScreen() {
  const employee = useSelector(
    (state: RootState) => state.employeeSlice.employee
  )
  const { data: workOrders, isLoading } = useFetchMaintenanceWorkOrdersQuery()
  const [activeFilter, setActiveFilter] = useState<string>("All")

  function handleFilterChange(filter: string) {
    setActiveFilter(filter)
  }

  if (!employee || isLoading)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  console.log(workOrders.payload)

  return (
    <View style={styles.container}>
      {/* // * NAV/FILTER */}
      <FlatList
        data={maintenanceFilters}
        renderItem={({ item }) => (
          <TabFilter
            filterName={item}
            count={5}
            active={item === activeFilter}
            handleFilterChange={handleFilterChange}
          />
        )}
        showsHorizontalScrollIndicator={false}
        horizontal
        style={{
          flexGrow: 0,
          display: "flex"
        }}
      ></FlatList>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

      {/* // * WORK ORDER LIST */}
      <View
        style={{
          flex: 1,
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 10
        }}
      >
        {workOrders &&
          !isLoading &&
          workOrders.payload.map((workOrder: IWorkOrder_From) => {
            return (
              <WorkOrderCard
                key={workOrder._id}
                classroom={workOrder.classroom}
                areaInClassroom={workOrder.areaInClassroom}
                taskNeeded={workOrder.taskNeeded}
                additionalDetails={workOrder.additionalDetails}
                employeeName={workOrder.employeeName}
                status={workOrder.status}
                dateSubmitted={workOrder.dateSubmitted}
              />
            )
          })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    flexDirection: "column",
    padding: 12,
    gap: 10
  },
  title: {
    fontSize: 20,
    fontWeight: "bold"
  },
  separator: {
    marginVertical: 0,
    height: 1,
    width: "80%"
  }
})
