import { useRouter } from 'expo-router'
import { isNil } from 'lodash'
import React from 'react'
import { useSelector } from 'react-redux'
import { Text, View } from 'tamagui'

import Loading from '~/components/atoms/Loading'
import BookingList from '~/components/organisms/BookingList'
import getColors from '~/constants/Colors'
import { useColorScheme } from '~/hooks/useColorScheme'
import useTranslation from '~/hooks/useTranslation'
import { Status } from '~/interfaces/enum/Status'
import { type RootState } from '~/redux/store'
import { BookingProps } from './BookingUpcoming'

const BookingCancelled = ({
  appointments,
  isLoading,
}: BookingProps): React.ReactElement => {
  const { t } = useTranslation()
  const router = useRouter()
  const colors = getColors(useColorScheme().colorScheme)
  const user = useSelector((state: RootState) => state.user.result)
  const CancelledAppointments = appointments.filter(
    (item) => item.status === Status.CANCELLED &&
    !isNil(item.customer) &&
    item.customer.id === user.id
  ).reverse()

  const viewBooking = (id: string): void => {
    const viewCompletedAppointment = appointments.filter(
      (item) => item.id === id && item.customer.id === user.id
    )
    router.push({
      params: { bookingData: JSON.stringify(viewCompletedAppointment) },
      pathname: '/checkout/BookingCheckout'
    })
  }

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
              visibleFormButton={true}
              visibleTransparentButton={false}
              viewBookingPress={id => { viewBooking(id) }}/>)
          : (<Text color={colors.text}>{t('booking.cancelled')}</Text>)
      }
    </View>
  )
}

export default BookingCancelled
