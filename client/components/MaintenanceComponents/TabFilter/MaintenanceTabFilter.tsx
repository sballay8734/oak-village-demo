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
        borderWidth: 1,
        gap: 5,
        borderRadius: 100,
        marginHorizontal: 3,
        marginVertical: 10,
        marginBottom: 5,
        backgroundColor:
          !active && filterName === "All"
            ? "#f0d1ee"
            : !active && filterName === "Pending"
            ? Colors.light.pendingBg
            : !active && filterName === "New"
            ? Colors.light.pendingBg
            : !active && filterName === "Active"
            ? Colors.light.activeBg
            : !active && filterName === "Received"
            ? Colors.light.activeBg
            : !active && filterName === "Documented"
            ? Colors.light.activeBg
            : !active && filterName === "Awaiting Materials"
            ? Colors.light.pausedBg
            : !active && filterName === "Completed"
            ? Colors.light.completedBg
            : !active && filterName === "Paused"
            ? Colors.light.pausedBg
            : !active && filterName === "In Progress"
            ? Colors.light.activeBg
            : !active && filterName === "Could Not Complete"
            ? Colors.light.cantCompleteBg
            : "black",
        borderColor:
          !active && filterName === "All"
            ? "#40003c"
            : !active && filterName === "Pending"
            ? Colors.light.pendingOL
            : !active && filterName === "New"
            ? Colors.light.pendingOL
            : !active && filterName === "Active"
            ? Colors.light.activeOL
            : !active && filterName === "Received"
            ? Colors.light.activeOL
            : !active && filterName === "Documented"
            ? Colors.light.activeOL
            : !active && filterName === "Awaiting Materials"
            ? Colors.light.pausedOL
            : !active && filterName === "Completed"
            ? Colors.light.completedOL
            : !active && filterName === "Paused"
            ? Colors.light.pausedOL
            : !active && filterName === "In Progress"
            ? Colors.light.activeOL
            : !active && filterName === "Could Not Complete"
            ? Colors.light.cantCompleteOL
            : "black",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4
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
              : "white",
          borderRadius: 100,
          height: 22,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 22,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2
          },
          shadowOpacity: 0.23,
          shadowRadius: 2.62,

          elevation: 4
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
            fontFamily: "Poppins",
            fontWeight: "bold",
            fontSize: 11
          }}
        >
          {workOrderLength}
        </Text>
      </View>
    </Pressable>
  )
}
