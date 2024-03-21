import { StatusBar } from "expo-status-bar"
import { View, StyleSheet, Pressable } from "react-native"
import { useLocalSearchParams, useRouter } from "expo-router"

import { useGetMWorkOrdersQuery } from "@/redux/workOrdersSlice/workOrdersApi"
import { Text } from "@/components/Themed"
import { AntDesign } from "@expo/vector-icons"
import { getDateDifference } from "@/helpers/dateFormatting"
import { statuses } from "@/components/MaintenanceComponents/StatusChange/statuses"
import StatusChangeButton from "@/components/MaintenanceComponents/StatusChange/StatusChangeButton"
import Colors from "@/constants/Colors"

export default function WorkOrderInfo() {
  const router = useRouter()
  const params = useLocalSearchParams()
  const { workOrderId } = params
  const { workOrder } = useGetMWorkOrdersQuery(undefined, {
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

  function handleButtonPress() {
    console.log("PRESSED")
  }

  return (
    <View style={styles.container}>
      <View style={styles.modalTop}>
        <Pressable onPress={() => router.back()} style={{}}>
          <Text style={{ fontSize: 16, color: Colors.light.neonAction }}>
            Close
          </Text>
        </Pressable>
      </View>
      {/* //* Work order info */}
      <View style={{ flexGrow: 1, flexDirection: "column", width: "100%" }}>
        <View style={styles.workOrderInfo}>
          <Text
            style={{
              fontFamily: "Poppins",
              alignSelf: "center",
              fontSize: 26,
              paddingTop: 0,
              paddingBottom: 10
            }}
          >
            Work Order Info
          </Text>
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
      {/* //* Change status */}
      <View style={styles.updateButtons}>
        <Text
          style={{
            fontFamily: "Poppins",
            alignSelf: "center",
            fontSize: 22,
            paddingBottom: 10,
            // textDecorationLine: "underline",
            color: Colors.light.neonAction
          }}
        >
          Update Status
        </Text>
        <View style={styles.buttonWrapper}>
          {statuses &&
            statuses.map((status) => {
              return (
                <StatusChangeButton
                  key={status.status}
                  status={status.status}
                  borderColor={
                    status.status === workOrder.status
                      ? status.borderColor
                      : status.activeBC
                  }
                  bgColor={
                    status.status === workOrder.status
                      ? status.bgColor
                      : status.activeBgColor
                  }
                  textColor={
                    status.status === workOrder.status
                      ? status.textColor
                      : status.activeTextColor
                  }
                  opacity={status.status === workOrder.status ? 1 : 0.8}
                  shadow={status.status === workOrder.status ? true : false}
                  workOrderId={workOrder._id}
                />
              )
            })}
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
    alignItems: "center"
  },
  workOrderInfo: {
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
