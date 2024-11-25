import React from 'react'
import { useSelector } from 'react-redux'
import { Text, View } from 'tamagui'

import BookingList from '~/components/organisms/BookingList'
import useFetchAppointment from '~/hooks/useFetchAppointment'
import useTranslation from '~/hooks/useTranslation'
import { Status } from '~/interfaces/enum/Status'
import { type RootState } from '~/redux/store'

const BookingUpcoming = (): React.ReactElement => {
  const { t } = useTranslation()
  const { appointments } = useFetchAppointment()
  const pendingAppointments = appointments.filter(
    (item) => item.status === Status.PENDING
  )
  const customer = appointments.map(data => data.customer.id)
  const user = useSelector((state: RootState) => state.user.result)

  return (
    <View>
      {
        pendingAppointments.length > 0 && customer.includes(user.id)
          ? (
            <BookingList
              dataCombo={pendingAppointments}
              visibleTextCancel={false}
              visibleFormButton={true}
              visibleTransparentButton={true} />)
          : (
            <Text>{t('booking.upcoming')}</Text>)
      }
    </View>
  )
}

export default BookingUpcoming
