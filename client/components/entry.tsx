import { RootState } from "@/redux/store"
import { Stack } from "expo-router"
import { useSelector } from "react-redux"
import Login from "./login"

export default function Entry() {
  const employee = useSelector(
    (state: RootState) => state.employeeSlice.employee
  )

  // TODO: Swap this to !== (this is just for testing )
  if (employee !== null) {
    return (
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
        {/* TODO: You might be able to customize header here */}
        <Stack.Screen
          name="work-order"
          options={{ presentation: "modal", headerShown: false }}
        />
      </Stack>
    )
  } else {
    return <Login />
  }
}
