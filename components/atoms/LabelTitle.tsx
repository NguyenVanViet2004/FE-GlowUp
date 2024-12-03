import React from 'react'
import { Text, type TextProps, XStack } from 'tamagui'

import getColors from '~/constants/Colors'
import { useAppFonts } from '~/hooks/useAppFonts'
import { useColorScheme } from '~/hooks/useColorScheme'

type Props = {
  title: string
  subTitle?: string
} & TextProps

const LabelTitle = (props: Props): JSX.Element => {
  const { colorScheme } = useColorScheme()
  const colors = getColors(colorScheme)
  const { fonts } = useAppFonts()
  return (
    <XStack justifyContent="space-between" testID="label-title">
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
