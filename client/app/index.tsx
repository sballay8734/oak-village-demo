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
      switch (employee.role) {
        case "teacher":
          router.push("/teacher/")
          break
        case "admin":
          console.log("Hit 2")
          router.push("/admin/")
          break
        case "maintenance":
          console.log("Hit 3")
          router.push("/maintenance/")
          break
        case "parent":
          console.log("Hit 4")
          router.push("/parent/")
          break
        default:
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
