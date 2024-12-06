import { ChevronLeft, ChevronRight, Download } from '@tamagui/lucide-icons'
import * as MediaLibrary from 'expo-media-library'
import { useLocalSearchParams } from 'expo-router'
import { useExpoRouter } from 'expo-router/build/global-state/router-store'
import { isNil } from 'lodash'
import React, { useEffect, useRef, useState } from 'react'
import { Alert } from 'react-native'
import QRCode from 'react-native-qrcode-svg'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { captureRef } from 'react-native-view-shot'
import { Card, View } from 'tamagui'

import { PositiveButton } from '~/components/atoms/PositiveButton'
import BookingInfoSection from '~/components/molecules/Checkout/BookingInfoSection'
import PaymentMethodSection from '~/components/molecules/Checkout/PaymentMethodSection'
import ServiceInfoSection from '~/components/molecules/Checkout/ServiceInfoSection'
import GradientScrollContainer from '~/components/molecules/container/GradientScrollContainer'
import getColors from '~/constants/Colors'
import { useAppFonts } from '~/hooks/useAppFonts'
import { useColorScheme } from '~/hooks/useColorScheme'
import useTranslation from '~/hooks/useTranslation'
import { Status } from '~/interfaces/enum/Status'
import { extractTimeWithPeriod, formatDateToLongForm } from '~/utils/formatDateToLongForm'

const CheckoutTemplate = (): React.ReactElement => {
  const fonts = useAppFonts()
  const insets = useSafeAreaInsets()
  const colors = getColors(useColorScheme().colorScheme)
  const router = useExpoRouter()
  const leftIcon =
    <ChevronLeft
      color={colors.text}
      size={25} onPress={() => router.goBack()} />
  const rightIcon = <ChevronRight size={25} opacity={0} />
  const { t } = useTranslation()
  const [isLocked, setIsLocked] = useState<boolean>(false)
  const data = useLocalSearchParams()
  const boking = typeof data.bookingData === 'string'
    ? JSON.parse(data.bookingData)
    : null

  const bookingExample = !isNil(boking[0])
    ? boking[0]
    : []

  const bookingData = [
    {
      flex: 2,
      label: t('booking.date'),
      value: formatDateToLongForm(boking[0].start_time as string),
      valueProps: {
        color: colors.blueSapphire,
        fontFamily: fonts.fonts.JetBrainsMonoBold
      }
    },
    {
      flex: undefined,
      label: t('booking.startTime'),
      value: extractTimeWithPeriod(boking[0].start_time as string),
      valueProps: {
        color: colors.blueSapphire,
        fontFamily: fonts.fonts.JetBrainsMonoBold
      }
    },
    {
      flex: 2,
      label: t('booking.speciaList'),
      value: boking[0].stylist.full_name,
      valueProps: {
        color: colors.blueSapphire,
        fontFamily: fonts.fonts.JetBrainsMonoBold
      }
    },
    {
      flex: undefined,
      label: t('booking.duration'),
      value: boking[0].total_time + ' giờ',
      valueProps: {
        color: colors.blueSapphire,
        fontFamily: fonts.fonts.JetBrainsMonoBold
      }
    }
  ]

  useEffect(() => {
    if (boking[0].status === Status.COMPLETED || boking[0].status === Status.CANCELLED || boking[0].payment_status === Status.PAID) {
      setIsLocked(true)
    }
  }, [])

  const { renderPaymentMethods, selectedMethodID } = PaymentMethodSection({ isLocked })

  const qrData = JSON.stringify(bookingExample.id)
  const qrCodeRef = useRef(null)
  const handleDownloadQR = async () => {
    try {
      // Yêu cầu quyền truy cập thư viện
      const { status } = await MediaLibrary.requestPermissionsAsync()
      if (status !== 'granted') {
        Alert.alert('Lỗi', 'Vui lòng cấp quyền truy cập thư viện!')
        return
      }

      // Chụp QR Code và lưu vào thư viện
      const uri = await captureRef(qrCodeRef, {
        format: 'png',
        quality: 1
      })

      await MediaLibrary.saveToLibraryAsync(uri)
      Alert.alert('Thành công', 'QR Code đã được lưu vào thư viện ảnh!')
    } catch (error) {
      console.error('Lỗi khi tải QR Code:', error)
      Alert.alert('Lỗi', 'Không thể tải QR Code, vui lòng thử lại.')
    }
  }

  const handleSubmitPress = (): void => {
    console.log(selectedMethodID)
  }

  const isPendingBooking = (boking: unknown): boking is Array<
  { payment_status: Status.PENDING }> => {
    return (
      Array.isArray(boking) &&
      boking.length > 0 &&
      boking[0]?.status === Status.PENDING &&
      boking[0]?.payment_status === Status.PENDING
    )
  }

  const renderButtonCheckout = (): JSX.Element | null => {
    if (boking !== null && boking !== undefined && isPendingBooking(boking)) {
      return (
        <PositiveButton
          title={t('booking.checkout')}
          marginHorizontal={20}
          position="absolute"
          left={0}
          right={0}
          bottom={insets.bottom === 0 ? 20 : insets.bottom}
          onPress={handleSubmitPress}
        />
      )
    }
    return null
  }

  return (
    <>
      <GradientScrollContainer
        paddingHorizontal={0}
        edges={['left', 'right', 'bottom']}
        headerTitle={
          boking[0].payment_status === Status.PAID
            ? 'Phiếu đặt'
            : t('booking.bookingCheckout')
        }
        isHeaderCenter={true}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        paddingTop={20}>

        <Card
          flex={1}
          borderRadius={15}
          paddingVertical={30}
          paddingHorizontal="8%"
          marginHorizontal={20}
          backgroundColor={colors.bookingDetailsBackgroundCard} >
          <BookingInfoSection data={bookingData} />
          {
            renderPaymentMethods()
          }
          <View gap={5} justifyContent="center" alignItems="center" mt={10}>
            <View ref={qrCodeRef} backgroundColor={colors.white} padding={10} borderRadius={10}>
              <QRCode
                value={qrData} // Giá trị QR Code (phải là chuỗi)
                size={130} // Kích thước QR Code
                backgroundColor={colors.white}
                color={colors.blueSapphire}
                logo={require('../../assets/images/logoApp.png')}
              />
            </View>
            <Download size={25} color={colors.blueSapphire} onPress={(handleDownloadQR)}/>
          </View>
          <ServiceInfoSection booking={bookingExample} />

        </Card>
      </GradientScrollContainer>

      {renderButtonCheckout()}
    </>
  )
}

export default CheckoutTemplate
