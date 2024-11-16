import React from 'react'
import { useColorScheme } from 'react-native'
import { Button, type ButtonProps, Text } from 'tamagui'

import getColors from '~/constants/Colors'
import { RADIUS_BUTTON } from '~/constants/Constants'
import { useAppFonts } from '~/hooks/useAppFonts'

type Props = {
  title: string
  colorProps: string
} & ButtonProps
const TransparentButton = (props: Props): React.ReactElement => {
  const { fonts } = useAppFonts()
  const colors = getColors(useColorScheme())
  return (
    <Button
      onPress={props.onPress}
      bg="$colorTransparent"
      borderRadius={RADIUS_BUTTON}
      borderColor={props.colorProps}
      pressStyle={{ backgroundColor: colors.gray }}
      borderWidth={1}>
      <Text
        fontFamily={fonts.JetBrainsMonoBold}
        color={props.colorProps}
        fontSize={16}>
        {props.title}
      </Text>
    </Button>
  )
}

export default TransparentButton
