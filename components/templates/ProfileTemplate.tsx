import { LogOut } from '@tamagui/lucide-icons'
import { useRouter } from 'expo-router'
import { isNil } from 'lodash'
import React, { useLayoutEffect } from 'react'
import { Alert, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { Button, ScrollView, Text } from 'tamagui'

import LinearGradientBackground from '~/components/molecules/LinearGradientBackground'
import UserProfile from '~/components/molecules/UserProfile'
import SettingList from '~/components/organisms/SettingList'
import getColors from '~/constants/Colors'
import {
  initialState as INITIAL_USER_STATE,
  resetUser
} from '~/features/userSlice'
import { useColorScheme } from '~/hooks/useColorScheme'
import useStorage from '~/hooks/useStorage'
import useTranslation from '~/hooks/useTranslation'
import type User from '~/interfaces/User'
import { type RootState } from '~/redux/store'

const ProfileTemplate = (): React.ReactElement => {
  const { colorScheme } = useColorScheme()
  const colors = getColors(colorScheme)
  const { t } = useTranslation()
  const router = useRouter()
  const dispatch = useDispatch()
  const { removeItem } = useStorage()

  const userData = useSelector((state: RootState) => state.user)

  const handlePressLoginOrLogOut = (): void => {
    if (!isNil(userData)) {
      Alert.alert(t('common.warning'), t('common.doYouWantToLogout'), [
        {
          onPress: () => {
            dispatch(resetUser())
            removeItem('userData').catch((err) => {
              console.log(err)
            })

            router.replace('/authentication/Login')
          },
          text: t('button.confirm')
        },
        {
          style: 'cancel',
          text: t('button.cancel')
        }
      ])
    } else {
      router.push('/authentication/Login')
    }
  }

  return (
    <LinearGradientBackground>
      <ScrollView fullscreen showsVerticalScrollIndicator={false}>
        <SafeAreaView style={styles.container}>
          <UserProfile user={isNil(userData) ? INITIAL_USER_STATE : userData} />
          <SettingList colors={colors} />

          <Button
            backgroundColor="$colorTransparent"
            borderWidth={1}
            borderRadius="$2"
            borderColor="red"
            onPress={handlePressLoginOrLogOut}
            icon={<LogOut color={colors.text} />}
            justifyContent="center">
            <Text color={colors.text} fontWeight="600">
              {isNil(userData) ? 'Đăng nhập' : t('screens.profile.logout')}
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
