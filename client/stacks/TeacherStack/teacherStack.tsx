import { Stack } from "expo-router"

export default function TeacherStack() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="modal" options={{ presentation: "modal" }} />
      {/* TODO: You might be able to customize header here */}
      <Stack.Screen
        name="modal-work-order"
        // use headerTitle option to customize title
        options={{ presentation: "modal", headerShown: false }}
      />
    </Stack>
  )
}
