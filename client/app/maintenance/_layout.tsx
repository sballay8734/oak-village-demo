import { setEmployee } from "@/redux/auth/employeeSlice"
import { setResponseMessage } from "@/redux/serverResponseSlice/serverResponseSlice"
import { RootState } from "@/redux/store"
import { Stack, useRouter } from "expo-router"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

export default function MaintenanceLayout() {
  const dispatch = useDispatch()
  const router = useRouter()
  const employee = useSelector(
    (state: RootState) => state.employeeSlice.employee
  )

  // * Additional layer of protection for route
  useEffect(() => {
    if (!employee) {
      router.replace("/login")
    }

    if (employee?.roleId !== process.env.EXPO_PUBLIC_ROLE_JOHN_ID) {
      console.log("BLOCKED")
      dispatch(setEmployee(null))
      dispatch(
        setResponseMessage({
          successResult: false,
          message: "You are not authorized to view this content."
        })
      )
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
        name="work-order-info"
        options={{ presentation: "modal", headerShown: false }}
      />
    </Stack>
  )
}
