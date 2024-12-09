import { AlertCircle, BellRing, CreditCard, Lock, User2 } from '@tamagui/lucide-icons'
import { useRouter } from 'expo-router'
import Toast from 'react-native-toast-message'

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
                Toast.show({
                  position: 'top',
                  text1: 'Vui lòng đăng nhập trước khi sử dụng tính năng này!',
                  type: 'error'
                })
              }
            })()
          },
          title: t('user.userInfo')
        },
        {
          icon: CreditCard,
          isDisabled: false,
          onPress: () => {
            void (async () => {
              const isLoggedIn = await checkLoginStatus()
              if (isLoggedIn) {
                router.push('/cardInfo/CardInfo')
              } else {
                Toast.show({
                  position: 'top',
                  text1: 'Vui lòng đăng nhập trước khi sử dụng tính năng này!',
                  type: 'error'
                })
              }
            })()
          },
          title: 'Thông tin thẻ'
        },
        {
          icon: Lock,
          isDisabled: false,
          onPress: () => {
            void (async () => {
              const isLoggedIn = await checkLoginStatus()
              if (isLoggedIn) {
                router.push('/authentication/ChangePassword')
              } else {
                Toast.show({
                  position: 'top',
                  text1: 'Vui lòng đăng nhập trước khi sử dụng tính năng này!',
                  type: 'error'
                })
              }
            })()
          },
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
          onPress: () => {
            router.push('/notification/Notification')
          },
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
          onPress: () => {
            router.push('/about/AboutUs')
          },
          title: t('screens.profile.about')
        }
      ],
      key: 'card2'
    }
  ]
}
