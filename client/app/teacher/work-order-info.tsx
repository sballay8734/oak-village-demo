import { Pressable, StyleSheet } from "react-native"
import { Link, useLocalSearchParams } from "expo-router"
import { useRouter } from "expo-router"

import { useGetEWorkOrdersQuery } from "@/redux/workOrdersSlice/workOrdersApi"
import { Text, View } from "@/components/Themed"
import Colors from "@/constants/Colors"
import { getDateDifference } from "@/helpers/dateFormatting"
import { AntDesign } from "@expo/vector-icons"

export default function WorkOrderInfo() {
  const router = useRouter()
  const params = useLocalSearchParams()
  const { workOrderId } = params
  const { workOrder } = useGetEWorkOrdersQuery(undefined, {
    selectFromResult: ({ data }) => ({
      workOrder: data?.find((workOrder) => workOrder._id === workOrderId)
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
      <View style={styles.modalTop}>
        <Pressable onPress={() => router.back()} style={{}}>
          <Text style={{ fontSize: 16, color: Colors.light.neonAction }}>
            Close
          </Text>
        </Pressable>
        <Text
          style={{
            fontFamily: "Poppins",
            alignSelf: "center",
            fontSize: 20
          }}
        >
          Work Order Info
        </Text>
        <Text
          style={{ fontSize: 16, color: Colors.light.neonAction, opacity: 0 }}
        >
          Close
        </Text>
      </View>
      {/* //* Work order info */}
      <View style={{ flexGrow: 1, flexDirection: "column", width: "100%" }}>
        <View style={styles.workOrderInfo}>
          <View
            style={{
              ...styles.mainInfoWrapper,
              paddingBottom: 10,
              borderBottomWidth: 2,
              borderBottomColor: "black"
            }}
          >
            <Text style={{ fontSize: 24 }}>{workOrder.classroom}</Text>
            <View
              style={{ flexDirection: "row", gap: 2, alignItems: "center" }}
            >
              <Text style={{}}>Submitted by:</Text>
              <Text style={{ color: Colors.light.primaryDarker }}>
                {workOrder.employeeName}
              </Text>
            </View>
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
              style={{ flexDirection: "row", gap: 2, alignItems: "center" }}
            >
              <Text style={{}}>Status:</Text>
              <Text
                style={{
                  fontFamily: "Poppins",
                  color:
                    workOrder.status === "Pending"
                      ? Colors.light.pendingText
                      : ["Received", "Documented", "In Progress"].includes(
                          workOrder.status
                        )
                      ? "#3ecf00"
                      : workOrder.status === "Awaiting Materials"
                      ? "#ccc500"
                      : workOrder.status === "Completed"
                      ? "#9700e8"
                      : "#ff0000"
                }}
              >
                {workOrder.status}
              </Text>
            </View>
          </View>
        </View>
        {/* //* Work order details */}
        <View style={styles.workOrderDetails}>
          <Text
            style={{
              fontFamily: "Poppins",
              alignSelf: "flex-start",
              fontSize: 20,
              color: Colors.light.primaryDarker
            }}
          >
            Where
          </Text>
          <View style={styles.detailsWrapper}>
            <Text>{workOrder.areaInClassroom}</Text>
          </View>
        </View>
        {/* //* Work order details */}
        <View style={styles.workOrderDetails}>
          <Text
            style={{
              fontFamily: "Poppins",
              alignSelf: "flex-start",
              fontSize: 20,
              color: Colors.light.primaryDarker
            }}
          >
            Task Needed
          </Text>
          <View style={styles.detailsWrapper}>
            <Text>{workOrder.taskNeeded}</Text>
          </View>
        </View>
        {/* //* Work order ADDITIONAL details */}
        <View style={styles.workOrderDetails}>
          <Text
            style={{
              fontFamily: "Poppins",
              alignSelf: "flex-start",
              fontSize: 20,
              color: Colors.light.primaryDarker
            }}
          >
            Additional Details
          </Text>
          <View style={styles.detailsWrapper}>
            <Text>{workOrder.additionalDetails}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20
    // gap: 10
  },
  modalTop: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 5,
    borderBottomColor: "#ebebeb",
    borderBottomWidth: 2
  },
  workOrderInfo: {
    paddingTop: 10,
    borderBottomColor: "black",
    width: "100%"
  },
  mainInfoWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: 5
  },
  workOrderDetails: {
    borderBottomWidth: 1,
    paddingTop: 6,
    paddingBottom: 10,
    borderBottomColor: Colors.light.textFaded,
    width: "100%"
  },
  additionalDetails: {
    width: "100%"
  },
  detailsWrapper: {
    borderBottomColor: "black",
    width: "100%"
  },
  dateWrapper: {
    display: "flex",
    flexDirection: "row",
    gap: 4,
    alignItems: "center"
  },
  updateButtons: {
    display: "flex",
    paddingVertical: 10
  },
  buttonWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 10
  }
})
