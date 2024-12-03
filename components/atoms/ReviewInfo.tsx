import { StarFull } from '@tamagui/lucide-icons'
import React from 'react'
import { Text, XStack } from 'tamagui'

import getColors from '~/constants/Colors'
import { useColorScheme } from '~/hooks/useColorScheme'

interface Props {
  star: string
  view: string
}
const ReviewInfo = (props: Props): React.ReactElement => {
  const { colorScheme } = useColorScheme()
  const colors = getColors(colorScheme)
  return (
    <XStack alignItems="center" gap={5}>
      <StarFull color={colors.deepOrange} size={16} />
      <Text fontSize={12} color={colors.text} fontWeight={'bold'}>
        {props.star}
      </Text>
      <Text fontSize={12} color={colors.text}>
        ({props.view})
      </Text>
    </XStack>
  )
}

export default ReviewInfo
