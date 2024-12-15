import Constants from 'expo-constants'
import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'
import { isNil } from 'lodash'
import { useEffect, useRef, useState } from 'react'
import { Alert, Platform } from 'react-native'
import Toast from 'react-native-toast-message'

import useTranslation from '~/hooks/useTranslation'

const useNotifications = (): {
  expoPushToken: string
  notification: Notifications.Notification | undefined
} => {
  const [expoPushToken, setExpoPushToken] = useState<string>('')
  const [notification, setNotification] = useState<
  Notifications.Notification | undefined
  >(undefined)
  const notificationListener = useRef<Notifications.Subscription>()
  const responseListener = useRef<Notifications.Subscription>()
  const { t } = useTranslation()

  useEffect(() => {
    const registerForPushNotificationsAsync = async (): Promise<void> => {
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          importance: Notifications.AndroidImportance.MAX,
          lightColor: '#FF231F7C',
          name: 'default',
          vibrationPattern: [0, 250, 250, 250]
        })
      }

      if (Device.isDevice) {
        const { status: existingStatus } =
        await Notifications.getPermissionsAsync()
        let finalStatus = existingStatus
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync()
          finalStatus = status
        }
        if (finalStatus !== 'granted') {
          Toast.show({
            position: 'top',
            text1: 'Thất bại',
            text2: 'Chưa được cấp quyền',
            type: 'error'
          })
          return
        }

        try {
          const projectId = Constants?.expoConfig?.extra?.eas?.projectId
          if (isNil(projectId)) {
            throw new Error('Project ID not found')
          }

          const token = await Notifications.getExpoPushTokenAsync({
            projectId
          })
          setExpoPushToken(token.data)
        } catch (error) {
          console.error(error)
        }
      } else {
        Toast.show({
          position: 'top',
          text1: 'Thất bại',
          text2: 'Phải sử dụng thiết bị vật lí',
          type: 'error'
        })
      }
    }

    registerForPushNotificationsAsync().catch(console.error)

    notificationListener.current = Notifications
      .addNotificationReceivedListener((notification) => {
        setNotification(notification)
      })

    responseListener.current = Notifications
      .addNotificationResponseReceivedListener((response) => {
        console.log(response)
      })

    return () => {
      notificationListener.current?.remove()
      responseListener.current?.remove()
    }
  }, [])

  return { expoPushToken, notification }
}

export default useNotifications
