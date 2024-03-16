import { StyleSheet } from "react-native"
import { useSelector } from "react-redux"

import { useFetchEmployeeWorkOrdersQuery } from "@/redux/workOrdersSlice/workOrdersApi"

import { Text, View } from "@/components/Themed"
import { RootState } from "@/redux/store"
import { useEffect } from "react"

export default function WorkOrdersScreen() {
  const employee = useSelector(
    (state: RootState) => state.employeeSlice.employee
  )
  const { data: workOrders, isLoading } = useFetchEmployeeWorkOrdersQuery()

  if (employee === null) return null

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TEACHER Work Orders</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold"
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%"
  }
})
