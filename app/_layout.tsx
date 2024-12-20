import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native"
import { SplashScreen, Stack } from "expo-router"
import { isNil } from "lodash"
import React, { useEffect } from "react"
import { StatusBar } from "react-native"
import Toast from "react-native-toast-message"
import { useSelector } from "react-redux"
import { Provider } from "react-redux"
import { TamaguiProvider } from "tamagui"

import AppModal from "~/components/molecules/common/AppModal"
import getColors from "~/constants/Colors"
import { hideModal, showModal } from "~/features/appModalSlice"
import { useAppDispatch } from "~/hooks/useAppDispatch"
import { useAppFonts } from "~/hooks/useAppFonts"
import { useColorScheme } from "~/hooks/useColorScheme"
import useNotifications from "~/hooks/useNotifications"
import useTranslation, { useInitializeI18n } from "~/hooks/useTranslation"
import store, { RootState } from "~/redux/store"
import config from "~/tamagui.config"

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router"

export const unstableSettings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "/",
}

export default function RootLayout(): React.ReactElement {
  const { isI18nInitialized } = useInitializeI18n()
  const { fontError, fontsLoaded } = useAppFonts()

  useEffect(() => {
    if ((fontsLoaded || fontError !== null) && isI18nInitialized) {
      try {
        void SplashScreen.hideAsync()
      } catch (error) {
        console.error("Failed to hide splash screen:", error)
      }
    }
  }, [fontsLoaded, fontError, isI18nInitialized])

  if (!fontsLoaded || fontError !== null || !isI18nInitialized) {
    return <></>
  }

  return (
    <Provider store={store}>
      <RootLayoutNav />
    </Provider>
  )
}

function RootLayoutNav(): React.ReactElement {
  const colorScheme = useColorScheme().colorScheme
  const { t } = useTranslation()
  const { notification, expoPushToken } = useNotifications()
  const colors = getColors(colorScheme)

  const { visible, title, subtitle, type } = useSelector(
    (state: RootState) => state.modal
  )
  const dispatch = useAppDispatch()

  // React.useEffect(() => {
  //   console.log(JSON.stringify(notification, null, 2))
  //   console.log(JSON.stringify(expoPushToken, null, 2))
  // }, [notification, expoPushToken])

  useEffect(() => {
    if (!isNil(notification)) {
      dispatch(
        showModal({
          title: notification.request.content.body ?? "",
          subtitle: notification.request.content.title ?? "",
          type: type,
        })
      )
    }
  }, [notification])

  const handleCloseModal = (): void => {
    dispatch(hideModal())
  }

  return (
    <>
      <TamaguiProvider config={config} defaultTheme={colorScheme as any}>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name='index' options={{ headerShown: false }} />
            <Stack.Screen
              name='(tabs)'
              options={{ headerShown: false, title: t("appTitle") }}
            />
            <Stack.Screen
              name='authentication/Login'
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='authentication/SignUp'
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='checkout/BookingCheckout'
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='authentication/VerifyOTP'
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='authentication/ForgotPassword'
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='authentication/ResetPassword'
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='combo/ComboDetails'
              options={{
                headerShown: false,
                headerTitle: "Trở về",
              }}
            />
            <Stack.Screen
              name='map/Map'
              options={{
                headerShown: true,
                headerTitle: "Tiệm cắt tóc GlowUp MD21",
              }}
            />
            <Stack.Screen
              name='combo/StepDetails'
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='checkout/SpecialistCheckout'
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='payment/SelectPayment'
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='checkout/BookingConfirmation'
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='payment/WebView'
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='combo/viewAll/ShowAllCombo'
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='combo/viewAll/ShowAllStylist'
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='about/AboutUs'
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='authentication/ChangePassword'
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='notification/Notification'
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='profileUser/ProfileUser'
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='cardInfo/CardInfo'
              options={{ headerShown: false }}
            />
          </Stack>
        </ThemeProvider>
      </TamaguiProvider>

      <AppModal
        visible={visible}
        ontClose={handleCloseModal}
        type={type}
        title={title ?? ""}
        subtitle={subtitle}
        cancelText='Đóng'
        cancelColor={colors.white}
        onCancel={handleCloseModal}
      />

      <Toast />
      <StatusBar
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
      />
    </>
  )
}
