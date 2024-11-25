import { useRouter } from 'expo-router'
import { isNil } from 'lodash'
import React, { useState } from 'react'
import { Alert } from 'react-native'
import { View } from 'tamagui'

import { request } from '~/apis/HttpClient'
import ContentTitle from '~/components/atoms/ContentTitle'
import GradientScrollContainer from '~/components/molecules/container/GradientScrollContainer'
import InputForm from '~/components/molecules/InputForm'
import TextWithLink from '~/components/molecules/TextWithLink'
import useTranslation from '~/hooks/useTranslation'

const validatePhoneNumber = (phone: string): boolean => {
  const regex = /^(0[3|5|7|8|9]{1})[0-9]{8}$/
  return regex.test(phone)
}

const SignUpTemplate: React.FC = (): JSX.Element => {
  const { t } = useTranslation()
  const router = useRouter()
  const [fullName, setFullName] = useState<string>('')
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')

  const [nameError, setNameError] = useState<string>('')
  const [phoneError, setPhoneError] = useState<string>('')
  const [passwordError, setPasswordError] = useState<string>('')
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>('')

  // Hàm validate từng trường
  const validateFullName = (value: string): void => {
    setNameError(value !== '' ? '' : t('screens.signUp.emtyName'))
  }

  const validatePhoneNumberInput = (value: string): void => {
    setPhoneError(
      validatePhoneNumber(value) ? '' : t('screens.signUp.checkPhone')
    )
  }

  const validatePasswordInput = (value: string): void => {
    setPasswordError(
      value.length >= 6 ? '' : t('screens.signUp.emtyPassword')
    )
  }

  const validateConfirmPasswordInput = (value: string): void => {
    setConfirmPasswordError(
      value === password ? '' : t('screens.signUp.passwordDoesNotMatch')
    )
  }

  const handleSignUp = async (): Promise<void> => {
    validateFullName(fullName)
    validatePhoneNumberInput(phoneNumber)
    validatePasswordInput(password)
    validateConfirmPasswordInput(confirmPassword)

    if (
      isNil(nameError) ||
      isNil(phoneError) ||
      isNil(passwordError) ||
      isNil(confirmPasswordError) ||
      fullName === '' ||
      phoneNumber === '' ||
      password === '' ||
      confirmPassword === ''
    ) { return }

    try {
      const payload = {
        full_name: fullName,
        password,
        phone_number: phoneNumber
      }

      const res = await request.post('/auth/register', payload)

      if (!isNil(res.success) && res.success) {
        router.replace('/authentication/Login')
        Alert.alert(
          t('screens.signUp.succes'),
          t('screens.signUp.accountCreatedSuccessfully')
        )
      } else {
        setPhoneError(t('screens.signUp.registeredPhoneNumber'))
      }
    } catch (err) {
      Alert.alert(
        t('screens.signUp.false'),
        t('screens.signUp.accountCreatedFalse')
      )
    }
  }

  const redirectToLogin = (): void => {
    router.back()
  }

  return (
    <GradientScrollContainer>
      <View marginTop={'15%'}>
        <ContentTitle
          title={t('screens.signUp.createAnAccount')}
          subtitle={t('screens.signUp.signUpPrompt')}
        />
      </View>

      <View marginTop={'15%'}>
        <InputForm
          visibleInputWithIcons={true}
          visibleForgotPassword={false}
          visibleSpace={false}
          onLoginPress={() => {
            handleSignUp().catch((err) => { console.log(err) })
          }}
          onLoginGooglePress={() => {
            router.replace('/(tabs)/home')
          }}
          positiveButtonTitle={t('screens.login.joinNow')}
          negativeButtonTitle={'Bỏ qua'}
          onChangeNameText={(value) => {
            setFullName(value)
            validateFullName(value)
          }}
          onChangePhoneText={(value) => {
            setPhoneNumber(value)
            validatePhoneNumberInput(value)
          }}
          onChangePasswordText={(value) => {
            setPassword(value)
            validatePasswordInput(value)
          }}
          onChangeConfirmPassWordText={(value) => {
            setConfirmPassword(value)
            validateConfirmPasswordInput(value)
          }}
          nameError={nameError}
          phoneError={phoneError}
          passwordError={passwordError}
          confirmPasswordError={confirmPasswordError}
        />
      </View>

      <View marginTop={'25%'}>
        <TextWithLink
          heading={t('screens.signUp.alreadyHaveAnAccount')}
          linkText={t('screens.login.signIn')}
          onLinkPress={redirectToLogin}
        />
      </View>
    </GradientScrollContainer>
  )
}

export default SignUpTemplate
