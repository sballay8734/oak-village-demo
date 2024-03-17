import { Pressable, StyleSheet } from "react-native"

import { Feather } from "@expo/vector-icons"
import { AntDesign } from "@expo/vector-icons"
import { getDateDifference } from "@/helpers/dateFormatting"
import { Link } from "expo-router"
import { IWorkOrder_From } from "@/types/workOrders"
import { Ionicons } from "@expo/vector-icons"
import Colors from "@/constants/Colors"
import { View, Text } from "@/components/Themed"

interface TeacherWorkOrderCardProps {
  workOrder: IWorkOrder_From
}

// TODO: FADE OUT TEXT (2 lines max, 2nd line faded)

export default function TeacherWorkOrderCard({
  workOrder
}: TeacherWorkOrderCardProps) {
  return (
    <View style={styles.cardWrapper}>
      {/* // * Header and three dots (...) */}
      <View style={styles.cardHeaderWrapper}>
        <View style={styles.headerLeftWrapper}>
          <Text style={styles.cardHeaderText}>{workOrder.classroom}</Text>
          <View style={styles.dateWrapper}>
            <AntDesign name="calendar" size={14} color="black" />
            <Text style={{ fontSize: 12 }}>
              {new Date(workOrder.dateSubmitted).toDateString()} -
            </Text>
            <Text style={{ fontSize: 12, color: "red" }}>
              {getDateDifference(workOrder.dateSubmitted)} days ago
            </Text>
          </View>
        </View>
        <Link
          href={{
            pathname: "/teacher/work-order-info",
            // /* 1. Navigate to the details route with query params */
            params: { workOrderId: workOrder._id }
          }}
          asChild
          style={{ alignSelf: "flex-start" }}
        >
          <Pressable
            style={{
              backgroundColor: "#a26ee6",
              borderRadius: 100,
              padding: 2
            }}
          >
            <Feather name="more-horizontal" size={20} color="white" />
          </Pressable>
        </Link>
      </View>
      {/* // * Date Wrapper */}
      <View style={styles.cardMiddleWrapper}></View>
      <View style={styles.seenAndStatus}>
        {workOrder.seenByMaintenance ? (
          <Ionicons name="eye" size={18} color={Colors.light.statusOk} />
        ) : (
          <Ionicons name="eye-off" size={18} color={Colors.light.lightGray} />
        )}
        <View
          style={{
            backgroundColor:
              workOrder.status === "Pending"
                ? "#8ebfe8"
                : workOrder.status === "In Progress"
                ? "#e0e677"
                : workOrder.status === "Completed"
                ? "#91e88e"
                : "gray",
            padding: 2,
            borderRadius: 100
          }}
        >
          <Text
            style={{
              fontSize: 12,
              paddingVertical: 4,
              paddingHorizontal: 8
            }}
          >
            {workOrder.status}
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  cardWrapper: {
    width: "100%",
    // borderColor: "black",
    // borderWidth: 2,
    borderRadius: 10,
    padding: 14,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5
  },
  cardHeaderWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  headerLeftWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: 2
  },
  cardHeaderText: { fontSize: 16, fontWeight: "bold" },
  cardFooterWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 30
  },
  cardMiddleWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    height: 30
  },
  dateWrapper: {
    display: "flex",
    flexDirection: "row",
    gap: 4,
    alignItems: "center"
  },
  seenAndStatus: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: 4
  }
})
