import { Stack, useRouter } from "expo-router"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { RootState } from "@/redux/store"
import { setEmployee } from "@/redux/auth/employeeSlice"
import { setResponseMessage } from "@/redux/serverResponseSlice/serverResponseSlice"

export default function ParentLayout() {
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

    if (employee?.roleId !== process.env.EXPO_PUBLIC_ROLE_DAD_ID) {
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
        name="work-order-form"
        options={{ presentation: "modal", headerShown: false }}
      />
    </Stack>
  )
}
