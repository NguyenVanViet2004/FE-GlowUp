import React from 'react'
import { useSelector } from 'react-redux'
import { Text, View } from 'tamagui'

import BookingList from '~/components/organisms/BookingList'
import useFetchAppointment from '~/hooks/useFetchAppointment'
import useTranslation from '~/hooks/useTranslation'
import { Status } from '~/interfaces/enum/Status'
import { type RootState } from '~/redux/store'

const BookingCompleted = (): React.ReactElement => {
  const { t } = useTranslation()
  const { appointments } = useFetchAppointment()
  const CompletedAppointments = appointments.filter(
    (item) => item.status === Status.COMPLETED
  )
  const customer = appointments.map(data => data.customer.id)
  const user = useSelector((state: RootState) => state.user.result)

  return (
    <View>
      {
        CompletedAppointments.length > 0 && customer.includes(user.id)
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
