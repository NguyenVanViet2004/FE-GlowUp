import { isNil } from 'lodash'
import React from 'react'
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
import { useColorScheme } from '~/hooks/useColorScheme'

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
  const colors = getColors(useColorScheme().colorScheme)

  return (
    <XStack alignItems="center" key={id}>
      <YStack flex={1}>
        <Label color={colors.text} size={size} htmlFor={id}>
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
        key={id}
        borderColor={colors.radioColor}
        {...props}>
        <RadioGroup.Indicator key={id} backgroundColor={colors.radioColor} />
      </RadioGroup.Item>
    </XStack>
  )
}

export default RadioGroupItemWithLabel
