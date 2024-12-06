import { Bell } from '@tamagui/lucide-icons'
import React from 'react'
import { Separator, Text, View, XStack, YStack } from 'tamagui'

import getColors from '~/constants/Colors'
import { useColorScheme } from '~/hooks/useColorScheme'

interface Props {
  label: string
  message: string
  time: string
}

const LabelNotification = (props: Props): React.ReactElement => {
  const colors = getColors(useColorScheme().colorScheme)

  return (
    <YStack marginTop={20}>
      <XStack marginHorizontal={20} gap={10} alignItems="flex-start" >
        <View
          borderRadius={50}
          width={40}
          height={40}
          justifyContent="center"
          backgroundColor={'#E1F5FA'}
          alignItems="center">
          <Bell size={20} color={colors.blueSapphire} />
        </View >
        <YStack gap={5} flex={1}>
          <XStack flex={1} justifyContent="space-between">
            <Text
              flex={1}
              fontSize={13}
              color={colors.text}>
              {props.label}
            </Text>
            <Text
              textAlign="right"
              flex={1}
              fontSize={12}
              color={colors.gray}>{props.time}</Text>
          </XStack>
          <Text fontSize={12} color={colors.text}>{props.message}</Text>
        </YStack>
      </XStack>
      <Separator
        marginTop={20}
        borderColor={colors.text}
        marginHorizontal={20} />

    </YStack>
  )
}

export default LabelNotification
