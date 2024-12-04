import React from 'react'
import { useColorScheme } from 'react-native'
import { Button, type ButtonProps } from 'tamagui'

import getColors from '~/constants/Colors'
import { HEIGHT_BUTTON, RADIUS_BUTTON } from '~/constants/Constants'

type Props = {
  title: string
} & ButtonProps

export const PositiveButton = (props: Props): React.ReactElement => {
  const colors = getColors(useColorScheme())
  return (
    <Button
      {...props}
      alignItems="center"
      height={HEIGHT_BUTTON}
      fontSize={16}
      color={colors.white}
      pressStyle={{ backgroundColor: colors.gray }}
      backgroundColor={colors.blueSapphire}
      borderRadius={RADIUS_BUTTON}
    >{props.title}</Button>
  )
}
