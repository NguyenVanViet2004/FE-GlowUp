import { Mail, Phone } from '@tamagui/lucide-icons'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View } from 'tamagui'

import ContentTitle from '~/components/atoms/ContentTitle'
import InputWithIcons from '~/components/atoms/InputWithIcons'
import { PositiveButton } from '~/components/atoms/PositiveButton'
import { TextTitle } from '~/components/atoms/TextTitle'
import LinearGradientBackground from '~/components/molecules/LinearGradientBackground'
import getColors from '~/constants/Colors'
import { useColorScheme } from '~/hooks/useColorScheme'
import useTranslation from '~/hooks/useTranslation'

const ForgotTemplate = (): React.ReactElement => {
  const { t } = useTranslation()
  const colors = getColors(useColorScheme().colorScheme)

  const [isPhoneEmail, setIsPhoneEmail] = useState<boolean>(true)

  const toggleMailPhone = (): void => {
    setIsPhoneEmail(!isPhoneEmail)
  }

  const IconVisibleForgot = isPhoneEmail
    ? (
      <Mail size={16} color={colors.oceanTeal} />)
    : (
      <Phone size={16} color={colors.oceanTeal} />)

  return (
    <LinearGradientBackground>
      <SafeAreaView style={styles.container}>
        <View marginTop={'13%'}>
          <ContentTitle
            title={t('screens.forgot.forgotPassword')}
            subtitle={t('screens.forgot.titleForgot')}
          />
        </View>

        <View marginTop={'25%'}>
          <InputWithIcons
            iconRight={IconVisibleForgot}
            placeholder={
              isPhoneEmail
                ? t('screens.forgot.emailAddress')
                : t('screens.forgot.phoneNumber')
            }
          />
          <TextTitle
            onPress={toggleMailPhone}
            marginTop={20}
            textAlign="right"
            text={
              isPhoneEmail
                ? t('screens.forgot.usePhoneNumber')
                : t('screens.forgot.useEmailAddress')
            }
          />
        </View>
        <View marginTop={'25%'}>
          <PositiveButton
            title={t('screens.forgot.sendCode')}
            onPress={() => {}}
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

export default ForgotTemplate
