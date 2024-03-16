import { StyleSheet } from "react-native"
import { useSelector } from "react-redux"

import { Text, View } from "@/components/Themed"
import { RootState } from "@/redux/store"
import { useFetchMaintenanceWorkOrdersQuery } from "@/redux/workOrdersSlice/workOrdersApi"

export default function WorkOrdersScreen() {
  const employee = useSelector(
    (state: RootState) => state.employeeSlice.employee
  )
  const { data: workOrders, isLoading } = useFetchMaintenanceWorkOrdersQuery()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MAINTENANCE Work Orders</Text>
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
