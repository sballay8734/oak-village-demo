import { View } from "@/components/Themed"
import { KeyboardAvoidingView, Platform, TextInput } from "react-native"

export default function NWorkOrderForm() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View>
        <TextInput></TextInput>
      </View>
    </KeyboardAvoidingView>
  )
}
