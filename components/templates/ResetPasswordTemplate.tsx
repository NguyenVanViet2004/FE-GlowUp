import { ChevronLeft, Eye, EyeOff, LockKeyhole } from '@tamagui/lucide-icons'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { StyleSheet, useColorScheme } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View } from 'tamagui'

import ContentTitle from '~/components/atoms/ContentTitle'
import InputWithIcons from '~/components/atoms/InputWithIcons'
import { PositiveButton } from '~/components/atoms/PositiveButton'
import AppHeader from '~/components/molecules/common/AppHeader'
import LinearGradientBackground from '~/components/molecules/LinearGradientBackground'
import getColors from '~/constants/Colors'
import { useAppFonts } from '~/hooks/useAppFonts'
import useTranslation from '~/hooks/useTranslation'

const ResetPasswordTemplate: React.FC = (): JSX.Element => {
  const { t } = useTranslation()
  const colors = getColors(useColorScheme())
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showPasswordConfirm, setShowPasswordConfirm] = useState<boolean>(false)
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
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

  const handleConfirmNewPassword = (): void => {
    if (password === '' || confirmPassword === '') {
      alert('Không thể để trống dữ liệu')
      return
    }
    if (password !== confirmPassword) {
      alert('Mật khẩu không trùng khớp')
      return
    }
    if (password.length < 8) {
      alert('Mật khẩu phải có ít nhất 8 ký tự')
      return
    }
    router.replace('/authentication/Login')
  }

  return (
    <LinearGradientBackground>
      <SafeAreaView style={styles.container}>
        <View>
          <AppHeader
            headerTitle={t('common.back')}
            fontFamily={fonts.JetBrainsMonoRegular}
            leftIcon={
              <ChevronLeft size={24} onPress={() => { router.back() }}/>}
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
            onChangeText={setPassword}
          />

          <InputWithIcons
            iconRight={<LockKeyhole size={16} color={colors.oceanTeal} />}
            placeholder={t('screens.resetPassword.confirmNewPassword')}
            iconLeft={renderPasswordIconComfirm()}
            secureTextEntry={!showPasswordConfirm}
            onChangeText={setConfirmPassword}
          />
        </View>

        <View flex={1} justifyContent="flex-end">
          <PositiveButton
            onPress={handleConfirmNewPassword}
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
