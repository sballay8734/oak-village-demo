import React from "react"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import { Link, Tabs } from "expo-router"
import { Pressable, View, StyleSheet } from "react-native"

import Colors from "@/constants/Colors"
import { useColorScheme } from "@/components/useColorScheme"
import { useClientOnlyValue } from "@/components/useClientOnlyValue"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { MaterialIcons } from "@expo/vector-icons"
import { FontAwesome5 } from "@expo/vector-icons"
import { FontAwesome6 } from "@expo/vector-icons"
import { Text } from "@/components/Themed"

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"]
  color: string
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />
}

export default function TabLayout() {
  const colorScheme = useColorScheme()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tabIconDefault,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true)
      }}
    >
      <Tabs.Screen
        name="schedule"
        options={{
          title: "Schedule",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="schedule" size={24} color={color} />
          ),
          // TODO: Can you change the content of the modal here?
          headerRight: () => (
            <Link href="/admin/modal-info" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? "light"].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          )
        }}
      />
      <Tabs.Screen
        name="tasks"
        options={{
          title: "Tasks",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="tasks" size={24} color={color} />
          ),
          // TODO: Can you change the content of the modal here?
          headerRight: () => (
            <Link href="/admin/modal-info" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? "light"].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          )
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          // was "Home"
          title: "",
          tabBarIcon: ({ color }) => (
            <View style={styles.homeTab}>
              <TabBarIcon name="home" color={color} />
            </View>
          ),
          // TODO: Can you change the content of the modal here?
          headerRight: () => (
            <Link href="/admin/modal-info" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? "light"].text}
                    style={{
                      marginRight: 15,
                      opacity: pressed ? 0.5 : 1
                    }}
                  />
                )}
              </Pressable>
            </Link>
          )
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: "Work Orders",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-wrench"
              size={24}
              color={color}
            />
          ),
          headerRight: () => (
            <Link href="/admin/work-order-form" asChild>
              <Pressable>
                {({ pressed }) => (
                  <>
                    <FontAwesome6
                      name="add"
                      size={25}
                      color={Colors[colorScheme ?? "light"].tabIconSelected}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  </>
                )}
              </Pressable>
            </Link>
          )
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: "Messages",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="message" size={24} color={color} />
          ),
          // TODO: Can you change the content of the modal here?
          headerRight: () => (
            <Link href="/admin/modal-info" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? "light"].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          )
        }}
      />
    </Tabs>
  )
}

const styles = StyleSheet.create({
  homeTab: {
    height: 80,
    width: 80,
    borderRadius: 100,
    backgroundColor: "#FE6D64",
    // paddingTop: 20,
    paddingLeft: 2,
    paddingBottom: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
})
