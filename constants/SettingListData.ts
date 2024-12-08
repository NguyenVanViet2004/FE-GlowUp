import { AlertCircle, BellRing, Lock, User2 } from '@tamagui/lucide-icons'
import { useRouter } from 'expo-router'
import { Alert } from 'react-native'

import useStorage from '~/hooks/useStorage'
import useTranslation from '~/hooks/useTranslation'
import type SettingsList from '~/interfaces/SettingsList'

export const SettingListData = (): SettingsList[] => {
  const { t } = useTranslation()
  const router = useRouter()
  const { getObjectItem } = useStorage()

  const checkLoginStatus = async (): Promise<boolean> => {
    const localUser = await getObjectItem('userData')
    return localUser !== null && localUser !== undefined
  }
  return [
    {
      items: [
        {
          icon: User2,
          isDisabled: false,
          onPress: () => {
            void (async () => {
              const isLoggedIn = await checkLoginStatus()
              if (isLoggedIn) {
                router.push('/profileUser/ProfileUser')
              } else {
                Alert.alert('Thông báo', 'Bạn chưa đăng nhập', [{ text: 'OK' }])
              }
            })()
          },
          title: t('user.userInfo')
        },
        {
          icon: Lock,
          isDisabled: false,
          onPress: () => { router.push('/authentication/ChangePassword') },
          title: t('screens.profile.changePassword')
        }
      ],
      key: 'card1'
    },
    {
      items: [
        {
          icon: BellRing,
          isDisabled: false,
          onPress: () => { router.push('/notification/Notification') },
          title: t('permissions.NOTIFICATION.title')
        },
        // {
        //   icon: Globe,
        //   onPress: () => {},
        //   title: t('screens.profile.language'),
        //   isDisabled: true
        // },
        {
          icon: AlertCircle,
          isDisabled: false,
          onPress: () => { router.push('/about/AboutUs') },
          title: t('screens.profile.about')
        }
      ],
      key: 'card2'
    }
  ]
}
