import { isEmpty, isNil } from 'lodash'
import React from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { Image, Text, View, XStack, YStack } from 'tamagui'

import { PositiveButton } from '~/components/atoms/PositiveButton'
import TransparentButton from '~/components/atoms/TransparentButton'
import getColors from '~/constants/Colors'
import { HEIGHT_BUTTON } from '~/constants/Constants'
import { useAppFonts } from '~/hooks/useAppFonts'
import { useColorScheme } from '~/hooks/useColorScheme'
import formatDate from '~/hooks/useDate'
import useTranslation from '~/hooks/useTranslation'
import type Appointment from '~/interfaces/Appointment'

interface Props {
  visibleTextCancel?: boolean
  visibleTransparentButton?: boolean
  visibleFormButton?: boolean
  cancellPress?: (id: string) => void
  dataCombo: Appointment[]
  viewBookingPress?: (id: string) => void
}

const RenderBookingItem = ({
  item,
  visibleTextCancel,
  visibleTransparentButton,
  visibleFormButton,
  cancellPress,
  viewBookingPress
}: { item: Appointment } & Props): React.ReactElement => {
  const { fonts } = useAppFonts()
  const colors = getColors(useColorScheme().colorScheme)
  const { t } = useTranslation()
  const dataCombo: any = item.combo

  return (
    <View
      backgroundColor={colors.deepNeutral}
      padding={10}
      borderRadius={10}
      marginBottom={10}
      justifyContent="center">
      <YStack gap={10}>
        <XStack justifyContent="space-between">
          <Text color={colors.text}>{formatDate(item.createdAt)}</Text>
          <Text
            display={
              !isNil(visibleTextCancel) && visibleTextCancel ? 'flex' : 'none'
            }
            fontSize={12}
            color={'red'}>
            {t('screens.booking.cancelled')}
          </Text>
        </XStack>
        <XStack gap={10} alignItems="center">
          <Image
            width={90}
            height={90}
            borderRadius={10}
            source={
              !isEmpty(dataCombo.picture)
                ? { uri: dataCombo.picture }
                : require('../../assets/images/backGroundDetail.png')
            }
          />
          <YStack gap={10}>
            <Text color={colors.text} fontFamily={fonts.JetBrainsMonoBold}>
              Dịch vụ: {dataCombo.name}
            </Text>
            <Text color={colors.text}>
              Thành tiền: {item.total_price.toLocaleString('vi-VN', {
                currency: 'VND',
                style: 'currency'
              })}
            </Text>
            <Text color={colors.text} fontFamily={fonts.JetBrains}>
              Nhân viên: {item.stylist.full_name}
            </Text>
            {/* <Text>{item.rate}</Text> */}
          </YStack>
        </XStack>
        <XStack
          gap={10}
          display={
            !isNil(visibleFormButton) && visibleFormButton ? 'flex' : 'none'
          }>
          <TransparentButton
            onPress={() => cancellPress?.(item.id)}
            paddingHorizontal={5}
            height={HEIGHT_BUTTON}
            flex={1}
            display={
              !isNil(visibleTransparentButton) && visibleTransparentButton
                ? 'flex'
                : 'none'
            }
            title={t('screens.booking.cancelBooking')}
            colorProps={colors.blueSapphire}
          />

          <PositiveButton
            onPress={() => viewBookingPress?.(item.id)}
            paddingHorizontal={5}
            flex={1}
            title={t('screens.booking.viewReceipt')}
          />
        </XStack>
      </YStack>
    </View>
  )
}

const BookingList = (props: Props): React.ReactElement => {
  return (
    <FlatList
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      data={props.dataCombo}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <RenderBookingItem item={item} {...props} />}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40
  }
})

export default BookingList
