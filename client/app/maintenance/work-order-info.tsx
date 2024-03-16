import { StatusBar } from "expo-status-bar"
import { Platform, StyleSheet } from "react-native"

import { Text, View } from "@/components/Themed"
import { useLocalSearchParams } from "expo-router"
import {
  useGetMWorkOrdersQuery,
  workOrdersApi
} from "@/redux/workOrdersSlice/workOrdersApi"
import { AntDesign } from "@expo/vector-icons"
import { getDateDifference } from "@/helpers/dateFormatting"

export default function WorkOrderInfo() {
  const params = useLocalSearchParams()
  const { workOrderId } = params
  const { workOrder } = workOrdersApi.useGetMWorkOrdersQuery(undefined, {
    selectFromResult: ({ data }) => ({
      workOrder: data?.payload.find(
        (workOrder) => workOrder._id === workOrderId
      )
    })
  })

  if (!workOrder)
    return (
      <View>
        <Text>An error has occured!</Text>
      </View>
    )

  return (
    <View style={styles.container}>
      <View style={styles.cardWrapper}>
        {/* // * Header and three dots (...) */}
        <View style={styles.cardHeaderWrapper}>
          <Text style={styles.cardHeaderText}>
            {workOrder.classroom} - {workOrder.areaInClassroom}
          </Text>
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
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20
  },
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
