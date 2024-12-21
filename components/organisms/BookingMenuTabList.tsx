import { isNil } from 'lodash'
import React, { useMemo, useState } from 'react'
import { FlatList, TouchableOpacity } from 'react-native'
import { Separator, Text, View, YStack } from 'tamagui'

import BookingCancelled from '~/components/molecules/BookingCancelled'
import BookingCompleted from '~/components/molecules/BookingCompleted'
import BookingUpcoming, {
  type BookingProps
} from '~/components/molecules/BookingUpcoming'
import getColors from '~/constants/Colors'
import { useColorScheme } from '~/hooks/useColorScheme'
import useFetchAppointment from '~/hooks/useFetchAppointment'
import useTranslation from '~/hooks/useTranslation'
import type MenuTab from '~/interfaces/MenuTab'

import BookingUnconfirm from '../molecules/BookingUnconfirm'

const BookingMenuTabList = ({
  appointments,
  isLoading,
  removeLocalAppointment
  // refetch
}: BookingProps): React.ReactElement => {
  const colors = getColors(useColorScheme().colorScheme)
  const { t } = useTranslation()
  // const { appointments, isLoading, removeLocalAppointment, refetch } =
  //   useFetchAppointment()

  const menuTabs = useMemo<MenuTab[]>(
    () => [
      { name: 'Chưa xác nhận' },
      { name: t('screens.booking.upcoming') },
      { name: t('screens.booking.completed') },
      { name: t('screens.booking.cancelled') }
    ],
    [t]
  )

  const [tabIndexActive, setTabIndexActive] = useState<number>(0)

  return (
    <YStack>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={menuTabs}
        renderItem={({ item, index }) => (
          <View marginTop={20}>
            <TouchableOpacity
              onPress={() => {
                setTabIndexActive(index)
              }}>
              <YStack gap={5}>
                <Text
                  paddingHorizontal={10}
                  fontSize={14}
                  color={
                    tabIndexActive === index ? colors.blueSapphire : colors.gray
                  }>
                  {item.name}
                </Text>

                {tabIndexActive === index
                  ? (
                    <Separator borderColor={colors.blueSapphire} />
                  )
                  : null}
              </YStack>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <View height={'93%'}>
        {menuTabs[tabIndexActive].name === 'Chưa xác nhận'
          ? (
            <BookingUnconfirm
              appointments={appointments}
              isLoading={isLoading}
              removeLocalAppointment={removeLocalAppointment}
            />
            )
          : menuTabs[tabIndexActive].name === t('screens.booking.upcoming')
            ? (
              <BookingUpcoming
                appointments={appointments}
                isLoading={isLoading}
                removeLocalAppointment={removeLocalAppointment}
              />
            )
            : menuTabs[tabIndexActive].name === t('screens.booking.completed')
              ? (
                <BookingCompleted appointments={appointments} isLoading={isLoading} />
              )
              : menuTabs[tabIndexActive].name === t('screens.booking.cancelled')
                ? (
                  <BookingCancelled appointments={appointments} isLoading={isLoading} />
                )
                : null}
      </View>
    </YStack>
  )
}

export default BookingMenuTabList
