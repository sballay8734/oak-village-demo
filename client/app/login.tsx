import { PURGE } from "redux-persist"
import { StyleSheet, Button } from "react-native"
import { useRouter } from "expo-router"
import { useDispatch } from "react-redux"

import { View, Text } from "@/components/Themed"
import {
  SignInFormData,
  useLazyStandardSignInMutation
} from "@/redux/auth/authApi"
import { setEmployee } from "@/redux/auth/employeeSlice"
import { persistor } from "@/redux/store"
import { setResponseMessage } from "@/redux/serverResponseSlice/serverResponseSlice"
import { IEmployee_From } from "@/redux/auth/types"
import { AuthenticatedUser, ModApiResponse } from "@/types/responsesFromServer"
import { isModErrorResponse } from "@/helpers/errorTypeCheck"

// TODO: Different logins should show different screens

const tempTeacher = {
  email: "shawnballay1@gmail.com",
  password: "testpassword"
}
const tempMaintenance = {
  email: "johnsmith@yahoo.com",
  password: "testpassword"
}

export default function Login() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [trigger, { isLoading }] = useLazyStandardSignInMutation()

  async function handleLogin(credentials: SignInFormData) {
    console.log("TO", credentials)
    // ! This is also correct I think. Not sure why TS is throwing an error
    const res: ModApiResponse<AuthenticatedUser> = await trigger(credentials)

    // * If failed signin
    if (isModErrorResponse(res)) {
      console.log("ERROR")
      dispatch(
        setResponseMessage({
          successResult: res.error.data.success,
          message: res.error.data.message
        })
      )
      return
    }

    // * If successful signin
    dispatch(setEmployee(res.data.payload))
    dispatch(
      setResponseMessage({
        successResult: res.data.success,
        message: res.data.message
      })
    )

    // ! This TS Error is actually not breaking anything and not sure why it's happening
    router.push(`/${res.data.payload.role}/`)
  }

  function handleReduxPurge() {
    persistor.purge()
  }

  return (
    <View style={styles.loginPage}>
      {/* <Text>LOGIN</Text> */}
      {/* <Button onPress={() => handleLogin("admin")} title="Admin"></Button> */}
      <Button onPress={() => handleLogin(tempTeacher)} title="Teacher"></Button>
      {/* <Button onPress={() => handleLogin("parent")} title="Parent"></Button> */}
      <Button
        onPress={() => handleLogin(tempMaintenance)}
        title="Maintenance"
      ></Button>
      <Button onPress={handleReduxPurge} title="Clear Redux State"></Button>
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
