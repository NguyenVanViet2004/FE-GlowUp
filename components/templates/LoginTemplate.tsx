import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Alert, useColorScheme } from 'react-native'
import { useDispatch } from 'react-redux'
import { View } from 'tamagui'

import { request } from '~/apis/HttpClient'
import ContentTitle from '~/components/atoms/ContentTitle'
import Loading from '~/components/atoms/Loading'
import GradientScrollContainer from '~/components/molecules/container/GradientScrollContainer'
import InputForm from '~/components/molecules/InputForm'
import TextWithLink from '~/components/molecules/TextWithLink'
import getColors from '~/constants/Colors'
import { setUser } from '~/features/userSlice'
import useNotifications from '~/hooks/useNotifications'
import useStorage from '~/hooks/useStorage'
import useTranslation from '~/hooks/useTranslation'
import type User from '~/interfaces/User'

const LoginTemplate: React.FC = (): JSX.Element => {
  const { expoPushToken } = useNotifications()
  const { setObjectItem } = useStorage<string | object>()
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const router = useRouter()
  const colors = getColors(useColorScheme())
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [phoneError, setPhoneError] = useState<string>('')
  const [passwordError, setPasswordError] = useState<string>('')

  const validatePhoneNumber = (value: string): void => {
    setPhoneError(value !== '' ? '' : t('screens.login.emtyPhone'))
  }

  const validatePassword = (value: string): void => {
    setPasswordError(value.length >= 6 ? '' : t('screens.login.emtyPassword'))
  }

  const handleLogin = async (): Promise<void> => {
    try {
      validatePhoneNumber(phoneNumber)
      validatePassword(password)

      if (
        phoneError !== '' ||
        passwordError !== '' ||
        phoneNumber === '' ||
        password === ''
      ) { return }

      setIsLoading(true)

      const payload = {
        notify_token: expoPushToken,
        password,
        phone_number: phoneNumber
      }

      const response = await request.post<User>('/auth/login', payload)
      if (response.result !== null) {
        await setObjectItem('userData', response)
        dispatch(setUser(response))

        router.replace('/(tabs)/home')
      } else {
        setPasswordError(t('screens.login.incorrectAccountOrPassword'))
        setPhoneError(t('screens.login.incorrectAccountOrPassword'))
      }
    } catch (err) {
      Alert.alert(
        t('screens.signUp.false'),
        t('screens.signUp.accountCreatedFalse')
      )
    } finally {
      setIsLoading(false)
    }
  }

  const redirectToHome = (): void => {
    router.push('/authentication/SignUp')
  }

  return (
    <GradientScrollContainer>
      <View marginTop={'15%'}>
        <ContentTitle
          title={t('screens.login.welcomeBack')}
          subtitle={t('screens.login.loginPrompt')}
        />
      </View>

      <View marginTop={'25%'} flex={1}>
        <InputForm
          visibleInputWithIcons={false}
          visibleForgotPassword={true}
          visibleSpace={true}
          onLoginPress={() => {
            handleLogin().catch((err) => { console.log(err) })
          }}
          onLoginGooglePress={() => { router.replace('/(tabs)/home') }}
          onForgotPasswordPress={
            () => { router.push('/authentication/ForgotPassword') }
          }
          positiveButtonTitle={t('screens.login.signIn')}
          negativeButtonTitle={'Bỏ qua'}
          onChangePhoneText={(value) => {
            setPhoneNumber(value)
            validatePhoneNumber(value)
          }}
          onChangePasswordText={(value) => {
            setPassword(value)
            validatePassword(value)
          }}
          passwordError={passwordError}
          phoneError={phoneError}
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

      <View marginTop={'25%'}>
        <TextWithLink
          heading={t('screens.login.signupPrompt')}
          linkText={t('screens.login.joinNow')}
          onLinkPress={redirectToHome}
        />
      </View>
    </GradientScrollContainer>
  )
}

export default LoginTemplate
