import React, { useState } from 'react'
import { Alert } from 'react-native'
import { useSelector } from 'react-redux'
import { Text, View } from 'tamagui'

import { request } from '~/apis/HttpClient'
import Loading from '~/components/atoms/Loading'
import BookingList from '~/components/organisms/BookingList'
import useFetchAppointment from '~/hooks/useFetchAppointment'
import useTranslation from '~/hooks/useTranslation'
import { Status } from '~/interfaces/enum/Status'
import { type RootState } from '~/redux/store'

const BookingUpcoming = (): React.ReactElement => {
  const { t } = useTranslation()
  const { appointments, isLoading, refetch } = useFetchAppointment()
  const [isCanceling, setIsCanceling] = useState(false)

  const user = useSelector((state: RootState) => state.user.result)
  console.log(user)

  const pendingAppointments = appointments.filter(
    (item) => item.status === Status.PENDING && item.customer.id === user.id
  )

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
          cancelBooking().catch(err => { console.log(err) })
        },
        // Use an inline function to handle the async operation
        text: 'Đồng ý'
      }
    ])

    console.log('abc')
  }

  if (isLoading || isCanceling) {
    return <Loading />
  }

  return (
    <View>
      {pendingAppointments.length > 0
        ? (
          <BookingList
            cancellPress={id => {
              handleCancelBooking(id).catch(err => { console.log(err) })
            }}
            dataCombo={pendingAppointments}
            visibleTextCancel={false}
            visibleFormButton={true}
            visibleTransparentButton={true}
          />)
        : (
          <Text>{t('booking.upcoming')}</Text>)}
    </View>
  )
}

export default BookingUpcoming
