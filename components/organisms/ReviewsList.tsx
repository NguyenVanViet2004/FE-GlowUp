import { isNil } from 'lodash'
import React from 'react'
import { FlatList, useColorScheme } from 'react-native'
import { Image, Text, XStack, YStack } from 'tamagui'

import StarRating from '~/components/molecules/StarRating'
import getColors from '~/constants/Colors'
import dataUsers from '~/constants/UserData'
import useTranslation from '~/hooks/useTranslation'
import type Review from '~/interfaces/Review'

interface Data {
  dataReview: Review[]
}

const ReviewItem = ({ item }: { item: Review }): React.ReactElement => {
  const colors = getColors(useColorScheme())
  const user = dataUsers.find((user) => user._id === item.userId)
  const { t } = useTranslation()

  return (
    <XStack gap={16} marginBottom={20}>
      <Image
        source={
          !isNil(user) && !isNil(user.avatarUrl)
            ? { uri: user.avatarUrl }
            : require('~/assets/images/avataDefault.jpg')
        }
        width={48}
        height={48}
        borderRadius={25}
      />

      <YStack flex={1} gap={6}>
        <XStack alignItems="center" justifyContent="space-between">
          <Text fontSize={16} color={colors.text}>
            {!isNil(user) ? user.fullName : t('screens.details.unknownUser')}
          </Text>
          <Text fontSize={12} color={'gray'}>
            {new Date(item.createdAt).toDateString()}
          </Text>
        </XStack>
        <StarRating rating={item.rating} />
        <Text fontSize={14} color={colors.text}>{item.comment}</Text>
      </YStack>
    </XStack>
  )
}

const ReviewsList = (data: Data): React.ReactElement => {
  return (
    <FlatList
      scrollEnabled={false}
      data={data.dataReview}
      renderItem={({ item }) => <ReviewItem item={item} />}
      keyExtractor={(item) => item._id}
    />
  )
}

export default ReviewsList
