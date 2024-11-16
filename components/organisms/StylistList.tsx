import { isNil } from 'lodash'
import React from 'react'
import { FlatList, useColorScheme } from 'react-native'
import { Image, Text, YStack } from 'tamagui'

import getColors from '~/constants/Colors'
import { dataStylist } from '~/constants/StylistData'
import type Stylist from '~/interfaces/Stylist'

const StylistList = (): JSX.Element => {
  const colors = getColors(useColorScheme())

  const renderStylistItem = ({
    item
  }: {
    item: Stylist
  }): React.ReactElement => (
    <YStack alignItems="center" marginBottom={20} paddingRight={14}>
      <Image
        source={
          !isNil(item.avatarUrl) && item.avatarUrl !== ''
            ? { uri: item.avatarUrl }
            : require('~/assets/images/avataDefault.jpg')
        }
        width={72}
        height={72}
        borderRadius={50}
        marginBottom={5}
      />
      <Text fontSize={14} color={colors.text}>
        {item.fullName}
      </Text>
    </YStack>
  )
  return (
    <FlatList
      data={dataStylist}
      renderItem={renderStylistItem}
      keyExtractor={(item) => item._id}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    />
  )
}

export default StylistList
