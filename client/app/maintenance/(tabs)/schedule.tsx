import { StyleSheet } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { Text, View } from "@/components/Themed"

export default function ScheduleScreen() {
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
      <Text style={styles.title}>MAINTENANCE Schedule</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      {/* <EditScreenInfo path="app/(tabs)/schedule.tsx" /> */}
    </View>
  )
}

const styles = StyleSheet.create({
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
