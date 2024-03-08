import { RootState } from "@/redux/store"
import { Stack } from "expo-router"
import { useSelector } from "react-redux"
import Login from "./login"
import TeacherStack from "@/stacks/teacherStack"
import AdminStack from "@/stacks/adminStack"
import MaintenanceStack from "@/stacks/maintenanceStack"
import ParentStack from "@/stacks/parentStack"

export default function Entry() {
  const employee = useSelector(
    (state: RootState) => state.employeeSlice.employee
  )

  // TODO: THIS NEEDS TO BE WHERE YOU RENDER THE DIFFERENT STACKS
  // FIXME: Access to these screens should not be available on front-end. These screens should be served from the backend as server components based on the role. EMPLOYEE ROLE SHOULD NOT BE SENT TO FRONT-END!!!!!!
  if (employee !== null) {
    switch (employee.role) {
      case "teacher":
        return <TeacherStack />
      case "admin":
        return <AdminStack />
      case "maintenance":
        return <MaintenanceStack />
      case "parent":
        return <ParentStack />
      default:
        return null // Or render a default screen or an error message
    }
  } else {
    return <Login />
  }
}
