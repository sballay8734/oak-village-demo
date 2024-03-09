import { Stack } from "expo-router"

export default function ParentStack() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="modal" options={{ presentation: "modal" }} />
      {/* TODO: You might be able to customize header here */}
      <Stack.Screen
        name="order"
        options={{ presentation: "modal", headerShown: false }}
      />
    </Stack>
  )
}
