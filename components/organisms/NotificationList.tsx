import React from 'react'
import { FlatList } from 'react-native'
import { View } from 'tamagui'

import getColors from '~/constants/Colors'
import { useColorScheme } from '~/hooks/useColorScheme'
import useFetchNotifications from '~/hooks/useFetchNotification'
import { extractTimeWithPeriod, formatDateToLongForm } from '~/utils/formatDateToLongForm'

import Loading from '../atoms/Loading'
import LabelNotification from '../molecules/LabelNotification'

const NotificationList = (): React.ReactElement => {
  const colors = getColors(useColorScheme().colorScheme)
  const { notifications, isLoading } = useFetchNotifications()

  if (isLoading) {
    return (

      <View
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        backgroundColor={colors.lightTransparentBlack}
        justifyContent="center"
        alignItems={'center'}
        zIndex={1}
      >
        <Loading />
      </View>

    )
  }

  return (
    <FlatList
      data={notifications}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <LabelNotification
          label={item.title}
          time={formatDateToLongForm(item.createdAt as string) +
                        ' ' +
                        extractTimeWithPeriod(item.createdAt as string)}
          message={item.body.message}
        />
      )}
      showsVerticalScrollIndicator={false}
      scrollEnabled={false}
    />
  )
}

export default NotificationList
