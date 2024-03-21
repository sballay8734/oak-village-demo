import { FlatList, RefreshControl, ScrollView, StyleSheet } from "react-native"
import { useSelector } from "react-redux"
import { useState } from "react"

import { View, Text } from "@/components/Themed"
import { RootState } from "@/redux/store"
import { useGetMWorkOrdersQuery } from "@/redux/workOrdersSlice/workOrdersApi"
import { maintenanceFilters } from "@/components/MaintenanceComponents/TabFilter/maintenanceTabs"
import TabFilter from "@/components/MaintenanceComponents/TabFilter/MaintenanceTabFilter"
import MaintenanceWorkOrderCard from "@/components/MaintenanceComponents/WorkOrderRequestCard/MaintenanceWorkOrderCard"
import { IWorkOrder_From } from "@/types/workOrders"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import Colors from "@/constants/Colors"

// ! GET TYPES CORRECT FROM API (IT IS NOT EXPECTING THE RIGHT FORMAT)

export default function WorkOrdersScreen() {
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const insets = useSafeAreaInsets()
  const employee = useSelector(
    (state: RootState) => state.employeeSlice.employee
  )
  const { refetch, data: workOrders, isLoading } = useGetMWorkOrdersQuery()
  const [activeFilter, setActiveFilter] = useState<string>("All")

  function handleFilterChange(filter: string) {
    setActiveFilter(filter)
  }

  function handleRefresh() {
    refetch()
  }

  if (!employee || isLoading) {
    return (
      <View style={styles.loading}>
        <Text>Loading...</Text>
      </View>
    )
  }

  const filteredWorkOrders =
    workOrders && workOrders.length > 0
      ? workOrders.filter((workOrder) => {
          if (activeFilter === "All") {
            return workOrders
          } else if (activeFilter === "New") {
            return workOrder.seenByMaintenance === false
          } else {
            return workOrder.status === activeFilter
          }
        })
      : []

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",

        // Paddings to handle safe area
        paddingTop: insets.top,
        // paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        backgroundColor: "white"
      }}
    >
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
      {filteredWorkOrders ? (
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          style={styles.workOrderList}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              progressViewOffset={2}
              tintColor={Colors.light.actionLighter}
              size={2}
              title="Pull down to refresh"
              refreshing={refreshing}
              onRefresh={handleRefresh}
            />
          }
        >
          {!isLoading && (!workOrders || workOrders.length === 0) ? (
            <View
              style={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text style={{ fontSize: 20, marginBottom: 2 }}>
                No work orders found
              </Text>
              <Text style={{ fontSize: 10, color: Colors.light.textFaded }}>
                (Pull down to refresh)
              </Text>
            </View>
          ) : (
            <View style={styles.workOrderList}>
              {filteredWorkOrders.map((workOrder: IWorkOrder_From) => (
                <MaintenanceWorkOrderCard
                  key={workOrder._id}
                  workOrder={workOrder}
                />
              ))}
            </View>
          )}
        </ScrollView>
      ) : (
        <View style={styles.emptyList}>
          <Text>No {activeFilter.toLocaleLowerCase()} work orders</Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold"
  },
  separator: {
    marginTop: 12,
    height: 1,
    width: "100%"
  },
  workOrderList: {
    marginTop: 0,
    marginBottom: 0,
    flex: 1,
    height: "100%",
    width: "98%",
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    gap: 10,
    backgroundColor: "white",
    paddingBottom: 20
  },
  emptyList: {
    marginTop: 4,
    marginBottom: 4,
    flex: 1,
    height: "100%",
    width: "98%",
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
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
