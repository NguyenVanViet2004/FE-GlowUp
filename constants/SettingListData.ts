import { AlertCircle, BellRing, Globe, Heart, Lock, User2 } from '@tamagui/lucide-icons'
import { useRouter } from 'expo-router'

import useTranslation from '~/hooks/useTranslation'
import type SettingsList from '~/interfaces/SettingsList'

export const SettingListData = (): SettingsList[] => {
  const { t } = useTranslation()
  const router = useRouter()

  return [
    {
      items: [
        {
          icon: User2,
          isDisabled: false,
          onPress: () => {
            router.navigate('/profile')
          },
          title: t('user.userInfo')
        },
        // {
        //   icon: Heart,
        //   onPress: () => {},
        //   title: t('user.yourFavorite'),
        //   isDisabled: true
        // },
        {
          icon: Lock,
          isDisabled: false,
          onPress: () => {},
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
          onPress: () => {},
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
