import { StyleSheet, Button } from "react-native"
import { useDispatch, useSelector } from "react-redux"

import EditScreenInfo from "@/components/EditScreenInfo"
import { Text, View } from "@/components/Themed"
import { RootState } from "@/redux/store"
import { setEmployee } from "@/redux/auth/employeeSlice"

export default function HomeScreen() {
  const dispatch = useDispatch()
  const employee = useSelector(
    (state: RootState) => state.employeeSlice.employee
  )

  function handleClearState() {
    dispatch(setEmployee(null))
  }

  console.log(employee)

  return (
    <View style={styles.container}>
      {/* if (signedIn) return <SignedInStack /> */}
      {/* else return <SignedOutStack /> */}
      <Text style={styles.title}>
        {employee?.role.toLocaleUpperCase() ?? "Error"}
      </Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Button
        onPress={handleClearState}
        title={`Clear LS for ${employee?.employeeClassroom}`}
      ></Button>
      <EditScreenInfo path="app/(tabs)/index.tsx" />
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
