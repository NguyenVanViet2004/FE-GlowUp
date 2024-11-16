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

  const validateForm = (): void => {
    const nameError = fullName === '' ||
    fullName === null
      ? t('screens.signUp.emtyName')
      : ''
    const passwordError = password.length >= 6
      ? ''
      : t('screens.signUp.emtyPassword')
    const confirmPasswordError = password === confirmPassword
      ? ''
      : t('screens.signUp.passwordDoesNotMatch')
    const phoneError = validatePhoneNumber(phoneNumber)
      ? ''
      : t('screens.signUp.checkPhone')

    setPasswordError(passwordError)
    setConfirmPasswordError(confirmPasswordError)
    setPhoneError(phoneError)
    setNameError(nameError)
  }

  useEffect(() => {
    validateForm()
  }, [fullName, phoneNumber, password, confirmPassword])

  const handleSignUp = async (): Promise<void> => {
    try {
      validateForm()

      if (
        isNil(nameError) ||
        isNil(phoneError) ||
        isNil(passwordError) ||
        isNil(confirmPasswordError)
      ) {
        return
      }

      const payload = {
        full_name: fullName,
        password,
        phone_number: phoneNumber
      }

      const res = await request.post('/auth/register', payload)
      if (res.success) {
        router.replace('/authentication/Login')
        Alert.alert(
          t('screens.signUp.succes'),
          t('screens.signUp.accountCreatedSuccessfully')
        )
      } else {
        setPhoneError(res.message)
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
    <LinearGradientBackground>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SafeAreaView style={styles.container}>
          <View marginTop={'13%'}>
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
                handleSignUp().catch(err => { console.log(err) })
              }}
              onLoginGooglePress={() => {}}
              positiveButtonTitle={t('screens.login.joinNow')}
              negativeButtonTitle={t('screens.signUp.joinWithGoogle')}
              onChangeNameText={setFullName}
              onChangePhoneText={setPhoneNumber}
              onChangePasswordText={setPassword}
              onChangeConfirmPassWordText={setConfirmPassword}
              nameError={nameError}
              phoneError={phoneError}
              passwordError={passwordError}
              confirmPasswordError={confirmPasswordError}
            />
          </View>
          <View marginTop={'18%'} >
            <TextWithLink
              heading={t('screens.signUp.alreadyHaveAnAccount')}
              linkText={t('screens.login.signIn')}
              onLinkPress={redirectToLogin}
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

export default SignUpTemplate
