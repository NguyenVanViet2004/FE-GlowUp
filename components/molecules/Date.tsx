import AntDesign from '@expo/vector-icons/AntDesign'
import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { Button, Text, XStack, YStack } from 'tamagui'


import { useAppFonts } from '~/hooks/useAppFonts'
import useTranslation from '~/hooks/useTranslation'
import getColors from '~/constants/Colors'


const DateComponent: React.FC = () => {
  const currentDate = new Date()
  const [month, setMonth] = useState<number>(currentDate.getMonth() + 1)
  const [year, setYear] = useState<number>(currentDate.getFullYear())
  const [days, setDays] = useState<Array<{ day: string, dayOfWeek: string }>>([])
  const [selectedDay, setSelectedDay] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const { fonts } = useAppFonts()
  const colors = getColors(useColorScheme())
  const { t, i18n } = useTranslation()
  const language = i18n.language

  const dayNames = [
    t('days.sunday'),
    t('days.monday'),
    t('days.tuesday'),
    t('days.wednesday'),
    t('days.thursday'),
    t('days.friday'),
    t('days.saturday')
  ]

  const getAllDaysInMonth = (month: number, year: number): Array<{ day: string, dayOfWeek: string }> => {
    if (month >= 1 && month <= 12 && year > 0) {
      const lastDay = new Date(year, month, 0).getDate()
      const daysArray = []

      for (let day = 1; day <= lastDay; day++) {
        const dateObj = new Date(year, month - 1, day)
        const dayOfWeek = dayNames[dateObj.getDay()]
        const formattedDay = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
        daysArray.push({ day: formattedDay, dayOfWeek })
      }
      return daysArray
    }
    return []
  }

  const fetchDataForDays = async (month: number, year: number): Promise<void> => {
    setLoading(true)
    const daysList = getAllDaysInMonth(month, year)

    try {
      const fetchedData = await new Promise<Array<{ day: string, dayOfWeek: string }>>((resolve) => {
        setTimeout(() => {
          resolve(daysList)
        }, 1000)
      })

      setDays(fetchedData)
    } catch (error) {
      console.error('Error fetching days:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void fetchDataForDays(month, year)
  }, [month, year])

  const handleMonthChange = (direction: 'prev' | 'next'): void => {
    let newMonth = month
    let newYear = year

    if (direction === 'prev') {
      if (newMonth === 1) {
        newMonth = 12
        newYear -= 1
      } else {
        newMonth -= 1
      }
    } else {
      if (newMonth === 12) {
        newMonth = 1
        newYear += 1
      } else {
        newMonth += 1
      }
    }

    setMonth(newMonth)
    setYear(newYear)
  }

  const handleDayPress = (day: string): void => {
    setSelectedDay(day === selectedDay ? null : day)
  }

  const formatSelectedDay = (day: string | null): string => {
    if (day === null || day === '') {
      return 'No day selected.'
    }

    const [year, month, dayNumber] = day.split('-')
    const dateObj = new Date(Number(year), Number(month) - 1, Number(dayNumber))
    const dayOfWeek = dayNames[dateObj.getDay()]

    return `${dayOfWeek}, ${dayNumber}/${month}/${year}`
  }

  return (
    <YStack padding={16}>
      <Text>date</Text>
      <XStack
        justifyContent="space-between"
        alignItems="center"
        marginTop="5%">
        <TouchableOpacity
          onPress={() => { handleMonthChange('prev') }}
          style={styles.leftAlign}>
          <AntDesign name="left" size={18} color="black" />
        </TouchableOpacity>

        <Text
          paddingHorizontal={16}
          fontSize={18}
          fontFamily={fonts.JetBrainsMonoBold}
        >
          {new Intl.DateTimeFormat(language, { month: 'long', year: 'numeric' })
            .format(
              new Date(year, month - 1))}
        </Text>

        <TouchableOpacity
          onPress={() => { handleMonthChange('next') }}
          style={styles.rightAlign}>
          <AntDesign name="right" size={18} color="black" />
        </TouchableOpacity>
      </XStack>

      {loading
        ? (<Text>Loading...</Text>)
        : (
          <FlatList
          data={days}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          renderItem={({ item }) => {
            const dayNumber = item.day.split('-')[2]
            const isSelected = selectedDay === item.day
            return (
              <Button
                onPress={() => { handleDayPress(item.day) }}
                margin={5}
                padding={10}
                borderRadius={50}
                backgroundColor={isSelected ? '#007B83' : colors.lightGray}
                width={55}
                height={77}
                alignItems="center"
                justifyContent="center"
              >
                <YStack>
                  <Text fontSize={10} textAlign="center" color={isSelected ? '#FFFFFF' : colors.textDate}>
                    {item.dayOfWeek.slice(0, 8)}
                  </Text>
                  <Text textAlign="center"
                    fontFamily={fonts.JetBrainsMonoBold}
                    marginTop={5}
                    color={isSelected ? '#FFFFFF' : colors.textDate}>
                    {dayNumber}
                  </Text>
                </YStack>
              </Button>
            )
          }}
        />
        
        )}

      
      <Text>{formatSelectedDay(selectedDay)}</Text>
    </YStack>
  )
}

const styles = StyleSheet.create({
  leftAlign: {
    alignItems: 'flex-start',
    flex: 1
  },
  rightAlign: {
    alignItems: 'flex-end',
    flex: 1
  }
})

export default DateComponent
