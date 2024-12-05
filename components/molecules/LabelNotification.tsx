import { Bell } from '@tamagui/lucide-icons'
import React from 'react'
import { Separator, Text, View, XStack, YStack } from 'tamagui'

import getColors from '~/constants/Colors'
import { useColorScheme } from '~/hooks/useColorScheme'

interface Props {
  label: string
  time: string
}

const LabelNotification = (props: Props): React.ReactElement => {
  const colors = getColors(useColorScheme().colorScheme)

  return (
    <YStack marginTop={20}>
      <XStack marginHorizontal={20} gap={10} justifyContent="space-between" >
        <View
          borderRadius={50}
          width={40}
          height={40}
          justifyContent="center"
          backgroundColor={'#E1F5FA'}
          alignItems="center">
          <Bell size={20} color={colors.blueSapphire} />
        </View>
        <Text flex={5.5} fontSize={14} color={colors.text}>{props.label}</Text>
        <Text flex={1.5} fontSize={12} color={colors.gray}>{props.time}</Text>
      </XStack>
      <Separator
        marginTop={20}
        borderColor={colors.text}
        marginHorizontal={20} />

    </YStack>
  )
}

export default LabelNotification
