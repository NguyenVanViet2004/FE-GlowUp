import React from 'react'
import { useSelector } from 'react-redux'
import { Text, View } from 'tamagui'

import Loading from '~/components/atoms/Loading'
import BookingList from '~/components/organisms/BookingList'
import useFetchAppointment from '~/hooks/useFetchAppointment'
import useTranslation from '~/hooks/useTranslation'
import { Status } from '~/interfaces/enum/Status'
import { type RootState } from '~/redux/store'

const BookingCompleted = (): React.ReactElement => {
  const { t } = useTranslation()
  const { appointments, isLoading } = useFetchAppointment()
  const user = useSelector((state: RootState) => state.user.result)

  const CompletedAppointments = appointments.filter(
    (item) => item.status === Status.COMPLETED && item.customer.id === user.id
  )

  if (isLoading) {
    return <Loading />
  }
  return (
    <View>
      {
        CompletedAppointments.length > 0
          ? (
            <BookingList
              dataCombo={CompletedAppointments}
              visibleTextCancel={false}
              visibleFormButton={true}
              visibleTransparentButton={false} />)
          : (
            <Text>{t('booking.completed')}</Text>)
      }
    </View>
  )
}

export default BookingCompleted
