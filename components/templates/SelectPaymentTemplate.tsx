import Ionicons from '@expo/vector-icons/Ionicons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Alert } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { View } from 'tamagui'

import { request } from '~/apis/HttpClient'
import { PositiveButton } from '~/components/atoms/PositiveButton'
import PaymentMethodList from '~/components/organisms/SelectPaymentList'
import getColors from '~/constants/Colors'
import { useColorScheme } from '~/hooks/useColorScheme'
import useTranslation from '~/hooks/useTranslation'

import GradientScrollContainer from '../molecules/container/GradientScrollContainer'

const SelectPaymentTemplate = (): React.ReactElement => {
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const back = (): void => {
    router.back()
  }
  const { colorScheme } = useColorScheme()

  const colors = getColors(colorScheme)
  const { t } = useTranslation()

  const { bookingInfo } = useLocalSearchParams()
  const parseBooking = Array.isArray(bookingInfo)
    ? JSON.parse(bookingInfo[0])
    : JSON.parse(bookingInfo)

  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string | null>(null)

  const handleMethodChange = (method: string | null): void => {
    setSelectedPaymentMethod(method)
  }

  const handleSubmitPress = async (): Promise<void> => {
    try {
      const response = await request.post('payment/create_payment_url', {
        bankCode: selectedPaymentMethod,
        bookingId: parseBooking.id
      })
      const paymentUrl = response?.paymentUrl
      if (paymentUrl !== null) {
        router.push({
          params: { url: paymentUrl },
          pathname: '/payment/WebView'
        })
      } else {
        console.error('Payment URL is not available')
        Alert.alert(
          t('error.error'),
          t('error.paymentUrlError'),
          [{ text: 'OK' }]
        )
      }
    } catch (error) {
      console.error('Error:', error)
      Alert.alert(
        t('error.connectionError'),
        t('error.networkIssue'),
        [{ text: 'OK' }]
      )
    }
  }

  return (
    <GradientScrollContainer
      position={true}
      headerTitle={t('selectPaymentMethod.selectPaymentMethod')}
      leftIcon={<View position="absolute" left={20}>
        <Ionicons
          name="chevron-back"
          size={24}
          color={colors.text}
          onPress={back}
        />
      </View>}>

      <View flex={1}>
        <PaymentMethodList onMethodChange={handleMethodChange} />
        <PositiveButton
          title={t('selectPaymentMethod.payNow')}
          marginHorizontal={20}
          position="absolute"
          left={0}
          right={0}
          bottom={insets.bottom === 0 ? 20 : insets.bottom}
          onPress={handleSubmitPress}
        />
      </View>
    </GradientScrollContainer>
  )
}

export default SelectPaymentTemplate
