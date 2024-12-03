import React from 'react'
import { Text, XStack } from 'tamagui'

import getColors from '~/constants/Colors'
import { useColorScheme } from '~/hooks/useColorScheme'

interface SummaryRowProps {
  label: string
  value: string | number
  fonts: any
  color: string
}

const SummaryRow: React.FC<SummaryRowProps> = ({
  label,
  value,
  fonts,
  color
}) => {
  const colors = getColors(useColorScheme().colorScheme)

  return (<XStack>
    <Text
      color={colors.text}
      flex={1}
      fontFamily={fonts.fonts.JetBrainsMonoBold}>
      {label}
    </Text>
    <Text color={color} fontFamily={fonts.fonts.JetBrainsMonoBold}>
      {value}
    </Text>
  </XStack>)
}

export default SummaryRow
