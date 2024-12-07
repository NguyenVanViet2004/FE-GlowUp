import dayjs from 'dayjs'
import { isNil } from 'lodash'
import { type Dispatch, type SetStateAction, useState } from 'react'
import { FlatList, type ListRenderItem } from 'react-native'
import { Button, Stack, Text } from 'tamagui'

import getColors from '~/constants/Colors'
import { useAppFonts } from '~/hooks/useAppFonts'
import { useColorScheme } from '~/hooks/useColorScheme'
import useTranslation from '~/hooks/useTranslation'

interface ITimePicker {
  toSetSelectedTime?: Dispatch<SetStateAction<string | null>>
  selectedDate?: string
}

const TimePicker: React.FC<ITimePicker> = (props: ITimePicker) => {
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedHour, setSelectedHour] = useState<string | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedMinute, setSelectedMinute] = useState<string | null>(null)
  const { fonts } = useAppFonts()
  const { t } = useTranslation()
  const colors = getColors(useColorScheme().colorScheme)
  const selectedDate = dayjs(props.selectedDate)
  console.log(selectedDate)

  const generateTimes = (): string[] => {
    const times: string[] = []
    const now = dayjs()
    const isToday = selectedDate.isSame(now, 'day')

    for (let hour = 7; hour < 23; hour++) {
      if (hour === 7) {
        // Bắt đầu từ 07:30
        const time = dayjs().hour(7).minute(30)
        if (!isToday || time.isAfter(now)) {
          times.push(time.format('hh:mm A'))
        }
      } else if (hour === 22) {
        // Dừng ở 22:30
        const time1 = dayjs().hour(22).minute(0)
        const time2 = dayjs().hour(22).minute(30)
        if (!isToday || time1.isAfter(now)) {
          times.push(time1.format('hh:mm A'))
        }
        if (!isToday || time2.isAfter(now)) {
          times.push(time2.format('hh:mm A'))
        }
      } else {
        const time1 = dayjs().hour(hour).minute(0)
        const time2 = dayjs().hour(hour).minute(30)
        if (!isToday || time1.isAfter(now)) {
          times.push(time1.format('hh:mm A'))
        }
        if (!isToday || time2.isAfter(now)) {
          times.push(time2.format('hh:mm A'))
        }
      }
    }

    return times
  }

  const times = generateTimes()
  const isOutOfWorkingHours =
    times.length === 0 &&
    selectedDate.isSame(dayjs(), 'day') &&
    (dayjs().hour() > 22 ||
      (dayjs().hour() === 22 && dayjs().minute() > 30))

  if (isOutOfWorkingHours) {
    return (
      <Text color={colors.text} mx={20}>
        Khung giờ hiện tại nằm ngoài làm việc của chúng tôi, vui lòng quay lại
        sau
      </Text>
    )
  }

  const handleTimeSelection = (time: string): void => {
    setSelectedTime(time)
    if (!isNil(props.toSetSelectedTime) && !isNil(time)) {
      props.toSetSelectedTime(time)
    }
    const [hour, minute] = time.split(':')
    setSelectedHour(hour)
    setSelectedMinute(minute)
  }

  const renderItem: ListRenderItem<string> = ({ item: time }) => (
    <Button
      size="$4"
      backgroundColor={
        selectedTime === time
          ? colors.bookingDetailsBackgroundCard
          : colors.lightGray
      }
      borderColor={
        selectedTime === time ? colors.blueSapphire : colors.placeholderColor
      }
      borderRadius={50}
      onPress={() => {
        handleTimeSelection(time)
      }}
      paddingHorizontal="$4"
      marginHorizontal="$2"
      color={colors.blueSapphire}>
      {time}
    </Button>
  )

  return (
    <Stack space="$4" padding={16}>
      <Text fontFamily={fonts.JetBrainsMonoBold} color={colors.text}>
        {t('specialist.time')}
      </Text>
      <FlatList
        data={times}
        keyExtractor={(item) => item}
        horizontal
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
      />
    </Stack>
  )
}

export default TimePicker
