import { StyleSheet, Pressable } from "react-native"

import { handleFilterLogic } from "./teacherTabs"
import { View, Text } from "@/components/Themed"
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
            : !active && filterName === "Active"
            ? Colors.light.activeBg
            : !active && filterName === "Completed"
            ? Colors.light.completedBg
            : !active && filterName === "Paused"
            ? Colors.light.pausedBg
            : !active && filterName === "Could Not Complete"
            ? Colors.light.cantCompleteBg
            : Colors.light.offBlack,
        borderColor:
          !active && filterName === "All"
            ? "#40003c"
            : !active && filterName === "Pending"
            ? Colors.light.pendingOL
            : !active && filterName === "Active"
            ? Colors.light.activeOL
            : !active && filterName === "Completed"
            ? Colors.light.completedOL
            : !active && filterName === "Paused"
            ? Colors.light.pausedOL
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
              : active && filterName === "Active"
              ? Colors.light.activeBg
              : active && filterName === "Completed"
              ? Colors.light.completedBg
              : active && filterName === "Paused"
              ? Colors.light.pausedBg
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
                : active && filterName === "Active"
                ? Colors.light.activeText
                : active && filterName === "Completed"
                ? Colors.light.completedText
                : active && filterName === "Paused"
                ? Colors.light.pausedText
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
