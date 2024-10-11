import { Circle } from '@tamagui/lucide-icons'
import React from 'react'
import { useColorScheme } from 'react-native'
import { Text, type TextProps, XStack, YStack } from 'tamagui'

import getColors from '~/constants/Colors'
import { useAppFonts } from '~/hooks/useAppFonts'

type Props = {
  days: string
  times: string
} & TextProps

const TimeHours = (props: Props): JSX.Element => {
  const { fonts } = useAppFonts()
  const colors = getColors(useColorScheme())
  return (
    <XStack alignItems="center" gap={10}>
      <Circle
        strokeWidth={4}
        size={12}
        fill={colors.tealGreen}
        color={colors.white}
      />
      <YStack gap={8}>
        <Text fontSize={14} color={'gray'}>
          {props.days}
        </Text>
        <Text fontSize={14} fontFamily={fonts.JetBrainsMonoBold}>
          {props.times}
        </Text>
      </YStack>
    </XStack>
  )
}

export default TimeHours
