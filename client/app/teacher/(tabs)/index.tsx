import { StyleSheet, Button } from "react-native"
import { useDispatch, useSelector } from "react-redux"

import { Text, View } from "@/components/Themed"
import { RootState } from "@/redux/store"
import { setEmployee } from "@/redux/auth/employeeSlice"
import {
  hideResponseModal,
  setResponseMessage
} from "@/redux/serverResponseSlice/serverResponseSlice"

export default function HomeScreen() {
  const dispatch = useDispatch()
  const employee = useSelector(
    (state: RootState) => state.employeeSlice.employee
  )

  function handleClearState() {
    dispatch(setEmployee(null))
    dispatch(hideResponseModal())
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {employee?.role.toLocaleUpperCase() + " Home" ?? "Error"}
      </Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Button onPress={handleClearState} title={`Clear Local Storage`}></Button>
      <Button
        onPress={() =>
          dispatch(
            setResponseMessage({
              successResult: true,
              message: "Account has been created successfully!"
            })
          )
        }
        title={`Show SUCCESS Modal`}
      ></Button>
      <Button
        onPress={() =>
          dispatch(
            setResponseMessage({
              successResult: false,
              message: "That user already exists!That user already exists! DUH!"
            })
          )
        }
        title={`Show FAIL Modal`}
      ></Button>
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
