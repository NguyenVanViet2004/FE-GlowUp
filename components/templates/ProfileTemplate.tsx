import { LogOut } from '@tamagui/lucide-icons'
import { type Router, useRouter } from 'expo-router'
import { type TFunction } from 'i18next'
import React from 'react'
import { Alert, StyleSheet, useColorScheme } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { Button, ScrollView, Text } from 'tamagui'

import LinearGradientBackground from '~/components/molecules/LinearGradientBackground'
import UserProfile from '~/components/molecules/UserProfile'
import SettingList from '~/components/organisms/SettingList'
import getColors from '~/constants/Colors'
import { resetUser } from '~/features/userSlice'
import useStorage from '~/hooks/useStorage'
import useTranslation from '~/hooks/useTranslation'
import { type RootState } from '~/redux/store'

const useHandleLogout = (
  t: TFunction<'translation', undefined>,
  router: Router,
  removeCachedData: VoidFunction
): VoidFunction => {
  return () => {
    Alert.alert(t('common.warning'), t('common.doYouWantToLogout'), [
      {
        onPress: () => {
          removeCachedData()

          router.replace('/authentication/Login')
        },
        text: t('button.confirm')
      },
      {
        style: 'cancel',
        text: t('button.cancel')
      }
    ])
  }
}

const ProfileTemplate = (): React.ReactElement => {
  const colors = getColors(useColorScheme())
  const { t } = useTranslation()
  const router = useRouter()
  const dispatch = useDispatch()
  const { removeItem } = useStorage()
  const userData = useSelector((state: RootState) => state.user)

  return (
    <LinearGradientBackground>
      <ScrollView fullscreen showsVerticalScrollIndicator={false}>
        <SafeAreaView style={styles.container}>

          <UserProfile user={userData} />
          <SettingList colors={colors} />

          <Button
            backgroundColor="$colorTransparent"
            borderWidth={1}
            borderRadius="$2"
            borderColor="red"
            onPress={useHandleLogout(t, router, () => {
              dispatch(resetUser())
              removeItem('userData').catch(err => { console.log(err) })
            })}
            icon={<LogOut color="$danger" />}
            justifyContent="center">
            <Text color="$danger" fontWeight="600">
              {t('screens.profile.logout')}
            </Text>
          </Button>
        </SafeAreaView>
      </ScrollView>
    </LinearGradientBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 30,
    paddingBottom: 150,
    paddingHorizontal: 20,
    paddingTop: 20
  }
})

export default ProfileTemplate
