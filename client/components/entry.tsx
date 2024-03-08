import { RootState } from "@/redux/store"
import { Stack } from "expo-router"
import { useSelector } from "react-redux"
import Login from "./login"

export default function Entry() {
  const employee = useSelector(
    (state: RootState) => state.employeeSlice.employee
  )

  // TODO: THIS NEEDS TO BE WHERE YOU RENDER THE DIFFERENT STACKS
  // FIXME: Access to these screens should not be available on front-end. These screens should be served from the backend as server components based on the role. EMPLOYEE ROLE SHOULD NOT BE SENT TO FRONT-END!!!!!!
  if (employee !== null) {
    if (employee.role === "teacher") {
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
    } else if (employee.role === "admin") {
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
    } else if (employee.role === "maintenance") {
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
  } else {
    return <Login />
  }
}
