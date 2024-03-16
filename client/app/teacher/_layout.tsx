import ErrorModal from "@/components/ResponseModal"
import { RootState } from "@/redux/store"
import { Stack, useRouter } from "expo-router"
import { useEffect } from "react"
import { useSelector } from "react-redux"

export default function TeacherLayout() {
  const router = useRouter()
  const employee = useSelector(
    (state: RootState) => state.employeeSlice.employee
  )

  useEffect(() => {
    if (employee === null || employee === undefined) {
      router.replace("/login")
    }
  }, [employee, router])

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="work-order-info"
        options={{ presentation: "modal", headerShown: false }}
      />
      {/* TODO: Add back button to modal */}
      <Stack.Screen
        name="work-order-form"
        options={{ presentation: "card", headerShown: false }}
      />
    </Stack>
  )
}
