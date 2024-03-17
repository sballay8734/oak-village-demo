import { useRouter } from "expo-router"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"

import Login from "./login"
import { RootState } from "@/redux/store"
import { setEmployee } from "@/redux/auth/employeeSlice"

export default function Entry() {
  const router = useRouter()
  const dispatch = useDispatch()
  const employee = useSelector(
    (state: RootState) => state.employeeSlice.employee
  )
  const [isReady, setIsReady] = useState<boolean>(false)

  useEffect(() => {
    setIsReady(true)
  }, [])

  useEffect(() => {
    if (isReady && employee !== null) {
      switch (employee.roleId) {
        case process.env.EXPO_PUBLIC_ROLE_PAST_ID:
          router.push("/teacher/")
          break
        case process.env.EXPO_PUBLIC_ROLE_KING_ID:
          router.push("/admin/")
          break
        case process.env.EXPO_PUBLIC_ROLE_JOHN_ID:
          router.push("/maintenance/")
          break
        case process.env.EXPO_PUBLIC_ROLE_DAD_ID:
          router.push("/parent/")
          break
        default:
          // router.push("/login")
          console.log("NO MATCHING ROUTE")
      }
    }
  }, [isReady, employee])

  if (!isReady || employee === null) {
    return <Login />
  } else {
    return null // Render nothing while navigating to the stack
  }
}
