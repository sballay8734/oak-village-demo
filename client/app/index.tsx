import { useRouter } from "expo-router"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"

import Login from "./login"
import { RootState } from "@/redux/store"
import { setEmployee } from "@/redux/auth/employeeSlice"

export default function Entry() {
  const router = useRouter()
  const dispatch = useDispatch()
  const employee = useSelector(
    (state: RootState) => state.employeeSlice.employee
  )
  console.log("RENDERING ENTRY...")
  console.log(employee)

  // FIXME: If you are already logged in, this causes an error
  useEffect(() => {
    // TEMPORARY WORK AROUND FOR TESTING ONLY
    // dispatch(setEmployee(null))
    if (employee !== null) {
      console.log("RUNNING USE EFFECT")
      switch (employee.role) {
        case "teacher":
          console.log("Hit 1")
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
  }, [employee])

  if (employee !== null) {
    return null // Render nothing while navigating to the stack
  } else {
    return <Login />
  }
}
