import { useUpdateStatusMutation } from "@/redux/workOrdersSlice/workOrdersApi"
import { Pressable, StyleSheet } from "react-native"
import { Text } from "@/components/Themed"

interface StatusChangeBtnProps {
  status: string
  borderColor: string
  activeBgColor: string
  textColor: string
  workOrderId: string
}

export default function StatusChangeButton({
  status,
  borderColor,
  activeBgColor,
  textColor,
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
        backgroundColor: activeBgColor
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
