import React from 'react'
import { useSelector } from 'react-redux'
import { Text, View } from 'tamagui'

import BookingList from '~/components/organisms/BookingList'
import useFetchAppointment from '~/hooks/useFetchAppointment'
import useTranslation from '~/hooks/useTranslation'
import { Status } from '~/interfaces/enum/Status'
import { type RootState } from '~/redux/store'

const BookingCancelled = (): React.ReactElement => {
  const { t } = useTranslation()
  const { appointments } = useFetchAppointment()
  const CancelledAppointments = appointments.filter(
    (item) => item.status === Status.CANCELLED
  )
  const customer = appointments.map(data => data.customer.id)
  const user = useSelector((state: RootState) => state.user.result)

  return (
    <View>
      {
        CancelledAppointments.length > 0 && customer.includes(user.id)
          ? (
            <BookingList
              dataCombo={CancelledAppointments}
              visibleTextCancel={true}
              visibleFormButton={false}
              visibleTransparentButton={false} />)
          : (<Text>{t('booking.cancelled')}</Text>)
      }
    </View>
  )
}

export default BookingCancelled
