import { Eye, EyeOff, LockKeyhole, Mail, Phone, User2 } from '@tamagui/lucide-icons'
import { isNil } from 'lodash'
import React, { useState } from 'react'
import { useColorScheme } from 'react-native'
import { Image, type InputProps, Separator, Text, View, YStack } from 'tamagui'

import InputWithIcons from '~/components/atoms/InputWithIcons'
import { NegativeButton } from '~/components/atoms/NegativeButton'
import { PositiveButton } from '~/components/atoms/PositiveButton'
import { TextTitle } from '~/components/atoms/TextTitle'
import getColors from '~/constants/Colors'
import { SPACING_20 } from '~/constants/Constants'
import useTranslation from '~/hooks/useTranslation'

type Props = {
  visibleRecoveryPassword?: boolean
  visibleInputWithIcons?: boolean
  visibleForgotPassword?: boolean
  visibleSpace?: boolean
  onChangeNameText?: (text: string) => void
  onChangeEmailText?: (text: string) => void
  onChangePhoneText?: (text: string) => void
  onChangePasswordText?: (text: string) => void
  onLoginPress?: () => void
  onLoginGooglePress?: () => void
  positiveButtonTitle: string
  negativeButtonTitle: string
} & InputProps

const InputForm: React.FC<Props> = (props: Props): JSX.Element => {
  const colors = getColors(useColorScheme())
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const { t } = useTranslation()

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

  return (
    <View>
      <YStack gap={18}>

        <View display={
          !isNil(props.visibleInputWithIcons) &&
                        props.visibleInputWithIcons
            ? 'flex'
            : 'none'}>
          <InputWithIcons
            iconRight={<User2 size={16} color={colors.oceanTeal} />}
            placeholder={t('screens.signUp.name')}
            onChangeText={props.onChangeNameText}
          />

        </View>

        <InputWithIcons
          iconRight={<Mail size={16} color={colors.oceanTeal} />}
          placeholder={t('screens.login.email')}
          onChangeText={props.onChangeEmailText}
        />

        <View display={
          !isNil(props.visibleInputWithIcons) &&
                        props.visibleInputWithIcons
            ? 'flex'
            : 'none'}>

          <InputWithIcons
            iconRight={<Phone size={16} color={colors.oceanTeal} />}
            placeholder={t('screens.signUp.mobileNumber')}
            onChangeText={props.onChangePhoneText}
          />

        </View>

        <InputWithIcons
          iconLeft={renderPasswordIcon()}
          iconRight={<LockKeyhole size={16} color={colors.oceanTeal} />}
          placeholder={t('screens.login.password')}
          secureTextEntry={!showPassword}
          onChangeText={props.onChangePasswordText}
        />
      </YStack>

      {
        !isNil(props.visibleForgotPassword) && props.visibleForgotPassword
          ? <TextTitle
            marginTop={SPACING_20}
            text={t('screens.login.forgotPassword')}
            textAlign="right"/>
          : <Text fontSize={14} textAlign="left" marginTop={SPACING_20}>
            {t('screens.signUp.TermsOfUse1')}
            <TextTitle text={t('screens.signUp.TermsOfUse2')}/>
          </Text>
      }

      <View marginTop={'25%'} display={
        !isNil(props.visibleSpace) &&
                        props.visibleSpace
          ? 'flex'
          : 'none'}
      />

      <YStack gap={20} marginTop={SPACING_20}>
        <PositiveButton
          onPress={props.onLoginPress}
          title={props.positiveButtonTitle}/>

        <View flexDirection="row" alignItems="center" justifyContent="center">
          <Separator borderColor={colors.smokeStone}/>
          <Text marginHorizontal={SPACING_20} color={colors.text} >or</Text>
          <Separator borderColor={colors.smokeStone}/>
        </View>

        <NegativeButton
          onPress={props.onLoginGooglePress}
          title={props.negativeButtonTitle}
          backgroundColor={colors.white}
          color={colors.labelButton}
          icon={
            <Image
              width={20}
              height={20}
              src={require('~/assets/images/iconGoogle.png')} />
          }
        />
      </YStack>

    </View>
  )
}

export default InputForm
