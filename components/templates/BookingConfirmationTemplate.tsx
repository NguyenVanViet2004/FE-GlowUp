import { useLocalSearchParams, useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet, useColorScheme } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text, XStack, YStack, Image } from 'tamagui'

import getColors from '~/constants/Colors'
import useTranslation from '~/hooks/useTranslation'

import { PositiveButton } from '../atoms/PositiveButton'
import Header from '../molecules/Header'

const BookingConfirmationTemplate = (): React.ReactElement => {
  const { t } = useTranslation()
  const router = useRouter()
  const colors = getColors(useColorScheme())

  const { bookingInfo } = useLocalSearchParams()
  const parseBooking = JSON.parse(bookingInfo)
  console.log(parseBooking)
  const bookingData = {
    bookingTime: new Date(parseBooking.start_time).toLocaleString(),
    customerName: parseBooking.customer.full_name ?? 'N/A',
    services: parseBooking.combo.services
      ?.map(service => service.name).join(', ') ?? 'N/A',
    stylist: parseBooking.stylist?.full_name ?? 'N/A',
    totalPrice: parseBooking.total_price ?? 0
  }

  const handleGoBack = (): void => {
    router.push('/home')
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title={t('booking.confirmationTitle')} />
      {parseBooking.picture !== null && (
        <Image
          src={parseBooking.picture}
          width="100%"
          height={200}
          borderRadius={10}
          resizeMode="cover"
          mb={20}
        />
      )}
      <YStack f={1} justifyContent="center" width="100%" px={20}>
        <YStack mb={20}>
          <XStack mb={5}>
            <Text fontSize={16} color={colors.text}>
              {t('booking.customerName')}: {bookingData.customerName}
            </Text>
          </XStack>
          <XStack mb={5}>
            <Text fontSize={16} color={colors.text}>
              {t('booking.time')}: {bookingData.bookingTime}
            </Text>
          </XStack>
          <XStack mb={5}>
            <Text fontSize={16} color={colors.text}>
              {t('booking.speciaList')}: {bookingData.stylist}
            </Text>
          </XStack>
          <XStack mb={5}>
            <Text fontSize={16} color={colors.text}>
              {t('booking.service')}: {bookingData.services}
            </Text>
          </XStack>
          <XStack mb={5}>
            <Text fontSize={16} color={colors.text}>
              {t('booking.total')}: ${bookingData.totalPrice}
            </Text>
          </XStack>
        </YStack>

        <PositiveButton title={t('booking.goBack')} onPress={handleGoBack} />
      </YStack>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default BookingConfirmationTemplate
