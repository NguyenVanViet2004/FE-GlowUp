import { isNil } from 'lodash'
import React from 'react'
import { useColorScheme } from 'react-native'
import {
  Label,
  RadioGroup,
  type SizeTokens,
  Text,
  type ViewProps,
  XStack,
  YStack
} from 'tamagui'

import getColors from '~/constants/Colors'

type props = {
  size?: SizeTokens
  value: string
  label: string
  descriptions?: string
} & ViewProps

const RadioGroupItemWithLabel: React.FC<props> = ({
  size,
  value,
  label,
  descriptions,
  ...props
}) => {
  const id = `radiogroup-${value}`
  const colors = getColors(useColorScheme())

  return (
    <XStack alignItems="center">
      <YStack flex={1}>
        <Label size={size} htmlFor={id}>
          {label}
        </Label>
        {!isNil(descriptions) && (
          <Text color={colors.gray} fontSize={12}>
            {descriptions}
          </Text>
        )}
      </YStack>

      <RadioGroup.Item
        value={value}
        id={id}
        size={size}
        backgroundColor="$colorTransparent"
        borderColor={colors.radioColor}
        {...props}>
        <RadioGroup.Indicator backgroundColor={colors.radioColor} />
      </RadioGroup.Item>
    </XStack>
  )
}

export default RadioGroupItemWithLabel
