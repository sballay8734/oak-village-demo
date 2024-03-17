import ErrorModal from "@/components/ResponseModal"
import { setEmployee } from "@/redux/auth/employeeSlice"
import { setResponseMessage } from "@/redux/serverResponseSlice/serverResponseSlice"
import { RootState } from "@/redux/store"
import { Stack, useRouter } from "expo-router"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"

export default function TeacherLayout() {
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

    if (employee?.roleId !== process.env.EXPO_PUBLIC_ROLE_PAST_ID) {
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
