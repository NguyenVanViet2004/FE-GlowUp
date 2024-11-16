import React from 'react'
import { type LayoutChangeEvent } from 'react-native'
import { type StackProps, Text, type TextProps, YStack } from 'tamagui'

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
  return (
    <YStack gap={10} {...stackProps} onLayout={onLayout}>
      <Text {...labelProps}>{label}</Text>
      <Text {...valueProps}>{value}</Text>
    </YStack>
  )
}

export default LabelValueColumn
