import { FlatList, ScrollView, StyleSheet } from "react-native"
import { useSelector } from "react-redux"
import { useState } from "react"

import { View, Text } from "@/components/Themed"
import { RootState } from "@/redux/store"
import { useGetMWorkOrdersQuery } from "@/redux/workOrdersSlice/workOrdersApi"
import { maintenanceFilters } from "@/components/MaintenanceComponents/TabFilter/maintenanceTabs"
import TabFilter from "@/components/MaintenanceComponents/TabFilter/MaintenanceTabFilter"
import MaintenanceWorkOrderCard from "@/components/MaintenanceComponents/WorkOrderRequestCard/MaintenanceWorkOrderCard"
import { IWorkOrder_From } from "@/types/workOrders"

// ! GET TYPES CORRECT FROM API (IT IS NOT EXPECTING THE RIGHT FORMAT)

export default function WorkOrdersScreen() {
  const employee = useSelector(
    (state: RootState) => state.employeeSlice.employee
  )
  const { data: workOrders, isLoading } = useGetMWorkOrdersQuery()
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

  const filteredWorkOrders =
    workOrders &&
    workOrders.payload.filter((workOrder) => {
      if (activeFilter === "All") {
        return workOrders.payload
      } else if (activeFilter === "New") {
        return workOrder.seenByMaintenance === false
      } else {
        return workOrder.status === activeFilter
      }
    })

  return (
    <View style={styles.container}>
      {/* // * NAV/FILTER */}
      <FlatList
        data={maintenanceFilters}
        renderItem={({ item }) => (
          <TabFilter
            filterName={item}
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
      {filteredWorkOrders?.length ? (
        <ScrollView
          style={styles.workOrderList}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.workOrderList}>
            {filteredWorkOrders.map((workOrder: IWorkOrder_From) => (
              <MaintenanceWorkOrderCard
                key={workOrder._id}
                workOrder={workOrder}
              />
            ))}
          </View>
        </ScrollView>
      ) : (
        <View>
          <Text>0 {activeFilter} Work Orders</Text>
        </View>
      )}
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
  },
  workOrderList: {
    flex: 1,
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 10
  }
})
