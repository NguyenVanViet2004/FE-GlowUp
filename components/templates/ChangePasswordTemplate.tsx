import { ChevronLeft, Eye, EyeOff, LockKeyhole } from '@tamagui/lucide-icons'
import { useRouter } from 'expo-router'
import { isNil } from 'lodash'
import React, { useState } from 'react'
import { Alert, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import { View } from 'tamagui'

import useTranslation from '~//hooks/useTranslation'
import { request } from '~/apis/HttpClient'
import ContentTitle from '~/components/atoms/ContentTitle'
import InputWithIcons from '~/components/atoms/InputWithIcons'
import Loading from '~/components/atoms/Loading'
import { PositiveButton } from '~/components/atoms/PositiveButton'
import AppHeader from '~/components/molecules/common/AppHeader'
import LinearGradientBackground from '~/components/molecules/LinearGradientBackground'
import getColors from '~/constants/Colors'
import { useAppFonts } from '~/hooks/useAppFonts'
import { useColorScheme } from '~/hooks/useColorScheme'
import { type RootState } from '~/redux/store'

const ChangePasswordTemplate = (): React.ReactElement => {
  const { fonts } = useAppFonts()
  const colors = getColors(useColorScheme().colorScheme)
  const router = useRouter()
  const { t } = useTranslation()

  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showOldPassword, setShowOldPassword] = useState<boolean>(false)
  const [showPasswordConfirm, setShowPasswordConfirm] = useState<boolean>(false)

  const [oldPassword, setOldPassword] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')

  const [oldPasswordError, setOldPasswordError] = useState<string>('')
  const [passwordError, setPasswordError] = useState<string>('')
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>('')

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const userId = useSelector(
    (state: RootState) => state.user.result.id
  )

  const renderPasswordIcon = (): JSX.Element => {
    const IconVisiablePassword = showPassword ? EyeOff : Eye
    return (
      <IconVisiablePassword
        size={16}
        color={colors.oceanTeal}
        onPress={() => { setShowPassword(!showPassword) }}
      />
    )
  }
  const renderOldPasswordIcon = (): JSX.Element => {
    const IconVisiablePassword = showOldPassword ? EyeOff : Eye
    return (
      <IconVisiablePassword
        size={16}
        color={colors.oceanTeal}
        onPress={() => { setShowOldPassword(!showOldPassword) }}
      />
    )
  }
  const renderPasswordIconComfirm = (): JSX.Element => {
    const IconVisiablePassword = showPasswordConfirm ? EyeOff : Eye
    return (
      <IconVisiablePassword
        size={16}
        color={colors.oceanTeal}
        onPress={() => { setShowPasswordConfirm(!showPasswordConfirm) }}
      />
    )
  }

  const validatePasswordInput = (value: string): void => {
    if (isNil(value) || value.trim() === '') {
      setPasswordError(t('Không để trống mật khẩu'))
    } else if (value.length < 6) {
      setPasswordError(t('screens.signUp.emtyPassword'))
    } else {
      setPasswordError('')
    }
  }

  const validateOldPasswordInput = (value: string): void => {
    if (isNil(value) || value.trim() === '') {
      setOldPasswordError(t('Không để trống mật khẩu cũ'))
    } else if (value.length < 6) {
      setOldPasswordError(t('screens.signUp.emtyPassword'))
    } else {
      setOldPasswordError('')
    }
  }

  const validateConfirmPasswordInput = (value: string): void => {
    setConfirmPasswordError(
      value === password ? '' : t('screens.signUp.passwordDoesNotMatch')
    )
  }

  const handleConfirmNewPassword = async (): Promise<void> => {
    try {
      validatePasswordInput(password)
      validateOldPasswordInput(oldPassword)
      validateConfirmPasswordInput(confirmPassword)

      if (
        oldPasswordError !== '' ||
            passwordError !== '' ||
            confirmPasswordError !== '' ||
            oldPassword === '' ||
            password === '' ||
            confirmPassword === ''
      ) { return }

      setIsLoading(true)

      const payload = {
        confirm_password: confirmPassword.trim(),
        current_password: oldPassword.trim(),
        new_password: password.trim()
      }

      const response = await request.post(
        `/auth/change-password/${userId}`, payload
      )
      if (response.success === true) {
        Alert.alert(
          t('Thành công'),
          t('Đổi mật khẩu thành công')
        )
        router.replace('/(tabs)/profile')
      } else {
        setOldPasswordError('Mật khẩu hiện tại không chính xác!')
      }
    } catch (err) {
      Alert.alert(
        t('screens.signUp.false'),
        t('Đã xảy ra lỗi')
      )
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <LinearGradientBackground>
      <SafeAreaView style={styles.container}>
        <View>
          <AppHeader
            onPress={() => { router.back() }}
            headerTitle={t('common.back')}
            fontFamily={fonts.JetBrainsMonoRegular}
            leftIcon={
              <ChevronLeft color={colors.text} size={25} />}
          />
        </View>
        <View marginTop={'13%'}>
          <ContentTitle
            title={t('Thay đổi mật khẩu')}
            subtitle={
              'Bây giờ bạn có thể thay đổi mật ' +
              'khẩu và xác nhận lại ở phía bên dưới'
            }
          />
        </View>

        <View marginTop={'25%'} gap={20}>
          <InputWithIcons
            iconRight={<LockKeyhole size={16} color={colors.oceanTeal} />}
            placeholder={t('Mật khẩu cũ')}
            iconLeft={renderOldPasswordIcon()}
            secureTextEntry={!showOldPassword}
            onChangeText={(value) => {
              setOldPassword(value)
              validateOldPasswordInput(value)
            }}
            errorMessage={oldPasswordError}
          />
          <InputWithIcons
            iconRight={<LockKeyhole size={16} color={colors.oceanTeal} />}
            placeholder={t('screens.resetPassword.newPassword')}
            iconLeft={renderPasswordIcon()}
            secureTextEntry={!showPassword}
            onChangeText={(value) => {
              setPassword(value)
              validatePasswordInput(value)
            }}
            errorMessage={passwordError}
          />

          <InputWithIcons
            iconRight={<LockKeyhole size={16} color={colors.oceanTeal} />}
            placeholder={t('screens.resetPassword.confirmNewPassword')}
            iconLeft={renderPasswordIconComfirm()}
            secureTextEntry={!showPasswordConfirm}
            onChangeText={(value) => {
              setConfirmPassword(value)
              validateConfirmPasswordInput(value)
            }}
            errorMessage={confirmPasswordError}
          />
        </View>

        {isLoading && (
          <View
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            backgroundColor={colors.lightTransparentBlack}
            justifyContent="center"
            alignItems={'center'}
            zIndex={1}
          >
            <Loading />
          </View>
        )}

        <View flex={1} justifyContent="flex-end">
          <PositiveButton
            onPress={() => {
              handleConfirmNewPassword().catch(err => { console.log(err) })
            }}
            title={t('screens.resetPassword.confirmNewPassword')}
          />
        </View>
      </SafeAreaView>

    </LinearGradientBackground>
  )
}

export default ChangePasswordTemplate

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  }
})
