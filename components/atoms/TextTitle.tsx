import React from "react"
import { Text, type TextProps } from "tamagui"

import getColors from "~/constants/Colors"
import { useAppFonts } from "~/hooks/useAppFonts"
import { useColorScheme } from "~/hooks/useColorScheme"

type Props = {
  text: string
} & TextProps

export const TextTitle = (props: Props): React.ReactElement => {
  const colors = getColors(useColorScheme().colorScheme)
  const { fonts } = useAppFonts()

  return (
    <Text
      {...props}
      fontSize={14}
      fontFamily={fonts.JetBrainsMonoBold}
      color={colors.oceanTeal}
      testID='text-title'>
      {props.text}
    </Text>
  )
}
