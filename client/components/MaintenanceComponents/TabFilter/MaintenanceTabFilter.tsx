import { StyleSheet, Pressable } from "react-native"
import { handleFilterLogic } from "./maintenanceTabs"
import { Text, View } from "@/components/Themed"
import Colors from "@/constants/Colors"

interface TabFilterProps {
  filterName: string
  active: boolean
  handleFilterChange: (filterName: string) => void
}

// ! THIS IS A BAD WAY TO DO THIS. REORGANIZE
// TODO: Transition color change

export default function TabFilter({
  filterName,
  active,
  handleFilterChange
}: TabFilterProps) {
  const workOrderLength = handleFilterLogic(filterName)

  return (
    <Pressable
      onPress={() => handleFilterChange(filterName)}
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderColor: "black",
        borderWidth: 1,
        gap: 5,
        borderRadius: 100,
        marginHorizontal: 3,
        backgroundColor: active ? Colors.light.offBlack : "white"
      }}
    >
      <Text
        style={{
          color: active ? "white" : "black",
          fontSize: 14
        }}
      >
        {filterName}
      </Text>
      <View
        style={{
          backgroundColor:
            active && filterName === "All"
              ? "#f0d1ee"
              : active && filterName === "Pending"
              ? Colors.light.pendingBg
              : active && filterName === "New"
              ? Colors.light.pendingBg
              : active && filterName === "Active"
              ? Colors.light.activeBg
              : active && filterName === "Received"
              ? Colors.light.activeBg
              : active && filterName === "Documented"
              ? Colors.light.activeBg
              : active && filterName === "Awaiting Materials"
              ? Colors.light.pausedBg
              : active && filterName === "Completed"
              ? Colors.light.completedBg
              : active && filterName === "Paused"
              ? Colors.light.pausedBg
              : active && filterName === "In Progress"
              ? Colors.light.activeBg
              : active && filterName === "Could Not Complete"
              ? Colors.light.cantCompleteBg
              : "#cccccc",
          borderRadius: 100,
          height: 22,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 22
        }}
      >
        <Text
          style={{
            color:
              active && filterName === "All"
                ? "#310033"
                : active && filterName === "Pending"
                ? Colors.light.pendingText
                : active && filterName === "New"
                ? Colors.light.pendingText
                : active && filterName === "Active"
                ? Colors.light.activeText
                : active && filterName === "Received"
                ? Colors.light.activeText
                : active && filterName === "Documented"
                ? Colors.light.activeText
                : active && filterName === "Awaiting Materials"
                ? Colors.light.pausedText
                : active && filterName === "Completed"
                ? Colors.light.completedText
                : active && filterName === "Paused"
                ? Colors.light.pausedText
                : active && filterName === "In Progress"
                ? Colors.light.activeText
                : active && filterName === "Could Not Complete"
                ? Colors.light.cantCompleteText
                : "#2e2e2e",
            fontWeight: "bold",
            fontSize: 12
          }}
        >
          {workOrderLength}
        </Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  filterWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderColor: "black",
    borderWidth: 1,
    gap: 3,
    borderRadius: 100,
    marginHorizontal: 3
  },
  textWrapper: {
    backgroundColor: "blue",
    borderRadius: 100,
    height: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 20
  }
})
