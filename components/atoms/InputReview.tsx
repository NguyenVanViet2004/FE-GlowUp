import React from 'react'
import { useColorScheme } from 'react-native'
import { Input, type InputProps } from 'tamagui'

import getColors from '~/constants/Colors'

const InputReview = (props: InputProps): React.ReactElement => {
  const colors = getColors(useColorScheme())

  return (
    <Input
      {...props}
      borderWidth={1}
      unstyled
      padding={16}
      fontSize={16}
      borderColor={colors.smokeStone}
      color={colors.text}
      borderRadius={10}
    />
  )
}

export default InputReview
