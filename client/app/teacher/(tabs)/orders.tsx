import { FlatList, Pressable, ScrollView, StyleSheet } from "react-native"
import { useSelector } from "react-redux"
import { useState } from "react"

import { View, Text } from "@/components/Themed"
import { RootState } from "@/redux/store"
import { useGetEWorkOrdersQuery } from "@/redux/workOrdersSlice/workOrdersApi"
import { teacherFilters } from "@/components/TeacherComponents/TabFilter/teacherTabs"
import TabFilter from "@/components/TeacherComponents/TabFilter/TeacherTabFilter"
import { IWorkOrder_From } from "@/types/workOrders"
import TeacherWorkOrderCard from "@/components/TeacherComponents/WorkOrderRequestCard/TeacherWorkOrderCard"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import Colors from "@/constants/Colors"
import { Link } from "expo-router"
import { FontAwesome6 } from "@expo/vector-icons"
import { Ionicons } from "@expo/vector-icons"

export default function WorkOrdersScreen() {
  const insets = useSafeAreaInsets()
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
    return (
      <View style={styles.loading}>
        <Text>No work orders found</Text>
      </View>
    )
  }

  // * Teachers see less info than Maintenance so this helps reduce clutter
  const activeStatuses = ["Received", "Documented", "In Progress"]

  const filteredWorkOrders =
    workOrders && workOrders.payload.length > 0
      ? workOrders.payload.filter((workOrder) => {
          if (activeFilter === "All") {
            return true
          } else if (activeFilter === "Active") {
            return activeStatuses.includes(workOrder.status)
          } else if (activeFilter === "Paused") {
            return workOrder.status === "Awaiting Materials"
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
        backgroundColor: "#f0f0f0"
      }}
    >
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
      {filteredWorkOrders?.length > 0 ? (
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
      ) : (
        <View style={styles.emptyList}>
          <Text>No {activeFilter.toLocaleLowerCase()} work orders</Text>
        </View>
      )}
      <Link style={styles.link} href="/teacher/work-order-form" asChild>
        <Pressable>
          {({ pressed }) => (
            <View style={{ backgroundColor: Colors.light.actionDarker }}>
              <Ionicons name="add" size={30} color="white" />
            </View>
          )}
        </Pressable>
      </Link>
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
    width: "80%"
  },
  workOrderList: {
    marginTop: 4,
    marginBottom: 4,
    flex: 1,
    height: "100%",
    width: "98%",
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    gap: 10,
    backgroundColor: "#f0f0f0"
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
  },
  link: {
    position: "absolute",
    width: 60,
    height: 60,
    backgroundColor: Colors.light.actionDarker,
    borderRadius: 100,
    // borderWidth: 1,
    // borderColor: "#a482b5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#260038",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    bottom: 30,
    right: 30
  }
})
