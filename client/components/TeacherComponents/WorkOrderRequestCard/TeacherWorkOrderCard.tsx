import { View, Text, Pressable, StyleSheet } from "react-native"

import { Feather } from "@expo/vector-icons"
import { AntDesign } from "@expo/vector-icons"
import { getDateDifference } from "@/helpers/dateFormatting"
import { Link } from "expo-router"
import { IWorkOrder_From } from "@/types/workOrders"
import { Ionicons } from "@expo/vector-icons"

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
        <Text style={styles.cardHeaderText}>
          {workOrder.classroom} - {workOrder.areaInClassroom}
        </Text>
        <Link
          href={{
            pathname: "/teacher/work-order-info",
            // /* 1. Navigate to the details route with query params */
            params: { workOrderId: workOrder._id }
          }}
          asChild
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
      {/* // * Description */}
      <View>
        <Text>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur
          nemo esse amet nobis error veritatis dolor mollitia...
        </Text>
      </View>
      {/* // * Date and how many days ago it was submitted, status on bottom right */}
      <View style={styles.cardFooterWrapper}>
        <View style={styles.dateWrapper}>
          <AntDesign name="calendar" size={14} color="black" />
          <Text style={{ fontSize: 12 }}>
            {new Date(workOrder.dateSubmitted).toDateString()} -
          </Text>
          <Text style={{ fontSize: 12, color: "red" }}>
            {getDateDifference(workOrder.dateSubmitted)} days ago
          </Text>
        </View>
        <View style={styles.seenAndStatus}>
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
          {workOrder.seenByMaintenance ? (
            <Ionicons name="eye" size={18} color="green" />
          ) : (
            <Ionicons name="eye-off" size={18} color="red" />
          )}
        </View>
        {/* <Text>{employeeName}</Text> */}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  cardWrapper: {
    width: "100%",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 10,
    padding: 14,
    display: "flex",
    flexDirection: "column",
    gap: 10
  },
  cardHeaderWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  cardHeaderText: { fontSize: 16, fontWeight: "bold" },
  cardFooterWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
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
    alignItems: "center",
    justifyContent: "center",
    gap: 4
  }
})
