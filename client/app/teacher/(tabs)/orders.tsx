import {
  FlatList,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet
} from "react-native"
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
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const insets = useSafeAreaInsets()
  const employee = useSelector(
    (state: RootState) => state.employeeSlice.employee
  )
  const { refetch, data: workOrders, isLoading } = useGetEWorkOrdersQuery()
  const [activeFilter, setActiveFilter] = useState<string>("All")

  function handleFilterChange(filter: string) {
    setActiveFilter(filter)
  }

  function handleRefresh() {
    refetch()
  }

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <Text>Loading...</Text>
      </View>
    )
  }

  // if (!isLoading && (!workOrders || workOrders.length === 0)) {
  //   return (
  //     <View
  //       style={{
  //         flex: 1,
  //         justifyContent: "center",
  //         alignItems: "center",

  //         paddingTop: insets.top,
  //         // paddingBottom: insets.bottom,
  //         paddingLeft: insets.left,
  //         paddingRight: insets.right,
  //         backgroundColor: "white"
  //       }}
  //     >
  //       <FlatList
  //         data={teacherFilters}
  //         renderItem={({ item }) => (
  //           <TabFilter
  //             filterName={item}
  //             active={item === activeFilter}
  //             handleFilterChange={handleFilterChange}
  //           />
  //         )}
  //         showsHorizontalScrollIndicator={false}
  //         horizontal
  //         style={{
  //           flexGrow: 0,
  //           display: "flex"
  //         }}
  //       ></FlatList>
  //       <View
  //         style={styles.separator}
  //         lightColor="#eee"
  //         darkColor="rgba(255,255,255,0.1)"
  //       />
  //       <View
  //         style={{
  //           flexGrow: 1,
  //           display: "flex",
  //           alignItems: "center",
  //           justifyContent: "center"
  //         }}
  //       >
  //         <Text>No work orders found</Text>
  //       </View>
  //       <Link style={styles.link} href="/teacher/work-order-form" asChild>
  //         <Pressable>
  //           {({ pressed }) => (
  //             <View style={{ backgroundColor: Colors.light.actionDarker }}>
  //               <Ionicons name="add" size={30} color="white" />
  //             </View>
  //           )}
  //         </Pressable>
  //       </Link>
  //     </View>
  //   )
  // }

  // * Teachers see less info than Maintenance so this helps reduce clutter
  const activeStatuses = ["Received", "Documented", "In Progress"]

  const filteredWorkOrders =
    workOrders && workOrders.length > 0
      ? workOrders.filter((workOrder) => {
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
        backgroundColor: "white"
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
                <TeacherWorkOrderCard
                  key={workOrder._id}
                  workOrder={workOrder}
                />
              ))}
            </View>
          )}
        </ScrollView>
      ) : (
        <View style={styles.emptyList}>
          <Text>No "{activeFilter.toLocaleLowerCase()}" work orders</Text>
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
  },
  link: {
    position: "absolute",
    width: 55,
    height: 55,
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
    bottom: 25,
    right: 25
  }
})
