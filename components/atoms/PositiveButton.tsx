import React from 'react'
import { Button, type ButtonProps } from 'tamagui'

import getColors from '~/constants/Colors'
import { HEIGHT_BUTTON, RADIUS_BUTTON } from '~/constants/Constants'
import { useColorScheme } from '~/hooks/useColorScheme'

type Props = {
  title: string
} & ButtonProps

export const PositiveButton = (props: Props): React.ReactElement => {
  const colors = getColors(useColorScheme().colorScheme)

  return (
    <Button
      {...props}
      alignItems="center"
      height={HEIGHT_BUTTON}
      fontSize={16}
      color={colors.white}
      backgroundColor={colors.blueSapphire}
      borderRadius={RADIUS_BUTTON}
      testID="positive-button">
      {props.title}
    </Button>
  )
}
