import { StyleSheet, Button } from "react-native"
import { useDispatch, useSelector } from "react-redux"

import { Text, View } from "@/components/Themed"
import { RootState } from "@/redux/store"
import { setEmployee } from "@/redux/auth/employeeSlice"
import { hideResponseModal } from "@/redux/serverResponseSlice/serverResponseSlice"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export default function HomeScreen() {
  const insets = useSafeAreaInsets()
  const dispatch = useDispatch()
  const employee = useSelector(
    (state: RootState) => state.employeeSlice.employee
  )

  function handleClearState() {
    dispatch(setEmployee(null))
    dispatch(hideResponseModal())
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",

        // Paddings to handle safe area
        paddingTop: insets.top,
        // paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right
      }}
    >
      <Text style={styles.title}>{"MAINTENANCE Home" ?? "Error"}</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Button
        color={"red"}
        onPress={handleClearState}
        title={`Clear Local Storage`}
      ></Button>
    </View>
  )
}

const styles = StyleSheet.create({
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
