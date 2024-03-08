import { View, Text } from "@/components/Themed"
import { StyleSheet, Button } from "react-native"
import { useLazyStandardSignInMutation } from "@/redux/auth/authApi"
import { useRouter } from "expo-router"
import { useDispatch } from "react-redux"
import { setEmployee } from "@/redux/auth/employeeSlice"

// TODO: Different logins should show different screens

export default function Login() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [trigger, { isError, isLoading, isSuccess }] =
    useLazyStandardSignInMutation()

  async function handleLogin(
    role: "admin" | "teacher" | "maintenance" | "parent"
  ) {
    // TODO: Temorarily just sending string (you will need to send email and password instead eventually)
    const res = await trigger(role)

    // TODO: Navigate depending on role of user
    router.navigate("(tabs)")
  }

  return (
    <View style={styles.loginPage}>
      {/* <Text>LOGIN</Text> */}
      <Button onPress={() => handleLogin("admin")} title="Admin"></Button>
      <Button onPress={() => handleLogin("teacher")} title="Teacher"></Button>
      <Button onPress={() => handleLogin("parent")} title="Parent"></Button>
      <Button
        onPress={() => handleLogin("maintenance")}
        title="Maintenance"
      ></Button>
    </View>
  )
}

const styles = StyleSheet.create({
  loginPage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    paddingBottom: 30,
    gap: 20
  }
})
