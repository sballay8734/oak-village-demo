import { StyleSheet } from "react-native"

import { View, Text } from "@/components/Themed"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export default function TasksScreen() {
  const insets = useSafeAreaInsets()
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",

        // Paddings to handle safe area
        paddingTop: insets.top,
        // paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right
      }}
    >
      <Text style={styles.title}>MAINTENANCE Tasks</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold"
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%"
  }
})
