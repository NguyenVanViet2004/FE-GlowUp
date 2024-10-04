import { isNil } from 'lodash'
import React, { useRef, useState } from 'react'
import { Animated, KeyboardAvoidingView, Platform, StyleSheet, type TextInput, useColorScheme } from 'react-native'
import { Input, ScrollView, Text, View, YStack } from 'tamagui'

import ContentTitle from '~/components/atoms/ContentTitle'
import { PositiveButton } from '~/components/atoms/PositiveButton'
import LinearGradientBackground from '~/components/molecules/LinearGradientBackground'
import TextWithLink from '~/components/molecules/TextWithLink'
import getColors from '~/constants/Colors'
import useTranslation from '~/hooks/useTranslation'

const VerifyOTPTemplate: React.FC = (): JSX.Element => {
  const [code, setCode] = useState<string[]>(['', '', '', ''])
  const [message, setMessage] = useState<string>('')
  const [shakeAnimation] = useState(new Animated.Value(0))
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

  const colors = getColors(useColorScheme())
  const inputRefs = useRef<Array<TextInput | null>>([])
  const { t } = useTranslation()

  const handleInputChange = (value: string, index: number): void => {
    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)

    if (value.length === 1 && index < code.length - 1) {
      inputRefs.current[index + 1]?.focus()
    } else if (value.length === 0 && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleVerify = (): void => {
    const enteredCode = code.join('')
    if (enteredCode === '1234') {
      setIsCorrect(true)
    } else {
      setIsCorrect(false)
      setMessage(t('screens.verify.notification'))
      startShakeAnimation()
    }

    inputRefs.current.forEach((input) => input?.blur())
  }

  const startShakeAnimation = (): void => {
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        duration: 100,
        toValue: 1,
        useNativeDriver: true
      }),
      Animated.timing(shakeAnimation, {
        duration: 100,
        toValue: -1,
        useNativeDriver: true
      }),
      Animated.timing(shakeAnimation, {
        duration: 100,
        toValue: 0,
        useNativeDriver: true
      })
    ]).start()
  }

  const shakeStyle = {
    transform: [
      {
        translateX: shakeAnimation.interpolate({
          inputRange: [-1, 1],
          outputRange: [-10, 10]
        })
      }
    ]
  }

  return (
    <LinearGradientBackground>
      <KeyboardAvoidingView
        style={styles.keyBoard}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}>
        <View style={styles.container} testID="View">
          <ScrollView
            contentContainerStyle={styles.scrollContentContainer}
            keyboardShouldPersistTaps="handled">
            <YStack space="$4" padding="$6" flex={1}>
              <View marginTop={'13%'}>
                <ContentTitle
                  title={t('screens.verify.titleVerify')}
                  subtitle={t('screens.verify.subVerify')}
                />
              </View>

              <Animated.View style={shakeStyle}>
                <YStack space="$3"
                  flexDirection="row"
                  justifyContent="center"
                  marginTop={'10%'}>
                  {code.map((digit, index) => (
                    <Input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      width={48}
                      height={56}
                      textAlign="center"
                      maxLength={1}
                      keyboardType="numeric"
                      value={digit}
                      onChangeText={
                        (value) => { handleInputChange(value, index) }}
                      color={colors.text}
                      focusStyle={{
                        borderColor: colors.blue
                      }}
                      borderColor={
                        !isNil(isCorrect) && isCorrect
                          ? colors.green
                          : isCorrect === false
                            ? colors.red
                            : colors.borderInputaOTP
                      }
                      backgroundColor={
                        isCorrect === null
                          ? colors.lightGray
                          : isCorrect
                            ? colors.lightGray
                            : colors.inputBackground
                      }
                    />
                  ))}
                </YStack>
              </Animated.View>

              {message.length > 0 && (
                <Text alignItems="center" color="red">
                  {message}
                </Text>
              )}

              <TextWithLink
                heading={t('screens.verify.receiveCode')}
                linkText={t('screens.verify.resend')}
              />
            </YStack>
          </ScrollView>

          <PositiveButton
            title={t('screens.verify.continue')}
            onPress={handleVerify}
          />
        </View>
      </KeyboardAvoidingView>
    </LinearGradientBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  keyBoard: {
    alignContent: 'center',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  scrollContentContainer: {
    flex: 1
  }
})

export default VerifyOTPTemplate
