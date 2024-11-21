import { isNil } from 'lodash'
import React from 'react'
import { FlatList, useColorScheme } from 'react-native'
import { Image, Text, YStack } from 'tamagui'

import getColors from '~/constants/Colors'
import useFetchStylist from '~/hooks/useFetchStylist'
import type Stylist from '~/interfaces/Stylist'

const StylistList = (): JSX.Element => {
  const colors = getColors(useColorScheme())
  const { stylist } = useFetchStylist()

  const renderStylistItem = ({
    item
  }: {
    item: Stylist
  }): React.ReactElement => (
    <YStack alignItems="center" marginBottom={20} paddingRight={14}>
      <Image
        source={
          !isNil(item.avatar) && item.avatar !== ''
            ? { uri: item.avatar }
            : require('~/assets/images/avataDefault.jpg')
        }
        width={72}
        height={72}
        borderRadius={50}
        marginBottom={5}
      />
      <Text fontSize={14} color={colors.text}>
        {item.full_name}
      </Text>
    </YStack>
  )
  return (
    <FlatList
      data={stylist}
      renderItem={renderStylistItem}
      keyExtractor={(item) => item.id}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    />
  )
}

export default StylistList
