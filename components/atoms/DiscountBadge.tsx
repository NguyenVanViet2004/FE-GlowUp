import { Tag } from '@tamagui/lucide-icons'
import React from 'react'
import { Text, XStack } from 'tamagui'

import getColors from '~/constants/Colors'
import { useColorScheme } from '~/hooks/useColorScheme'

interface Props {
  percent: string
  quantity: string
}
const DiscountBadge = (props: Props): React.ReactElement => {
  const { colorScheme } = useColorScheme()
  const colors = getColors(colorScheme)
  return (
    <XStack alignItems="center" gap={4} testID="discount-badge">
      <Tag color={colors.blueSapphire} size={16} testID="discount-badge-icon"/>
      <Text fontSize={12} fontWeight={'bold'}
        testID="discount-badge-percent"
        color={colors.blueSapphire}>
        -{props.percent}
      </Text>
      <Text color={colors.text}
        testID="discount-badge-quantity"
        fontSize={12}>
        ({props.quantity} pax available)
      </Text>
    </XStack>
  )
}

export default DiscountBadge
