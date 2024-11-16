import { useRouter } from 'expo-router'
import { isNil } from 'lodash'
import React, { useEffect, useState } from 'react'
import { Alert, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView, View } from 'tamagui'

import { request } from '~/apis/HttpClient'
import ContentTitle from '~/components/atoms/ContentTitle'
import InputForm from '~/components/molecules/InputForm'
import LinearGradientBackground from '~/components/molecules/LinearGradientBackground'
import TextWithLink from '~/components/molecules/TextWithLink'
import useStorage from '~/hooks/useStorage'
import useTranslation from '~/hooks/useTranslation'

const LoginTemplate: React.FC = (): JSX.Element => {
  const { setItem, setObjectItem } = useStorage<string | object>()
  const { t } = useTranslation()
  const router = useRouter()
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const [phoneError, setPhoneError] = useState<string>('')
  const [passwordError, setPasswordError] = useState<string>('')

  const validateForm = (): void => {
    const passwordError = password === '' ||
    password === null
      ? t('screens.login.emtyPassword')
      : ''

    const phoneError = phoneNumber === '' ||
    phoneNumber === null
      ? t('screens.login.emtyPhone')
      : ''

    setPasswordError(passwordError)
    setPhoneError(phoneError)
  }
  useEffect(() => {
    validateForm()
  }, [phoneNumber, password])

  const handleLogin = async (): Promise<void> => {
    try {
      validateForm()

      if (isNil(phoneError) || isNil(passwordError)) {
        return
      }
      const payload = {
        password,
        phone_number: phoneNumber
      }
      const res = await request.post('/auth/login', payload)

      if (!isNil(res.access_token) && !isNil(res.refresh_token)) {
        await setItem('accessToken', res.access_token as string)
        await setItem('refreshToken', res.refresh_token as string)
        await setObjectItem('userData', JSON.stringify(res.data))
        router.replace('/(tabs)/home')
      } else {
        setPasswordError(t('screens.login.incorrectAccountOrPassword'))
        setPhoneError(t('screens.login.incorrectAccountOrPassword'))
        console.log(res.message)
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
      <ScrollView showsVerticalScrollIndicator={false} >
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
                handleLogin().catch((err) => { console.error(err) })
              }}
              onLoginGooglePress={() => {}}
              positiveButtonTitle={t('screens.login.signIn')}
              negativeButtonTitle={t('screens.login.signInWithGoogle')}
              onChangePhoneText={setPhoneNumber}
              onChangePasswordText={setPassword}
              passwordError={passwordError}
              phoneError={phoneError}
            />
          </View>

          <View marginTop={'25%'} >
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
