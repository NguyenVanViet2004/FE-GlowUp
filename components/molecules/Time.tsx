
import dayjs from 'dayjs'
import { useState } from 'react'
import { FlatList, type ListRenderItem } from 'react-native'
import { useColorScheme } from 'react-native'
import { Button, Stack, Text } from 'tamagui'

import getColors from '~/constants/Colors'
import { useAppFonts } from '~/hooks/useAppFonts'
import useTranslation from '~/hooks/useTranslation'
const TimePicker: React.FC = () => {
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedHour, setSelectedHour] = useState<string | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedMinute, setSelectedMinute] = useState<string | null>(null)
  const { fonts } = useAppFonts()
  const { t } = useTranslation()
  const colors = getColors(useColorScheme())
  // Hàm tạo danh sách giờ từ 07:30 AM đến 10:30 PM với phút là 00 và 30
  const generateTimes = (): string[] => {
    const times: string[] = []
    for (let hour = 7; hour < 23; hour++) { // Từ 7h đến 22h
      if (hour === 7) {
        times.push(dayjs().hour(7).minute(30).format('hh:mm A')) // Bắt đầu từ 07:30
      } else if (hour === 22) {
        times.push(dayjs().hour(22).minute(0).format('hh:mm A')) // Dừng ở 22:30
        times.push(dayjs().hour(22).minute(30).format('hh:mm A'))
      } else {
        times.push(dayjs().hour(hour).minute(0).format('hh:mm A'))
        times.push(dayjs().hour(hour).minute(30).format('hh:mm A'))
      }
    }
    return times
  }

  const times = generateTimes()

  const handleTimeSelection = (time: string): void => {
    setSelectedTime(time)
    const [hour, minute] = time.split(':')
    setSelectedHour(hour)
    setSelectedMinute(minute)
  }

  const renderItem: ListRenderItem<string> = ({ item: time }) => (
    <Button
      size="$4"
      backgroundColor={selectedTime === time
        ? colors.bookingDetailsBackgroundCard
        : colors.lightGray}
      borderColor={selectedTime === time
        ? colors.blueSapphire
        : colors.placeholderColor}
      borderRadius={50}
      onPress={() => { handleTimeSelection(time) }}
      paddingHorizontal="$4"
      marginHorizontal="$2"
      color={colors.blueSapphire}
    >
      {time}
    </Button>
  )

  return (
    <Stack space="$4" padding={16}>
      <Text fontFamily={fonts.JetBrainsMonoBold} >{t('specialist.time')}</Text>
      <FlatList
        data={times}
        keyExtractor={(item) => item}
        horizontal
        renderItem={renderItem}
        showsHorizontalScrollIndicator= {false}
      />
    </Stack>
  )
}

export default TimePicker
