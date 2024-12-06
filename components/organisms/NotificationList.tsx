import React from 'react'
import { FlatList } from 'react-native'
import { View } from 'tamagui'

import getColors from '~/constants/Colors'
import { useColorScheme } from '~/hooks/useColorScheme'
import useFetchNotifications from '~/hooks/useFetchNotification'
import { extractTimeWithPeriod, formatDateToLongForm } from '~/utils/formatDateToLongForm'

import Loading from '../atoms/Loading'
import LabelNotification from '../molecules/LabelNotification'
import { useSelector } from 'react-redux'
import { RootState } from '~/redux/store'

const NotificationList = (): React.ReactElement => {
  const { notifications, isLoading } = useFetchNotifications()

  const userId = useSelector(
    (state: RootState) => state.user.result.id
  )
  const userDataNotification = notifications.filter(
    (item: any) => item.user_id === userId
  )

  if (isLoading) {
    return (
      <Loading />
    )
  }

  return (
    <FlatList
      data={userDataNotification}
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
