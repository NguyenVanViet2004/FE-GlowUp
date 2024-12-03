import React from 'react'
import { Button, type ButtonProps } from 'tamagui'

import getColors from '~/constants/Colors'
import { HEIGHT_BUTTON, RADIUS_BUTTON } from '~/constants/Constants'
import { useColorScheme } from '~/hooks/useColorScheme'

type Props = {
  title: string
} & ButtonProps

export const NegativeButton = (props: Props): React.ReactElement => {
  const colors = getColors(useColorScheme().colorScheme)

  return (
    <Button
      {...props}
      justifyContent="center"
      height={HEIGHT_BUTTON}
      flexDirection="row"
      fontSize={16}
      borderWidth={1}
      borderColor={colors.oceanTeal}
      borderRadius={RADIUS_BUTTON}
      testID="negative-button">
      {props.title}
    </Button>
  )
}
