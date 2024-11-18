import { useRouter } from 'expo-router'
import { isNil } from 'lodash'
import React, { useState } from 'react'
import { Alert, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'
import { ScrollView, View } from 'tamagui'

import { request } from '~/apis/HttpClient'
import ContentTitle from '~/components/atoms/ContentTitle'
import InputForm from '~/components/molecules/InputForm'
import LinearGradientBackground from '~/components/molecules/LinearGradientBackground'
import TextWithLink from '~/components/molecules/TextWithLink'
import { setUser } from '~/features/userSlice'
import useStorage from '~/hooks/useStorage'
import useTranslation from '~/hooks/useTranslation'
import type User from '~/interfaces/User'

const LoginTemplate: React.FC = (): JSX.Element => {
  const { setObjectItem } = useStorage<string | object>()
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const router = useRouter()
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [password, setPassword] = useState<string>('')

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
        isNil(phoneError) ||
        isNil(passwordError) ||
        phoneNumber === '' ||
        password === ''
      ) { return }

      const payload = {
        password,
        phone_number: phoneNumber
      }

      const response = await request.post<User>('/auth/login', payload)
      if (response.result !== null) {
        await setObjectItem('userData', response)
        // setUser(response)
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
    }
  }

  const redirectToSignUp = (): void => {
    router.push('/authentication/SignUp')
  }

  return (
    <LinearGradientBackground>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SafeAreaView style={styles.container}>
          <View marginTop={'13%'}>
            <ContentTitle
              title={t('screens.login.welcomeBack')}
              subtitle={t('screens.login.loginPrompt')}
            />
          </View>

          <View marginTop={'25%'}>
            <InputForm
              visibleInputWithIcons={false}
              visibleForgotPassword={true}
              visibleSpace={true}
              onLoginPress={() => {
                handleLogin().catch((err) => { console.log(err) })
              }}
              onLoginGooglePress={() => {}}
              positiveButtonTitle={t('screens.login.signIn')}
              negativeButtonTitle={t('screens.login.signInWithGoogle')}
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

          <View marginTop={'25%'}>
            <TextWithLink
              heading={t('screens.login.signupPrompt')}
              linkText={t('screens.login.joinNow')}
              onLinkPress={redirectToSignUp}
            />
          </View>
        </SafeAreaView>
      </ScrollView>
    </LinearGradientBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  }
})

export default LoginTemplate
