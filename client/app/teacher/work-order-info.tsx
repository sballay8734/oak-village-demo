import { Pressable, StyleSheet } from "react-native"
import { Link, useLocalSearchParams } from "expo-router"
import { useRouter } from "expo-router"

import { useGetEWorkOrdersQuery } from "@/redux/workOrdersSlice/workOrdersApi"
import { Text, View } from "@/components/Themed"
import Colors from "@/constants/Colors"

export default function WorkOrderInfo() {
  const router = useRouter()
  const params = useLocalSearchParams()
  const { workOrderId } = params
  const { workOrder } = useGetEWorkOrdersQuery(undefined, {
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
      {/* // * Cancel "Edit Work Order" Save */}
      <View style={styles.modalTop}>
        <Pressable onPress={() => router.back()} style={{}}>
          <Text style={{ fontSize: 16 }}>Cancel</Text>
        </Pressable>
        <Text style={{ fontFamily: "Poppins", fontSize: 18 }}>
          Edit Work Order
        </Text>
        <Pressable onPress={() => router.back()} style={{}}>
          {/* // TODO: Save Button needs to do something */}
          <Text style={{ fontSize: 16, color: Colors.light.neonAction }}>
            Save
          </Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
    gap: 10
  },
  modalTop: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center"
  }
})
