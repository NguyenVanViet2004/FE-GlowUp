import { Tag } from '@tamagui/lucide-icons'
import React from 'react'
import { useColorScheme } from 'react-native'
import { Text, XStack } from 'tamagui'

import getColors from '~/constants/Colors'

interface Props {
  percent: string
  quantity: string
}
const DiscountBadge = (props: Props): React.ReactElement => {
  const colors = getColors(useColorScheme())
  return (
    <XStack alignItems="center" gap={4}>
      <Tag color={colors.blueSapphire} size={16}/>
      <Text
        fontSize={12}
        fontWeight={'bold'}
        color={colors.blueSapphire}>
        -{props.percent}
      </Text>
      <Text fontSize={12}>({props.quantity} pax available)</Text>
    </XStack>
  )
}

export default DiscountBadge
