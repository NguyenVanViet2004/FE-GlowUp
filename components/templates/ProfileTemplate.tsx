import { LogOut } from '@tamagui/lucide-icons'
import { useRouter } from 'expo-router'
import { isNil } from 'lodash'
import React, { useLayoutEffect } from 'react'
import { Alert, StyleSheet, useColorScheme } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'
import { Button, ScrollView, Text } from 'tamagui'

import LinearGradientBackground from '~/components/molecules/LinearGradientBackground'
import UserProfile from '~/components/molecules/UserProfile'
import SettingList from '~/components/organisms/SettingList'
import getColors from '~/constants/Colors'
import { initialState as INITIAL_USER_STATE, resetUser } from '~/features/userSlice'
import useStorage from '~/hooks/useStorage'
import useTranslation from '~/hooks/useTranslation'
import type User from '~/interfaces/User'

const ProfileTemplate = (): React.ReactElement => {
  const colors = getColors(useColorScheme())
  const { t } = useTranslation()
  const router = useRouter()
  const dispatch = useDispatch()
  const { removeItem } = useStorage()
  const { getObjectItem } = useStorage()
  const [user, setUser] = React.useState<User>()

  const fetchUserLocal = async (): Promise<void> => {
    const userData = await getObjectItem('userData') as User
    if (!isNil(userData)) {
      setUser(userData)
    }
  }

  const handlePressLoginOrLogOut = (): void => {
    if (!isNil(user)) {
      Alert.alert(t('common.warning'), t('common.doYouWantToLogout'), [
        {
          onPress: () => {
            dispatch(resetUser())
            removeItem('userData').catch(err => { console.log(err) })

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

  useLayoutEffect(() => {
    fetchUserLocal().catch((e) => { console.error(e) })
  }, [])

  return (
    <LinearGradientBackground>
      <ScrollView fullscreen showsVerticalScrollIndicator={false}>
        <SafeAreaView style={styles.container}>

          <UserProfile user={isNil(user) ? INITIAL_USER_STATE : user} />
          <SettingList colors={colors} />

          <Button
            backgroundColor="$colorTransparent"
            borderWidth={1}
            borderRadius="$2"
            borderColor="red"
            onPress={handlePressLoginOrLogOut}
            icon={<LogOut color="$danger" />}
            justifyContent="center">
            <Text color="$danger" fontWeight="600">
              {isNil(user) ? 'Đăng nhập' : t('screens.profile.logout')}
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
