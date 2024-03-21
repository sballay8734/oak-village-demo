import { useUpdateStatusMutation } from "@/redux/workOrdersSlice/workOrdersApi"
import { ActivityIndicator, Pressable, StyleSheet } from "react-native"
import { Text, View } from "@/components/Themed"

interface StatusChangeBtnProps {
  status: string
  borderColor: string
  bgColor: string
  textColor: string
  opacity: number
  shadow: boolean
  workOrderId: string
}

export default function StatusChangeButton({
  status,
  borderColor,
  bgColor,
  textColor,
  opacity,
  shadow,
  workOrderId
}: StatusChangeBtnProps) {
  const [updatePost, { isLoading, isError }] = useUpdateStatusMutation()

  return (
    <Pressable
      onPress={() => updatePost({ workOrderId: workOrderId, status: status })}
      style={{
        borderColor: borderColor,
        borderWidth: 2,
        padding: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 100,
        backgroundColor: bgColor,
        opacity: opacity,
        shadowColor: borderColor,
        shadowOffset: {
          width: 0,
          height: 1
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3
      }}
    >
      <Text style={{ fontSize: 16, color: textColor, fontWeight: "500" }}>
        {status}
      </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  text: {
    fontSize: 16
  },
  wrapperCustom: {
    borderRadius: 8,
    padding: 6
  },
  logBox: {
    padding: 20,
    margin: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#f0f0f0",
    backgroundColor: "#f9f9f9"
  }
})
