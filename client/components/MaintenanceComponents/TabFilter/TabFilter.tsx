import { useState } from "react"
import { View, Text, StyleSheet, Pressable } from "react-native"

interface TabFilterProps {
  filterName: string
  count: number
  active: boolean
  handleFilterChange: (filterName: string) => void
}

// ! THIS IS A BAD WAY TO DO THIS. REORGANIZE
// TODO: Transition color change

export default function TabFilter({
  filterName,
  count,
  active,
  handleFilterChange
}: TabFilterProps) {
  return (
    <Pressable
      onPress={() => handleFilterChange(filterName)}
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderColor: "black",
        borderWidth: 1,
        gap: 3,
        borderRadius: 100,
        marginHorizontal: 3,
        backgroundColor: active ? "black" : "white"
      }}
    >
      <Text
        style={{
          color: active ? "white" : "black"
        }}
      >
        {filterName}
      </Text>
      <View
        style={{
          backgroundColor: active ? "blue" : "red",
          borderRadius: 100,
          height: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 20
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>{count}</Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  navWrapper: {
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
