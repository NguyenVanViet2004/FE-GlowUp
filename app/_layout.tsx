import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider
} from '@react-navigation/native'
import { SplashScreen, Stack } from 'expo-router'
import { isNil } from 'lodash'
import React, { useEffect } from 'react'
import {
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { Provider } from 'react-redux'
import { TamaguiProvider } from 'tamagui'

import getColors from '~/constants/Colors'
import { useAppFonts } from '~/hooks/useAppFonts'
import { useColorScheme } from '~/hooks/useColorScheme'
import useNotifications from '~/hooks/useNotifications'
import useTranslation, { useInitializeI18n } from '~/hooks/useTranslation'
import store from '~/redux/store'
import config from '~/tamagui.config'

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from 'expo-router'

export const unstableSettings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '/'
}

export default function RootLayout (): React.ReactElement {
  const { isI18nInitialized } = useInitializeI18n()
  const { fontError, fontsLoaded } = useAppFonts()

  useEffect(() => {
    if ((fontsLoaded || fontError !== null) && isI18nInitialized) {
      try {
        void SplashScreen.hideAsync()
      } catch (error) {
        console.error('Failed to hide splash screen:', error)
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

function RootLayoutNav (): React.ReactElement {
  const colorScheme = useColorScheme().colorScheme
  const { t } = useTranslation()
  const { notification, expoPushToken } = useNotifications()
  const colors = getColors(colorScheme)

  // State to control the modal visibility
  const [isModalVisible, setIsModalVisible] = React.useState(false)
  const [message, setMessage] = React.useState('')
  const [titleNotify, setTitleNotify] = React.useState('')

  console.log(JSON.stringify(notification, null, 2))
  console.log(JSON.stringify(expoPushToken, null, 2))

  useEffect(() => {
    if (!isNil(notification)) {
      setMessage(notification.request.content.body ?? '')
      setTitleNotify(notification.request.content.title ?? '')
      setIsModalVisible(true)
    }
  }, [notification])

  const handleCloseModal = (): void => {
    setIsModalVisible(false)
  }

  return (
    <>
      <TamaguiProvider config={config} defaultTheme={colorScheme as any}>
        <ThemeProvider
          value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen
              name="(tabs)"
              options={{ headerShown: false, title: t('appTitle') }}
            />
            <Stack.Screen
              name="authentication/Login"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="authentication/SignUp"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="checkout/BookingCheckout"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="authentication/VerifyOTP"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="authentication/ForgotPassword"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="authentication/ResetPassword"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="combo/ComboDetails"
              options={{
                headerShown: false,
                headerTitle: 'Trở về'
              }}
            />
            <Stack.Screen
              name="map/Map"
              options={{
                headerShown: true,
                headerTitle: 'Tiệm cắt tóc GlowUp MD21'
              }}
            />
            <Stack.Screen
              name="combo/StepDetails"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="checkout/SpecialistCheckout"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="payment/SelectPayment"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="payment/WebView"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="combo/viewAll/ShowAllCombo"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="combo/viewAll/ShowAllStylist"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="about/AboutUs"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="authentication/ChangePassword"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="notification/Notification"
              options={{ headerShown: false }}
            />
          </Stack>
        </ThemeProvider>
      </TamaguiProvider>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCloseModal}>
        <View style={styles.modalBackground}>
          <View
            style={[
              styles.modalContainer,
              { backgroundColor: colors.lightMist }
            ]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              {titleNotify}
            </Text>
            <Text style={[styles.modalMessage, { color: colors.text }]}>
              {message}
            </Text>
            <TouchableOpacity
              onPress={handleCloseModal}
              style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <StatusBar
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
      />
    </>
  )
}
/* eslint-disable */
const styles = StyleSheet.create({
  closeButton: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    padding: 10
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16
  },
  modalBackground: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    justifyContent: 'center'
  },
  modalContainer: {
    alignItems: 'center',
    borderRadius: 10,
    padding: 20,
    width: '80%'
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center'
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  }
})
/* eslint-enable */
