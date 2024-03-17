import Colors from "./Colors"
import { StyleSheet } from "react-native"

export const BtnStyles = StyleSheet.create({
  actionBtn: {
    backgroundColor: Colors.light.action,
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 5
  },
  actionText: {
    color: "white",
    fontSize: 24
  },
  errorBtn: {
    backgroundColor: Colors.light.errorRed,
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 5
  }
})
