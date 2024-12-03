import React from 'react'
import { useSelector } from 'react-redux'
import { Text, View } from 'tamagui'

import Loading from '~/components/atoms/Loading'
import BookingList from '~/components/organisms/BookingList'
import getColors from '~/constants/Colors'
import { useColorScheme } from '~/hooks/useColorScheme'
import useFetchAppointment from '~/hooks/useFetchAppointment'
import useTranslation from '~/hooks/useTranslation'
import { Status } from '~/interfaces/enum/Status'
import { type RootState } from '~/redux/store'

const BookingCancelled = (): React.ReactElement => {
  const { t } = useTranslation()
  const colors = getColors(useColorScheme().colorScheme)
  const { appointments, isLoading } = useFetchAppointment()
  const user = useSelector((state: RootState) => state.user.result)
  const CancelledAppointments = appointments.filter(
    (item) => item.status === Status.CANCELLED && item.customer.id === user.id
  )

  if (isLoading) {
    return <Loading />
  }
  return (
    <View>
      {
        CancelledAppointments.length > 0
          ? (
            <BookingList
              dataCombo={CancelledAppointments}
              visibleTextCancel={true}
              visibleFormButton={false}
              visibleTransparentButton={false} />)
          : (<Text color={colors.text}>{t('booking.cancelled')}</Text>)
      }
    </View>
  )
}

export default BookingCancelled
