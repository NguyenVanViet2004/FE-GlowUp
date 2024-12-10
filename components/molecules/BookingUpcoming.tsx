import { useRouter } from 'expo-router'
import { isNil } from 'lodash'
import React, { useState } from 'react'
import { Alert } from 'react-native'
import { useSelector } from 'react-redux'
import { Text, View } from 'tamagui'

import { request } from '~/apis/HttpClient'
import Loading from '~/components/atoms/Loading'
import BookingList from '~/components/organisms/BookingList'
import getColors from '~/constants/Colors'
import { useColorScheme } from '~/hooks/useColorScheme'
import useFetchAppointment from '~/hooks/useFetchAppointment'
import useTranslation from '~/hooks/useTranslation'
import { Status } from '~/interfaces/enum/Status'
import { type RootState } from '~/redux/store'

const BookingUpcoming = (): React.ReactElement => {
  const { t } = useTranslation()
  const router = useRouter()
  const colors = getColors(useColorScheme().colorScheme)
  const { appointments, isLoading, refetch } = useFetchAppointment()
  const [isCanceling, setIsCanceling] = useState(false)

  const user = useSelector((state: RootState) => state.user.result)

  const pendingAppointments = appointments
    .filter(
      (item) =>
        item.status === Status.PENDING &&
      !isNil(item.customer) &&
      item.customer.id === user.id
    )
  // .map((item) => ({
  //   ...item,
  //   payment_status:
  //     item.payment_status === Status.PENDING
  //       ? Status.CASH
  //       : item.payment_status,
  // }))
  const handleCancelBooking = async (Id: string): Promise<void> => {
    Alert.alert('Cảnh báo', 'Bạn chắc chắn muốn hủy lịch?', [
      {
        style: 'cancel',
        text: 'Hủy'
      },
      {
        onPress: () => {
          const cancelBooking = async (): Promise<void> => {
            try {
              setIsCanceling(true)
              const response = await request.get(
                `booking/cancel?phone=${user.phone_number}&booking_id=${Id}`
              )
              if (response.success === true) {
                await refetch()
                setIsCanceling(false)
              }
            } catch (error) {
              console.error(error)
              setIsCanceling(false)
            }
          }

          // Call the async function
          cancelBooking().catch((err) => {
            console.log(err)
          })
        },
        // Use an inline function to handle the async operation
        text: 'Đồng ý'
      }
    ])
  }

  const viewBooking = (id: string): void => {
    const viewCompletedAppointment = pendingAppointments.filter(
      (item) => item.id === id && item.customer.id === user.id
    )
    router.push({
      params: { bookingData: JSON.stringify(viewCompletedAppointment) },
      pathname: '/checkout/BookingCheckout'
    })
  }

  if (isLoading || isCanceling) {
    return <Loading />
  }

  return (
    <View>
      {pendingAppointments.length > 0
        ? (
          <BookingList
            cancellPress={(id) => {
              handleCancelBooking(id).catch((err) => {
                console.log(err)
              })
            }}
            dataCombo={pendingAppointments}
            visibleTextCancel={false}
            visibleFormButton={true}
            visibleTransparentButton={true}
            viewBookingPress={(id) => {
              viewBooking(id)
            }}
          />)
        : (<Text color={colors.text}>{t('booking.upcoming')}</Text>)}
    </View>
  )
}

export default BookingUpcoming
