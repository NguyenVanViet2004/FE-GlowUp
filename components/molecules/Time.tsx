import dayjs from 'dayjs'
import { useState } from 'react'
import { FlatList, type ListRenderItem } from 'react-native'
import { Button, Stack, Text } from 'tamagui'

const TimePicker: React.FC = () => {
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [selectedHour, setSelectedHour] = useState<string | null>(null)
  const [selectedMinute, setSelectedMinute] = useState<string | null>(null)

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
      backgroundColor={selectedTime === time ? '#E1F5FA' : 'transparent'}
      borderColor={selectedTime === time ? '#156778' : '#ADB3BC'}
      borderWidth={2}
      borderRadius={50} // Rounded edges to mimic the pill shape
      onPress={() => { handleTimeSelection(time) }} // Cập nhật thời gian đã chọn
      paddingHorizontal="$4"
      marginHorizontal="$2"
      color={'#156778'}
    >
      {time}
    </Button>
  )

  return (
    <Stack space="$4" alignItems="center">
      <Text fontWeight="bold">Time</Text>
      <FlatList
        data={times}
        keyExtractor={(item) => item}
        horizontal
        renderItem={renderItem}
      />
      <Text>Selected Time: {selectedTime}</Text>
      <Text>Hour: {selectedHour}</Text>
      <Text>Minute: {selectedMinute}</Text>
    </Stack>
  )
}

export default TimePicker
