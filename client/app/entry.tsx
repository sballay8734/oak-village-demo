import { Slot } from "expo-router"
import { StyleSheet, View } from "react-native"
import ResponseModal from "@/components/ResponseModal"
// This component exists simply to be able to access the error state and render a modal in the root of the project, rather than copying the error modal to all Stacks
export default function Entry() {
  return (
    <View style={styles.rootPage}>
      <Slot />
      {/*//* Conditional rendering of ResponseModal is handled inside itself */}
      <ResponseModal />
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
