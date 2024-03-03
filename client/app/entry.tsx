import { RootState } from "@/redux/store"
import { Stack } from "expo-router"
import { useSelector } from "react-redux"

export default function Entry() {
  const employee = useSelector(
    (state: RootState) => state.employeeSlice.employee
  )

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
}
