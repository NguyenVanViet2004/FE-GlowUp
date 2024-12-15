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
  keyRadio: string
} & ViewProps

const RadioGroupItemWithLabel: React.FC<props> = ({
  size,
  value,
  label,
  descriptions,
  keyRadio,
  ...props
}) => {
  const colors = getColors(useColorScheme().colorScheme)

  return (
    <XStack alignItems="center" key={keyRadio}>
      <YStack flex={1}>
        <Label color={colors.text} size={size} htmlFor={keyRadio}>
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
        id={keyRadio}
        size={size}
        backgroundColor="$colorTransparent"
        key={keyRadio}
        borderColor={colors.radioColor}
        {...props}>
        <RadioGroup.Indicator
          key={keyRadio}
          backgroundColor={colors.radioColor} />
      </RadioGroup.Item>
    </XStack>
  )
}

export default RadioGroupItemWithLabel
