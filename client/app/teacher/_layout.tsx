import { Slot, Stack } from "expo-router"

export default function AdminLayout() {
  console.log("Grabbing TEACHER Layout")
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
