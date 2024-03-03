import { StyleSheet } from "react-native"
import { useSelector } from "react-redux"

import EditScreenInfo from "@/components/EditScreenInfo"
import { Text, View } from "@/components/Themed"
import { RootState } from "@/redux/store"

export default function HomeScreen() {
  const employee = useSelector(
    (state: RootState) => state.employeeSlice.employee
  )

  console.log(employee)

  return (
    <View style={styles.container}>
      {/* if (signedIn) return <SignedInStack /> */}
      {/* else return <SignedOutStack /> */}
      <Text style={styles.title}>Home</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
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
