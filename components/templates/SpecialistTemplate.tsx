import { useRoute } from '@react-navigation/core'
import { ChevronLeft, ChevronRight } from '@tamagui/lucide-icons'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import duration from 'dayjs/plugin/duration'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { useExpoRouter } from 'expo-router/build/global-state/router-store'
import { isNil } from 'lodash'
import React, { useLayoutEffect, useState } from 'react'
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
  const rightIcon = <ChevronRight size={25} opacity={0}/>
  const { t } = useTranslation()
  const insets = useSafeAreaInsets()

  const [selectedStylist, setSelectedStylist] = useState<Stylist | null>(null)
  const [selectedDay, setSelectedDay] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  const { getObjectItem } = useStorage()

  const [user, setUser] = React.useState<User>()
  dayjs.extend(customParseFormat)
  dayjs.extend(timezone)
  dayjs.extend(utc)
  dayjs.extend(duration)

  const fetchUserLocal = async (): Promise<void> => {
    const userData = await getObjectItem('userData') as User
    if (!isNil(userData)) {
      setUser(userData)
    }
  }
  useLayoutEffect(() => {
    fetchUserLocal().catch((e) => { console.error(e) })
  }, [])
  const route = useRoute()

  const onPayment = async (): Promise<void> => {
    if (
      isNil(selectedDay) || isNil(selectedTime) || isNil(selectedStylist?.id)
    ) return

    const obj = JSON.parse(route.params?.item)
    const startTime = dayjs(`${selectedDay} ${selectedTime}`,
      'YYYY-MM-DD hh:mm A').tz(dayjs.tz.guess(), true)
    const payload = {
      combo_id: obj?.id,
      customer_id: user?.result?.id,
      end_time: startTime.add(obj?.total_time, 'm').toISOString(),
      start_time: startTime.toISOString(),
      stylist_id: selectedStylist?.id
    }

    console.log('payload:', payload)
    const response = await request.post<any>('/booking', payload)
    console.log('response:', response)
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
        paddingTop={10}
      >
        <Specialist toSetSelectedUser={setSelectedStylist}/>
        <DateComponent toSetSelectedDay={setSelectedDay}/>
        <TimePicker toSetSelectedTime={setSelectedTime}/>
      </GradientScrollContainer>

      <PositiveButton
        title={t('specialist.send')}
        onPress={() => {
          onPayment().catch((err) => { console.error(err) })
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
