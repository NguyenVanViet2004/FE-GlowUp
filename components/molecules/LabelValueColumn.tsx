import React from 'react'
import { type LayoutChangeEvent } from 'react-native'
import { type StackProps, Text, type TextProps, YStack } from 'tamagui'

import getColors from '~/constants/Colors'
import { useColorScheme } from '~/hooks/useColorScheme'

type LabelValueColumnProps = {
  label: string
  value: string
  labelProps?: TextProps
  valueProps?: TextProps
  onLayout?: (event: LayoutChangeEvent) => void
} & StackProps

const LabelValueColumn: React.FC<LabelValueColumnProps> = ({
  label,
  value,
  labelProps,
  valueProps,
  onLayout,
  ...stackProps
}) => {
  const colors = getColors(useColorScheme().colorScheme)
  return (
    <YStack gap={10} {...stackProps} onLayout={onLayout}>
      <Text color={colors.text} {...labelProps}>{label}</Text>
      <Text color={colors.text} {...valueProps}>{value}</Text>
    </YStack>
  )
}

export default LabelValueColumn
