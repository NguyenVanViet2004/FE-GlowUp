import { ChevronLeft } from '@tamagui/lucide-icons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'

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
  const { colorScheme } = useColorScheme()

  const colors = getColors(colorScheme)
  const { t } = useTranslation()

  const { bookingInfo } = useLocalSearchParams()
  const parseBooking = Array.isArray(bookingInfo)
    ? JSON.parse(bookingInfo[0])
    : JSON.parse(bookingInfo)

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
  string | null
  >(null)
  const leftIcon = (
    <ChevronLeft
      color={colors.text}
      size={25}
      onPress={() => {
        router.back()
      }}
    />
  )

  const handleMethodChange = (method: string | null): void => {
    setSelectedPaymentMethod(method)
    console.log('selectedPaymentMethod', selectedPaymentMethod)
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
        Toast.show({
          position: 'top',
          text1: 'Thất bại',
          text2: 'Không thể lấy được URL thanh toán. Vui lòng thử lại sau.',
          type: 'error'
        })
      }
    } catch (error) {
      console.error('Error:', error)
      Toast.show({
        position: 'top',
        text1: 'Lỗi kết nối',
        text2: 'Có sự cố với kết nối mạng. Vui lòng kiểm tra và thử lại.',
        type: 'error'
      })
    }
  }

  return (
    <>
      <GradientScrollContainer
        // positionT={true}
        isHeaderCenter
        headerTitle={t('selectPaymentMethod.selectPaymentMethod')}
        leftIcon={leftIcon}>
        {/* <View flex={1}> */}
        <PaymentMethodList onMethodChange={handleMethodChange} />
        {/* </View> */}
      </GradientScrollContainer>
      <PositiveButton
        title={t('selectPaymentMethod.payNow')}
        marginHorizontal={20}
        position="absolute"
        left={0}
        right={0}
        bottom={insets.bottom === 0 ? 20 : insets.bottom}
        onPress={async () => {
          await handleSubmitPress().catch((e) => {
            console.error(e)
          })
        }
        }
      />
    </>
  )
}

export default SelectPaymentTemplate
