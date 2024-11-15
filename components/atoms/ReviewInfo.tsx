import { StarFull } from '@tamagui/lucide-icons'
import React from 'react'
import { useColorScheme } from 'react-native'
import { Text, XStack } from 'tamagui'

import getColors from '~/constants/Colors'

interface Props {
  star: string
  view: string
}
const ReviewInfo = (props: Props): React.ReactElement => {
  const colors = getColors(useColorScheme())
  return (
    <XStack alignItems="center" gap={5}>
      <StarFull color={colors.deepOrange} size={16} />
      <Text fontSize={12} fontWeight={'bold'}>{props.star}</Text>
      <Text fontSize={12}>({props.view})</Text>
    </XStack>
  )
}

export default ReviewInfo
