import { ChevronLeft, Eye, EyeOff, LockKeyhole } from '@tamagui/lucide-icons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { isNil } from 'lodash'
import React, { useState } from 'react'
import { Alert, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View } from 'tamagui'

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
import useTranslation from '~/hooks/useTranslation'

const ResetPasswordTemplate: React.FC = (): JSX.Element => {
  const { t } = useTranslation()
  const colors = getColors(useColorScheme().colorScheme)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showPasswordConfirm, setShowPasswordConfirm] = useState<boolean>(false)
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [passwordError, setPasswordError] = useState<string>('')
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const router = useRouter()
  const { fonts } = useAppFonts()

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

  const validateConfirmPasswordInput = (value: string): void => {
    setConfirmPasswordError(
      value === password ? '' : t('screens.signUp.passwordDoesNotMatch')
    )
  }

  const data = useLocalSearchParams()
  const phoneNumber = typeof data.phoneNumber === 'string'
    ? JSON.parse(data.phoneNumber)
    : null

  const handleConfirmNewPassword = async (): Promise<void> => {
    try {
      validatePasswordInput(password)
      validateConfirmPasswordInput(confirmPassword)

      if (
        passwordError !== '' ||
        confirmPasswordError !== '' ||
        password === '' ||
        confirmPassword === ''
      ) { return }

      setIsLoading(true)

      const payload = {
        new_password: password,
        phone_number: phoneNumber
      }

      const response = await request.post('/auth/forgot-password', payload)
      if (response.success === true) {
        router.replace('/authentication/Login')
      } else {
        setPassword('Mật khẩu không hợp lệ')
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
              <ChevronLeft color={colors.text} size={25}/>}
          />
        </View>
        <View marginTop={'13%'}>
          <ContentTitle
            title={t('screens.resetPassword.newPassword')}
            subtitle={t('screens.resetPassword.resetPasswordPrompt')}
          />
        </View>

        <View marginTop={'25%'} gap={20}>
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
            justifyContent= "center"
            alignItems= {'center'}
            zIndex= {1}
          >
            <Loading/>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  }
})

export default ResetPasswordTemplate
