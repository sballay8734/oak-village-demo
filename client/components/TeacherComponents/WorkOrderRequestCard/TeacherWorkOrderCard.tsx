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
            <AntDesign
              name="calendar"
              size={14}
              color={Colors.light.primaryDarker}
            />
            <Text style={{ fontSize: 12, color: Colors.light.textFaded }}>
              {new Date(workOrder.dateSubmitted).toDateString()} -
            </Text>
            <Text style={{ fontSize: 12, color: Colors.light.primaryDarker }}>
              {getDateDifference(workOrder.dateSubmitted)} days ago
            </Text>
          </View>
          <View
            style={styles.separator}
            lightColor="#eee"
            darkColor="rgba(255,255,255,0.1)"
          />
        </View>
        <Link
          href={{
            pathname: "/teacher/work-order-info",
            // /* 1. Navigate to the details route with query params */
            params: { workOrderId: workOrder._id }
          }}
          asChild
          style={{ alignSelf: "flex-start", width: "10%" }}
        >
          <Pressable
            style={{
              // backgroundColor: Colors.light.action,
              // borderRadius: 100,
              padding: 2
            }}
          >
            <Feather
              name="more-horizontal"
              size={24}
              color={Colors.light.actionDarker}
            />
          </Pressable>
        </Link>
      </View>
      {/* // * BOTTOM */}
      <View style={styles.cardBottom}>
        <View style={styles.cardMiddleWrapper}>
          <Text style={styles.cardMiddleText}>
            {workOrder.taskNeeded.length > 190
              ? workOrder.taskNeeded.slice(0, 191) + " ..."
              : workOrder.taskNeeded}
          </Text>
        </View>
        {/* // * Eye & Status */}
        <View style={styles.seenAndStatus}>
          {workOrder.seenByMaintenance ? (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 3,
                alignItems: "center"
              }}
            >
              <Ionicons name="eye" size={18} color={Colors.light.action} />
              <Text style={{ color: Colors.light.actionLighter, fontSize: 8 }}>
                John saw this
              </Text>
            </View>
          ) : (
            <Ionicons name="eye-off" size={18} color={Colors.light.lightGray} />
          )}
          <View
            style={{
              backgroundColor:
                workOrder.status === "Pending"
                  ? Colors.light.pendingBg
                  : ["Received", "Documented", "In Progress"].includes(
                      workOrder.status
                    )
                  ? Colors.light.activeBg
                  : workOrder.status === "Completed"
                  ? Colors.light.completedBg
                  : workOrder.status === "Awaiting Materials"
                  ? Colors.light.pausedBg
                  : Colors.light.cantCompleteBg,
              padding: 2,
              borderRadius: 100,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 1
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,
              elevation: 3
            }}
          >
            <Text
              style={{
                fontSize: 9,
                paddingVertical: 4,
                paddingHorizontal: 8,
                color:
                  workOrder.status === "Pending"
                    ? Colors.light.pendingText
                    : ["Received", "Documented", "In Progress"].includes(
                        workOrder.status
                      )
                    ? Colors.light.activeText
                    : workOrder.status === "Completed"
                    ? Colors.light.completedText
                    : workOrder.status === "Awaiting Materials"
                    ? Colors.light.pausedText
                    : Colors.light.cantCompleteText
              }}
            >
              {workOrder.status}
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  cardWrapper: {
    width: "100%",
    borderColor: Colors.light.lightGray,
    borderWidth: 1,
    borderRadius: 20,
    padding: 14,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    // gap: 10,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    height: 165,
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
    gap: 2,
    width: "90%"
  },
  cardHeaderText: { fontSize: 20 },
  cardFooterWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 30
  },
  cardMiddleWrapper: {
    display: "flex",
    alignItems: "flex-start",
    overflow: "hidden",
    height: 50
  },
  cardMiddleText: {
    fontSize: 12
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
  },
  separator: {
    height: 1,
    width: "100%",
    marginTop: 4
  },
  cardBottom: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    flexGrow: 1,
    paddingTop: 6
  }
})
