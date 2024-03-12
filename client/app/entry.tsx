import { Slot } from "expo-router"
import { StyleSheet, View } from "react-native"
import { useSelector } from "react-redux"
import { useState, useEffect } from "react"

import { RootState } from "@/redux/store"
import ErrorModal from "@/components/ErrorModal"
// This component exists simply to be able to access the error state and render a modal in the root of the project, rather than copying the error modal to all Stacks
export default function Entry() {
  const errMessage = useSelector(
    (state: RootState) => state.errorSlice.errMessage
  )

  const [showErrorModal, setShowErrorModal] = useState<boolean>(false)

  console.log(errMessage)

  useEffect(() => {
    if (errMessage !== undefined) {
      console.log("ERR MSG: ", errMessage)
      setShowErrorModal(errMessage !== null)
    }
  }, [errMessage])

  console.log("ERR MSG: ", errMessage)

  return (
    <View style={styles.rootPage}>
      <Slot />
      {showErrorModal && <ErrorModal />}
    </View>
  )
}

const styles = StyleSheet.create({
  rootPage: {
    height: "100%",
    width: "100%",
    position: "relative"
  }
})
