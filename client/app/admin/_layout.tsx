import { RootState } from "@/redux/store"
import { Stack, useRouter } from "expo-router"
import { useEffect } from "react"
import { useSelector } from "react-redux"

export default function AdminLayout() {
  const router = useRouter()
  const employee = useSelector(
    (state: RootState) => state.employeeSlice.employee
  )

  console.log("Grabbing ADMIN Layout")

  useEffect(() => {
    if (employee === null || employee === undefined) {
      router.replace("/login")
    }
  }, [employee, router])

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="modal-info"
        options={{ presentation: "modal", headerShown: false }}
      />
      <Stack.Screen
        name="modal-work-order"
        options={{ presentation: "modal", headerShown: false }}
      />
    </Stack>
  )
}
