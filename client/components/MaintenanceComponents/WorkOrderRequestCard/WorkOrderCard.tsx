import { View, Text, Pressable, StyleSheet } from "react-native"

import { Feather } from "@expo/vector-icons"
import { AntDesign } from "@expo/vector-icons"
import { getDateDifference } from "@/helpers/dateFormatting"
import { Link } from "expo-router"
import { IWorkOrder_From } from "@/types/workOrders"

interface WorkOrderCardProps {
  workOrder: IWorkOrder_From
}

// TODO: FADE OUT TEXT (2 lines max, 2nd line faded)

export default function WorkOrderCard({ workOrder }: WorkOrderCardProps) {
  return (
    <View style={styles.cardWrapper}>
      {/* // * Header and three dots (...) */}
      <View style={styles.cardHeaderWrapper}>
        <Text style={styles.cardHeaderText}>
          {workOrder.classroom} - {workOrder.areaInClassroom}
        </Text>
        <Link
          href={{
            pathname: "/maintenance/work-order-info",
            // /* 1. Navigate to the details route with query params */
            params: { workOrderId: workOrder._id }
          }}
          asChild
        >
          <Pressable>
            {({ pressed }) => (
              <Feather name="more-horizontal" size={24} color="black" />
            )}
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
          <AntDesign name="calendar" size={16} color="black" />
          <Text>{new Date(workOrder.dateSubmitted).toDateString()} -</Text>
          <Text>{getDateDifference(workOrder.dateSubmitted)} days ago</Text>
        </View>
        <Text>{workOrder.status}</Text>
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
    padding: 10,
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
  }
})
