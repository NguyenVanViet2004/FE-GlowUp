import { useRouter } from 'expo-router'
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

const BookingCompleted = (): React.ReactElement => {
  const { t } = useTranslation()
  const router = useRouter()
  const colors = getColors(useColorScheme().colorScheme)
  const { appointments, isLoading } = useFetchAppointment()
  const user = useSelector((state: RootState) => state.user.result)

  const CompletedAppointments = appointments.filter(
    (item) => item.status === Status.COMPLETED && item.customer.id === user.id
  )

  if (isLoading) {
    return <Loading />
  }

  const viewBooking = (id: string): void => {
    router.push('/checkout/BookingCheckout')
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
              visibleTransparentButton={false}
              viewBookingPress={id => { viewBooking(id) }}/>)
          : (
            <Text color={colors.text}>{t('booking.completed')}</Text>)
      }
    </View>
  )
}

export default BookingCompleted
