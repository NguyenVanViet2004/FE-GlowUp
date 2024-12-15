import { LogOut } from '@tamagui/lucide-icons'
import { useRouter } from 'expo-router'
import { isEqual, isNil } from 'lodash'
import React from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'
import { useDispatch, useSelector } from 'react-redux'
import { Button, ScrollView, Text } from 'tamagui'

import AppModal from '~/components/molecules/common/AppModal'
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
import { type RootState } from '~/redux/store'

const ProfileTemplate = (): React.ReactElement => {
  const { colorScheme } = useColorScheme()
  const colors = getColors(colorScheme)
  const { t } = useTranslation()
  const router = useRouter()
  const dispatch = useDispatch()
  const { removeItem } = useStorage()

  const userData = useSelector((state: RootState) => state.user)
  const [isModalVisible, setIsModalVisible] = React.useState(false)

  const handlePressLoginOrLogOut = (): void => {
    if (!isNil(userData) && !isEqual(userData, INITIAL_USER_STATE)) {
      setIsModalVisible(true)
    } else {
      router.push('/authentication/Login')
    }
  }

  const confirmLogout = (): void => {
    try {
      dispatch(resetUser())
      removeItem('userData')
      removeItem('card_info')

      router.replace('/authentication/Login')
      setIsModalVisible(false)

      Toast.show({
        position: 'top',
        text1: 'Thông báo!',
        text2: 'Đã đăng xuất thành công!',
        type: 'success'
      })
    } catch (error) {
      console.error(error)
      Toast.show({
        position: 'top',
        text1: 'Lỗi!',
        text2: 'Đã xảy ra lỗi khi tiến hành đăng xuất tài khoản, vui lòng thử lại sau!',
        type: 'error'
      })
    }
  }

  return (
    <>
      <LinearGradientBackground>
        <ScrollView fullscreen showsVerticalScrollIndicator={false}>
          <SafeAreaView style={styles.container}>
            <UserProfile
              user={isNil(userData) ? INITIAL_USER_STATE : userData}
            />
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
                {isEqual(userData, INITIAL_USER_STATE)
                  ? 'Đăng nhập'
                  : t('screens.profile.logout')}
              </Text>
            </Button>
          </SafeAreaView>
        </ScrollView>
      </LinearGradientBackground>

      <AppModal
        visible={isModalVisible}
        title="Cảnh báo!"
        type="INFO"
        ontClose={() => {
          setIsModalVisible(false)
        }}
        subtitle="Bạn có muốn đăng xuất khỏi tài khoản này không?"
        cancelText="Hủy"
        onCancel={() => {
          setIsModalVisible(false)
        }}
        confirmText="Đăng xuất"
        onConfirm={confirmLogout}
      />
    </>
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
