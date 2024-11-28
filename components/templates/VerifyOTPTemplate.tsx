import { ChevronLeft, Verified } from '@tamagui/lucide-icons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { isNil } from 'lodash'
import React, { useEffect, useState } from 'react'
import { Alert, StyleSheet, useColorScheme } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View } from 'tamagui'

import { request } from '~/apis/HttpClient'
import ContentTitle from '~/components/atoms/ContentTitle'
import InputWithIcons from '~/components/atoms/InputWithIcons'
import { PositiveButton } from '~/components/atoms/PositiveButton'
import { TextTitle } from '~/components/atoms/TextTitle'
import AppHeader from '~/components/molecules/common/AppHeader'
import LinearGradientBackground from '~/components/molecules/LinearGradientBackground'
import getColors from '~/constants/Colors'
import { useAppFonts } from '~/hooks/useAppFonts'
import useTranslation from '~/hooks/useTranslation'

const VerifyOTPTemplate = (): React.ReactElement => {
  const { t } = useTranslation()
  const { fonts } = useAppFonts()
  const colors = getColors(useColorScheme())
  const router = useRouter()

  const [verifyOTP, setVerifyOTP] = useState<string>('')
  const [otpError, setOtpError] = useState<string>('')
  const [timer, setTimer] = useState<number>(60) // Thời gian đếm ngược 60 giây
  const [isResendDisabled, setIsResendDisabled] = useState<boolean>(true)

  const validateVerifyOTP = (value: string): void => {
    setOtpError(value !== '' ? '' : t('Vui lòng nhập mã OTP'))
  }

  const data = useLocalSearchParams()
  const phoneNumber = typeof data.phoneNumber === 'string'
    ? JSON.parse(data.phoneNumber)
    : null

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prev) => prev - 1)
      }, 1000)

      return () => { clearInterval(countdown) }
    } else {
      setIsResendDisabled(false)
    }
  }, [timer])

  const handleVerifyOTP = async (): Promise<void> => {
    try {
      validateVerifyOTP(verifyOTP)
      if (
        isNil(otpError) ||
        verifyOTP === ''
      ) { return }

      const payload = {
        otp_code: verifyOTP,
        phone_number: phoneNumber
      }

      const response = await request.post('/otp/verify', payload)
      if (response.message === 'OTP code is correct') {
        router.replace('/authentication/ResetPassword')
      } else {
        setOtpError('OTP không hợp lệ')
      }
    } catch (err) {
      Alert.alert(
        t('screens.signUp.false'),
        t('Đã xảy ra lỗi')
      )
    }
  }

  const handleResendOTP = async (): Promise<void> => {
    try {
      const payload = {
        phone_number: phoneNumber
      }
      await request.post('/otp', payload)
      setTimer(60) // Reset bộ đếm
      setIsResendDisabled(true)
    } catch (err) {
      Alert.alert(
        t('screens.signUp.false'),
        t('Gửi OTP Thất bại')
      )
    }
  }

  return (
    <LinearGradientBackground>
      <SafeAreaView style={styles.container}>
        <View flex={1}>
          <AppHeader
            headerTitle={t('common.back')}
            fontFamily={fonts.JetBrainsMonoRegular}
            leftIcon={
              <ChevronLeft size={24} onPress={() => { router.back() }}/>}
          />
          <View marginTop={'13%'}>
            <ContentTitle
              title={t('screens.verify.titleVerify')}
              subtitle={`${t('screens.verify.subVerify')} ${phoneNumber}`}
            />
          </View>

          <View marginTop={'25%'}>
            <InputWithIcons
              maxLength={6}
              onChangeText={(value) => {
                setVerifyOTP(value)
                validateVerifyOTP(value)
              }}
              iconRight={<Verified size={16} color={colors.oceanTeal} />}
              placeholder={t('OTP')}
              errorMessage={otpError}
            />
            <TextTitle
              pressStyle={{ color: colors.gray }}
              onPress={() => {
                if (!isResendDisabled) {
                  handleResendOTP().catch(err => { console.log(err) })
                }
              }}
              marginTop={20}
              textAlign="right"
              text={
                isResendDisabled
                  ? `${t('screens.verify.resend')} (${timer}s)`
                  : t('screens.verify.resend')
              }
            />
          </View>
        </View>
        <View >
          <PositiveButton
            title={t('screens.verify.continue')}
            onPress={() => {
              handleVerifyOTP().catch(err => { console.log(err) })
            }}
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

export default VerifyOTPTemplate
