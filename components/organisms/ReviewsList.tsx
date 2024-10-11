import React from 'react'
import { FlatList, useColorScheme } from 'react-native'
import { Image, Text, XStack, YStack } from 'tamagui'

import StarRating from '~/components/molecules/StarRating'
import getColors from '~/constants/Colors'
import dataUsers from '~/constants/UserData'
// import { dataAppointments } from '~/constants/AppointmentData' 
import type Review from '~/interfaces/Review'
import useTranslation from '~/hooks/useTranslation';

interface Data {
  dataReview: Review[]
}

const ReviewItem = ({ item }: { item: Review }) => {
  const colors = getColors(useColorScheme())
  const user = dataUsers.find((user) => user._id === item.userId)
    const {t} = useTranslation()
//   const appointment = dataAppointments.find((appointment) => appointment._id === item.appointmentId)
//   const comboId = appointment?.comboId 

  return (
    <XStack gap={16} marginBottom={20}>
      <Image
        source={
          user?.avatarUrl
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
            {user?.fullName || t("screens.details.unknownUser")}
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
