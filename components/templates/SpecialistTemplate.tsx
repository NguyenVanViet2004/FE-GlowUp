import { ChevronLeft, ChevronRight } from '@tamagui/lucide-icons'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import duration from 'dayjs/plugin/duration'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { useLocalSearchParams } from 'expo-router'
import { useExpoRouter } from 'expo-router/build/global-state/router-store'
import { isNil } from 'lodash'
import React, { useLayoutEffect, useState } from 'react'
import { Alert } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { request } from '~/apis/HttpClient'
import { PositiveButton } from '~/components/atoms/PositiveButton'
import GradientScrollContainer from '~/components/molecules/container/GradientScrollContainer'
import DateComponent from '~/components/molecules/Date'
import TimePicker from '~/components/molecules/Time'
import Specialist from '~/components/organisms/Specialist'
import getColors from '~/constants/Colors'
import { useColorScheme } from '~/hooks/useColorScheme'
import useStorage from '~/hooks/useStorage'
import useTranslation from '~/hooks/useTranslation'
import type Combo from '~/interfaces/Combo'
import type Stylist from '~/interfaces/Stylist'
import type User from '~/interfaces/User'

const SpecialistTemplate: React.FC = (): JSX.Element => {
  const router = useExpoRouter()
  const colors = getColors(useColorScheme().colorScheme)
  const leftIcon = (
    <ChevronLeft
      size={25}
      color={colors.text}
      onPress={() => router.goBack()}
    />
  )
  const rightIcon = <ChevronRight size={25} opacity={0} />
  const { t } = useTranslation()
  const insets = useSafeAreaInsets()

  const [selectedStylist, setSelectedStylist] = useState<Stylist | null>(null)
  const [selectedDay, setSelectedDay] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  const { getObjectItem } = useStorage()
  const dataCombo = useLocalSearchParams()
  const parsedItem =
    typeof dataCombo.item === 'string'
      ? (JSON.parse(dataCombo.item) as Combo)
      : null

  const [user, setUser] = React.useState<User>()
  dayjs.extend(customParseFormat)
  dayjs.extend(timezone)
  dayjs.extend(utc)
  dayjs.extend(duration)

  const fetchUserLocal = async (): Promise<void> => {
    const userData = (await getObjectItem('userData')) as User
    if (!isNil(userData)) {
      setUser(userData)
    }
  }
  useLayoutEffect(() => {
    fetchUserLocal().catch((e) => {
      console.error(e)
    })
  }, [])

  const onPayment = async (): Promise<void> => {
    if (
      isNil(selectedDay) ||
      isNil(selectedTime) ||
      isNil(selectedStylist?.id)
    ) {
      return
    }
    if (isNil(parsedItem)) return

    const startTime = dayjs(
      `${selectedDay} ${selectedTime}`,
      'YYYY-MM-DD hh:mm A'
    ).tz(dayjs.tz.guess(), true)
    const payload = {
      combo_id: parsedItem?.id,
      customer_id: user?.result?.id,
      end_time: new Date(
        startTime.toDate().getTime() + parsedItem.total_time * 60000
      ),
      start_time: startTime.toDate(),
      stylist_id: selectedStylist?.id
    }

    try {
      const response = await request.post<any>('/booking', payload)
      if (response.success === true) {
        const bookingInfo = {
          combo: response.result.combo,
          customer: response.result.customer,
          end_time: response.result.end_time,
          id: response.result.id,
          payment_status: response.result.payment_status,
          start_time: response.result.start_time,
          stylist: response.result.stylist,
          total_price: response.result.total_price
        }
        router.push({
          params: { bookingInfo: JSON.stringify(bookingInfo) },
          pathname: '/checkout/BookingCheckout'
        })
      } else {
        Alert.alert(response.message ?? '')
      }
    } catch (error) {
      console.error('Error push booking', error)
    }
  }

  return (
    <>
      <GradientScrollContainer
        paddingHorizontal={0}
        edges={['left', 'right', 'bottom']}
        headerTitle={t('specialist.title')}
        isHeaderCenter={true}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        paddingTop={10}>
        <Specialist toSetSelectedUser={setSelectedStylist} />
        <DateComponent toSetSelectedDay={setSelectedDay} />
        <TimePicker
          toSetSelectedTime={setSelectedTime}
          selectedDate={selectedDay ?? undefined}
        />
      </GradientScrollContainer>

      <PositiveButton
        title={t('specialist.send')}
        onPress={() => {
          onPayment().catch((err) => {
            console.error(err)
          })
        }}
        marginHorizontal={20}
        position="absolute"
        left={0}
        right={0}
        bottom={insets.bottom === 0 ? 20 : insets.bottom}
      />
    </>
  )
}

export default SpecialistTemplate
