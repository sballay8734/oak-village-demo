import { PURGE } from "redux-persist"
import { StyleSheet, Button } from "react-native"
import { useRouter } from "expo-router"
import { useDispatch } from "react-redux"

import { View } from "@/components/Themed"
import {
  SignInFormData,
  useLazyStandardSignInMutation
} from "@/redux/auth/authApi"
import { persistor } from "@/redux/store"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { setEmployee } from "@/redux/auth/employeeSlice"

// TODO: Different logins should show different screens

const tempTeacher = {
  email: "shawnballay1@gmail.com",
  password: "testpassword"
}
const tempTeacher2 = {
  email: "Thisisatest@yahoo.com",
  password: "testpassword"
}
const tempParent = {
  email: "gkasljdglkaj@yahoo.com",
  password: "testpassword"
}
const tempMaintenance = {
  email: "johnsmith@yahoo.com",
  password: "testpassword"
}

type role = "/teacher/" | "/admin/" | "/maintenance/" | "/parent/"

export default function Login() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [login, { isLoading }] = useLazyStandardSignInMutation()

  async function handleLogin(credentials: SignInFormData) {
    try {
      const res = await login(credentials).unwrap()
      const userRole = res.payload.role
      dispatch(setEmployee(res.payload))
      router.push(`/${userRole}/` as role)
    } catch (err) {
      console.log("CAUGHT ERROR", err)
    }
  }

  function handleReduxPurge() {
    persistor.purge()
    AsyncStorage.clear()
  }

  return (
    <View style={styles.loginPage}>
      {/* <Text>LOGIN</Text> */}
      {/* <Button onPress={() => handleLogin("admin")} title="Admin"></Button> */}
      <Button
        onPress={() => handleLogin(tempTeacher2)}
        title="Teacher"
      ></Button>
      {/* <Button onPress={() => handleLogin("parent")} title="Parent"></Button> */}
      <Button
        onPress={() => handleLogin(tempMaintenance)}
        title="Maintenance"
      ></Button>
      <Button
        color={"red"}
        onPress={handleReduxPurge}
        title="Clear Redux State"
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
