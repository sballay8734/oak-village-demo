import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider
} from "@react-navigation/native"
import { useFonts } from "expo-font"
import * as SplashScreen from "expo-splash-screen"
import { useEffect } from "react"
import { Provider } from "react-redux"
import { store, persistor } from "@/redux/store"
import { PersistGate } from "redux-persist/integration/react"

import { useColorScheme } from "@/components/useColorScheme"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import Entry from "./entry"
import { SafeAreaView, StyleSheet } from "react-native"
import {
  SafeAreaProvider,
  useSafeAreaInsets
} from "react-native-safe-area-context"

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from "expo-router"

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "index"
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded, error] = useFonts({
    RobotoMono: require("../assets/fonts/RobotoMono-VariableFont_wght.ttf"),
    Mooli: require("../assets/fonts/Mooli-Regular.ttf"),
    Poppins: require("../assets/fonts/Poppins-Bold.ttf"),
    PoppinsMed: require("../assets/fonts/Poppins-Medium.ttf"),
    ...FontAwesome.font
  })

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error
  }, [error])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return <RootLayoutNav />
}

function RootLayoutNav() {
  const colorScheme = useColorScheme()
  const insets = useSafeAreaInsets()

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider
          // TODO: Replace this eventually (just using light for testing)
          value={DefaultTheme}
          // value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <SafeAreaProvider>
            <Entry />
          </SafeAreaProvider>
          {/* <Slot /> */}
        </ThemeProvider>
      </PersistGate>
    </Provider>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center"
  }
})
