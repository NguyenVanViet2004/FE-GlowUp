import React, { useMemo, useState } from 'react'
import { FlatList, TouchableOpacity } from 'react-native'
import { Separator, Text, View, YStack } from 'tamagui'

import BookingCancelled from '~/components/molecules/BookingCancelled'
import BookingCompleted from '~/components/molecules/BookingCompleted'
import BookingUpcoming from '~/components/molecules/BookingUpcoming'
import getColors from '~/constants/Colors'
import { useColorScheme } from '~/hooks/useColorScheme'
import useTranslation from '~/hooks/useTranslation'
import type MenuTab from '~/interfaces/MenuTab'

const BookingMenuTabList = (): React.ReactElement => {
  const colors = getColors(useColorScheme().colorScheme)
  const { t } = useTranslation()

  const menuTabs = useMemo<MenuTab[]>(
    () => [
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
                    <Separator borderColor={colors.blueSapphire} />)
                  : null}
              </YStack>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <View>
        {menuTabs[tabIndexActive].name === t('screens.booking.upcoming')
          ? (
            <View height={'93%'}>
              <BookingUpcoming />
            </View>
          )
          : menuTabs[tabIndexActive].name === t('screens.booking.completed')
            ? (
              <View height={'93%'}>
                <BookingCompleted />
              </View>
            )
            : menuTabs[tabIndexActive].name === t('screens.booking.cancelled')
              ? (
                <View height={'93%'}>
                  <BookingCancelled />
                </View>
              )
              : null}
      </View>
    </YStack>
  )
}

export default BookingMenuTabList
