import Colors from "./Colors"
import { StyleSheet } from "react-native"

export const BtnStyles = StyleSheet.create({
  actionBtn: {
    // TODO: Handle loading states more gracefully (I don't want to set h & w)
    width: 180,
    display: "flex",
    alignItems: "center",
    backgroundColor: Colors.light.action,
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 5
  },
  btnText: {
    color: "white",
    fontSize: 20,
    fontFamily: "Mooli"
  },
  errorBtn: {
    width: 180,
    display: "flex",
    alignItems: "center",
    backgroundColor: Colors.light.errorRed,
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 5
  },
  actionBtnActive: {
    backgroundColor: Colors.light.actionLighter
  },
  errBtnActive: {
    backgroundColor: Colors.light.errorLighter
  }
})
