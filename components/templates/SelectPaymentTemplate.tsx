import Ionicons from '@expo/vector-icons/Ionicons'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { View } from 'tamagui'

import { request } from '~/apis/HttpClient'
import { PositiveButton } from '~/components/atoms/PositiveButton'
import Header from '~/components/molecules/Header'
import PaymentMethodList from '~/components/organisms/SelectPaymentList'

const SelectPaymentTemplate = (): React.ReactElement => {
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const back = (): void => {
    router.back()
  }

  const [selectedPaymentMethod, setSelectedPaymentMethod] =
  useState<string | null>(null)

  const handleMethodChange = (method: string | null): void => {
    setSelectedPaymentMethod(method)
  }

  const handleSubmitPress = async (): Promise<void> => {
    try {
      const response = await request.post('payment/create_payment_url', {
        bankCode: selectedPaymentMethod,
        bookingId: '674dbb821c74684ba5d3d1d6'
      })
      const paymentUrl = response?.paymentUrl
      if (paymentUrl !== null) {
        router.push({
          params: { url: paymentUrl },
          pathname: '/payment/WebView'
        })
      } else {
        console.error('Payment URL is not available')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <View flex={1} paddingBottom={70}>
      <Header
        title="Select payment method"
        backIcon={
          <Ionicons
            name="chevron-back"
            size={24}
            color="black"
            onPress={back}
          />
        }
      />
      <PaymentMethodList onMethodChange={handleMethodChange} />
      <PositiveButton
        title="Pay Now"
        marginHorizontal={20}
        position="absolute"
        left={0}
        right={0}
        bottom={insets.bottom === 0 ? 20 : insets.bottom}
        onPress={handleSubmitPress}
      />
    </View>
  )
}

export default SelectPaymentTemplate
