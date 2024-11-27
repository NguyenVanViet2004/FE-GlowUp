import Ionicons from '@expo/vector-icons/Ionicons'
import { useRouter } from 'expo-router'
import { isNil } from 'lodash'
import React, { useEffect, useState } from 'react'
import { Linking } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Text, View } from 'tamagui'

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

  const [selectedPaymentMethod,
    setSelectedPaymentMethod] = useState<string | null>(null)
  const [paymentUrl, setPaymentUrl] = useState<any | null>(null)

  const handleMethodChange = (method: string | null): void => {
    setSelectedPaymentMethod(method)
  }

  useEffect(() => {
    console.log('LINK: ', paymentUrl)
  }, [])
  const handleSubmitPress = async (): Promise<void> => {
    try {
      const response = await request.post('payment/create_payment_url', {
        bankCode: selectedPaymentMethod,
        bookingId: '67447db1fc88629cb45d423a',
        orderDescription: 'NaptienchothuebaoSotien100000VND'
      })
      const paymentUrl = response?.paymentUrl
      if (paymentUrl !== null) {
        setPaymentUrl(paymentUrl)
      } else {
        console.error('Payment URL is not available')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleOpenPaymentUrl = (): void => {
    if (!isNil(paymentUrl)) {
      Linking.openURL(paymentUrl as string).catch((e) => { console.log(e) })
    }
  }

  return (
    <View flex={1} paddingBottom={70}>
      <Header
        title="Select payment method"
        backIcon={<Ionicons
          name="chevron-back"
          size={24}
          color="black"
          onPress={back} />}
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

      {paymentUrl !== null && (
        <View marginTop={20} paddingHorizontal={20}>
          <Text
            marginBottom={20}
            textAlign="center"
            fontSize={16}
            textDecorationLine="underline"
            onPress={handleOpenPaymentUrl}
          >
            Click here to pay
          </Text>
        </View>
      )}
    </View>
  )
}

export default SelectPaymentTemplate
