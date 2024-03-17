import { StyleSheet, Pressable, ActivityIndicator } from "react-native"
import { useRouter } from "expo-router"
import { useDispatch } from "react-redux"
import { BtnStyles } from "@/constants/Buttons"

import { View, Text } from "@/components/Themed"
import {
  SignInFormData,
  useLazyStandardSignInMutation
} from "@/redux/auth/authApi"
import { persistor } from "@/redux/store"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { setEmployee } from "@/redux/auth/employeeSlice"
import { getRole } from "@/helpers/getRole"

// TODO: Different logins should show different screens

const tempTeacher = {
  email: "shawnballay1@gmail.com",
  password: "testpassword"
}
const tempTeacher2 = {
  email: "Thisisatest@yahoo.com",
  password: "testpassword"
}
const tempAdmin = {
  email: "gkasljdglkaj@yahoo.com",
  password: "testpassword"
}
const tempParent = {
  email: "sdg398unkalsdg@yahoo.com",
  password: "testpassword"
}
const tempMaintenance = {
  email: "johnTest@gmail.com",
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
      const userRole = getRole(res.payload.roleId)
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
      <Pressable
        style={({ pressed }) => [
          {
            ...BtnStyles.actionBtn,
            backgroundColor: pressed
              ? BtnStyles.actionBtnActive.backgroundColor
              : BtnStyles.actionBtn.backgroundColor
          }
        ]}
        onPress={() => handleLogin(tempTeacher)}
      >
        <Text style={BtnStyles.btnText}>Teacher</Text>
      </Pressable>
      {/* <Pressable
        style={({ pressed }) => [
          {
            ...BtnStyles.actionBtn,
            backgroundColor: pressed
              ? BtnStyles.actionBtnActive.backgroundColor
              : BtnStyles.actionBtn.backgroundColor
          }
        ]}
        onPress={() => handleLogin(tempParent)}
      >
        <Text style={BtnStyles.btnText}>Parent</Text>
      </Pressable> */}
      <Pressable
        style={({ pressed }) => [
          {
            ...BtnStyles.actionBtn,
            backgroundColor: pressed
              ? BtnStyles.actionBtnActive.backgroundColor
              : BtnStyles.actionBtn.backgroundColor
          }
        ]}
        onPress={() => handleLogin(tempMaintenance)}
      >
        <Text style={BtnStyles.btnText}>Maintenance</Text>
      </Pressable>
      {/* <Pressable
        style={({ pressed }) => [
          {
            ...BtnStyles.actionBtn,
            backgroundColor: pressed
              ? BtnStyles.actionBtnActive.backgroundColor
              : BtnStyles.actionBtn.backgroundColor
          }
        ]}
        onPress={() => handleLogin(tempAdmin)}
      >
        <Text style={BtnStyles.btnText}>Admin</Text>
      </Pressable> */}
      <Pressable
        style={({ pressed }) => [
          {
            ...BtnStyles.errorBtn,
            backgroundColor: pressed
              ? BtnStyles.errBtnActive.backgroundColor
              : BtnStyles.errorBtn.backgroundColor
          }
        ]}
        onPress={handleReduxPurge}
      >
        <Text style={BtnStyles.btnText}>Clear State</Text>
      </Pressable>
      <View style={{ height: 20 }}>
        {isLoading ? <ActivityIndicator /> : null}
      </View>
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
