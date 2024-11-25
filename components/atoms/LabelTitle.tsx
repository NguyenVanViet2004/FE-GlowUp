import React from 'react'
import { useColorScheme } from 'react-native'
import { Text, type TextProps, XStack } from 'tamagui'

import getColors from '~/constants/Colors'
import { useAppFonts } from '~/hooks/useAppFonts'

type Props = {
  title: string
  subTitle?: string
} & TextProps

const LabelTitle = (props: Props): JSX.Element => {
  const colors = getColors(useColorScheme())
  const { fonts } = useAppFonts()
  return (
    <XStack justifyContent="space-between">
      <Text
        fontFamily={fonts.JetBrainsMonoBold}
        color={colors.text}
        fontSize={16}>
        {props.title}
      </Text>
      <Text onPress={props.onPress} fontSize={14} color={colors.blueSapphire}>
        {props.subTitle}
      </Text>
    </XStack>
  )
}

export default LabelTitle
