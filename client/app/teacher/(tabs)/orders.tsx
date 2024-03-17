import { FlatList, ScrollView, StyleSheet } from "react-native"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"

import { View, Text } from "@/components/Themed"
import { RootState } from "@/redux/store"
import { useGetEWorkOrdersQuery } from "@/redux/workOrdersSlice/workOrdersApi"
import { teacherFilters } from "@/components/TeacherComponents/TabFilter/teacherTabs"
import TabFilter from "@/components/TeacherComponents/TabFilter/TeacherTabFilter"
import { IWorkOrder_From } from "@/types/workOrders"
import TeacherWorkOrderCard from "@/components/TeacherComponents/WorkOrderRequestCard/TeacherWorkOrderCard"

export default function WorkOrdersScreen() {
  const employee = useSelector(
    (state: RootState) => state.employeeSlice.employee
  )
  const { data: workOrders, isLoading } = useGetEWorkOrdersQuery()
  const [activeFilter, setActiveFilter] = useState<string>("All")

  function handleFilterChange(filter: string) {
    setActiveFilter(filter)
  }

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <Text>Loading...</Text>
      </View>
    )
  }

  if (!isLoading && (!workOrders || workOrders.payload.length === 0)) {
    console.log("CATCH CASE", workOrders)
    return (
      <View style={styles.loading}>
        <Text>No work orders found</Text>
      </View>
    )
  }

  const filteredWorkOrders =
    workOrders && workOrders.payload.length > 0
      ? workOrders.payload.filter((workOrder) => {
          if (activeFilter === "All") {
            return true
          } else {
            return workOrder.status === activeFilter
          }
        })
      : []

  console.log("FWO", filteredWorkOrders)

  return (
    <View style={styles.container}>
      {/* // * NAV/FILTER */}
      <FlatList
        data={teacherFilters}
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
      {filteredWorkOrders?.length > 0 && (
        <ScrollView
          style={styles.workOrderList}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.workOrderList}>
            {filteredWorkOrders.map((workOrder: IWorkOrder_From) => (
              <TeacherWorkOrderCard key={workOrder._id} workOrder={workOrder} />
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    paddingVertical: 12
    // gap: 10
  },
  title: {
    fontSize: 20,
    fontWeight: "bold"
  },
  separator: {
    marginTop: 12,
    height: 1,
    width: "80%"
  },
  workOrderList: {
    marginTop: 6,
    flex: 1,
    height: "100%",
    width: "98%",
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    gap: 10
  },
  loading: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
})
