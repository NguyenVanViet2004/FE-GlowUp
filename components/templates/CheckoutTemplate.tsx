import { ChevronLeft, ChevronRight, Download } from '@tamagui/lucide-icons'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import * as MediaLibrary from 'expo-media-library'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { isEmpty, isNil } from 'lodash'
import React, { useEffect, useRef, useState } from 'react'
import QRCode from 'react-native-qrcode-svg'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'
import { captureRef } from 'react-native-view-shot'
import { useSelector } from 'react-redux'
import { Card, Text, View } from 'tamagui'

import { request } from '~/apis/HttpClient'
import { PositiveButton } from '~/components/atoms/PositiveButton'
import BookingInfoSection from '~/components/molecules/Checkout/BookingInfoSection'
import PaymentMethodSection from '~/components/molecules/Checkout/PaymentMethodSection'
import ServiceInfoSection from '~/components/molecules/Checkout/ServiceInfoSection'
import GradientScrollContainer from '~/components/molecules/container/GradientScrollContainer'
import getColors from '~/constants/Colors'
import { useAppFonts } from '~/hooks/useAppFonts'
import { useColorScheme } from '~/hooks/useColorScheme'
import useStorage from '~/hooks/useStorage'
import useTranslation from '~/hooks/useTranslation'
import { PaymentMethod } from '~/interfaces/enum/Payment'
import { Status } from '~/interfaces/enum/Status'
import { type RootState } from '~/redux/store'
import {
  formatDateToLongForm
} from '~/utils/formatDateToLongForm'

const CheckoutTemplate = (): React.ReactElement => {
  const fonts = useAppFonts()
  const insets = useSafeAreaInsets()
  const colors = getColors(useColorScheme().colorScheme)
  const router = useRouter()
  const [selectMethod, setSelectMethod] = useState<string | undefined>('')

  dayjs.extend(utc)
  dayjs.extend(timezone)

  const extractTimeWithPeriod = (startTime: string): string => {
    const date = new Date(startTime)
    const hours = date.getUTCHours()
    const minutes = date.getUTCMinutes()

    const period = hours >= 12 ? 'PM' : 'AM'
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes

    return `${formattedHours}:${formattedMinutes} ${period}`
  }

  const leftIcon = (
    <ChevronLeft
      color={colors.text}
      size={25}
      onPress={() => { router.back() }}
    />
  )
  const rightIcon = <ChevronRight size={25} opacity={0} />
  const { t } = useTranslation()
  const [isLocked, setIsLocked] = useState<boolean>(false)
  const data = useLocalSearchParams()
  const boking =
    typeof data.bookingData === 'string' ? JSON.parse(data.bookingData) : null
  const { getItem, setItem } = useStorage()

  const bookingExample = !isNil(boking[0]) ? boking[0] : []
  const user = useSelector((state: RootState) => state.user)
  const bookTime = bookingExample.start_time
  const validBookTime: string | number | null =
  typeof bookTime === 'string' || typeof bookTime === 'number' ? bookTime : null

  const vietnamTime = dayjs(validBookTime)
    .tz('Asia/Ho_Chi_Minh', true)
    .format('YYYY-MM-DDTHH:mm:ss[Z]')
  useEffect(() => {
    const fetchMethod = async (): Promise<void> => {
      const method = await getItem(`SELECTED_METHOD_${bookingExample.id}`)
      setSelectMethod(method)
    }
    fetchMethod().catch((e) => { console.error(e) })
  }, [])

  const bookingData = [
    {
      flex: 2,
      label: t('booking.date'),
      value: formatDateToLongForm(vietnamTime),
      valueProps: {
        color: colors.blueSapphire,
        fontFamily: fonts.fonts.JetBrainsMonoBold
      }
    },
    {
      flex: undefined,
      label: t('booking.startTime'),
      value: extractTimeWithPeriod(vietnamTime),
      valueProps: {
        color: colors.blueSapphire,
        fontFamily: fonts.fonts.JetBrainsMonoBold
      }
    },
    {
      flex: 2,
      label: t('booking.speciaList'),
      value: boking[0].stylist?.full_name ?? 'Không có nhân viên',
      valueProps: {
        color: colors.blueSapphire,
        fontFamily: fonts.fonts.JetBrainsMonoBold
      }
    },
    {
      flex: undefined,
      label: t('booking.duration'),
      value: boking[0].total_time + ' phút',
      valueProps: {
        color: colors.blueSapphire,
        fontFamily: fonts.fonts.JetBrainsMonoBold
      }
    }
  ]

  useEffect(() => {
    if (
      boking[0].status === Status.COMPLETED ||
      boking[0].status === Status.CANCELLED ||
      boking[0].payment_status === Status.PAID
    ) {
      setIsLocked(true)
    }
  }, [])

  const { renderPaymentMethods, selectedMethodID } = PaymentMethodSection({
    isLocked
  })

  const qrData = JSON.stringify(bookingExample.id)
  const qrCodeRef = useRef(null)
  const handleDownloadQR = async (): Promise<void> => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync()
      if (status !== 'granted') {
        Toast.show({
          position: 'top',
          text1: 'Vui lòng cấp quyền truy cập thư viện ảnh!',
          type: 'error'
        })
        return
      }

      const uri = await captureRef(qrCodeRef, {
        format: 'png',
        quality: 1
      })

      await MediaLibrary.saveToLibraryAsync(uri)
      Toast.show({
        position: 'top',
        text1: 'Đã tải QR Code thành công!',
        type: 'success'
      })
    } catch (error) {
      console.error('Lỗi khi tải QR Code:', error)
      Toast.show({
        position: 'top',
        text1: 'Không thể tải QR Code. Vui lòng thử lại!',
        type: 'error'
      })
    }
  }

  const handleSubmitPress = async (): Promise<void> => {
    if (selectedMethodID === 'cash') {
      await setItem(`SELECTED_METHOD_${bookingExample.id}`, PaymentMethod.CASH)
      router.push({
        params: { bookingInfo: JSON.stringify(bookingExample) },
        pathname: '/checkout/BookingConfirmation'
      })
    } else if (selectedMethodID === 'online') {
      await setItem(`SELECTED_METHOD_${bookingExample.id}`,
        PaymentMethod.ONLINE)
      if (
        isNil(user.result.card_info) ||
        isEmpty(user.result.card_info.cardHolder) ||
        isEmpty(user.result.card_info.cardNumber) ||
        isEmpty(user.result.card_info.expiryDate)
      ) {
        router.push('/cardInfo/CardInfo')
      } else {
        try {
          const response = await request.post('payment/create_payment_url', {
            bankCode: user.result.card_info.bank?.bank_code,
            bookingId: bookingExample.id
          })
          const paymentUrl = response?.paymentUrl
          if (paymentUrl !== null) {
            router.replace({
              params: { url: paymentUrl },
              pathname: '/payment/WebView'
            })
          } else {
            Toast.show({
              text1: 'Đường dẫn không hợp lệ!',
              type: 'error'
            })
          }
        } catch (error) {
          console.error('Error:', error)
          Toast.show({
            text1: 'Đã xảy ra lỗi!',
            text2: 'Vui lòng thử lại!',
            type: 'error'
          })
        }
      }
    } else {
      Toast.show({
        text1: 'Đã xảy ra lỗi!',
        text2: 'Vui lòng thử lại!',
        type: 'error'
      })
    }
  }

  const isPendingBooking = (
    boking: unknown
  ): boking is Array<{ payment_status: Status.PENDING }> => {
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
          onPress={async () => {
            handleSubmitPress().catch((e) => {
              console.error(e)
            })
          }
          }
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
          backgroundColor={colors.bookingDetailsBackgroundCard}>
          <BookingInfoSection data={bookingData} />
          <View>
            {!isNil(selectMethod)
              ? (
                selectMethod === PaymentMethod.ONLINE
                  ? (
                    bookingExample.payment_status === 'PAID'
                      ? (
                        <Text
                          textAlign="center"
                          color={colors.blueSapphire}
                          fontFamily={fonts.fonts.JetBrainsMonoBold}
                          marginBottom={10}
                        >
                          Bạn đã thanh toán. Vui lòng đến đúng giờ.
                        </Text>)
                      : (
                        renderPaymentMethods())
                  )
                  : (
                    <Text
                      textAlign="center"
                      color={colors.blueSapphire}
                      fontFamily={fonts.fonts.JetBrainsMonoBold}
                      marginBottom={10}
                    >
                      Bạn sẽ thanh toán khi thực hiện xong các bước
                      tại salon. Vui lòng đến đúng giờ.
                    </Text>)
                )
              : (
                renderPaymentMethods()
                )}
          </View>

          <View gap={5} justifyContent="center" alignItems="center" mt={10}>
            <View
              ref={qrCodeRef}
              backgroundColor={colors.white}
              padding={10}
              borderRadius={10}>
              <QRCode
                value={qrData}
                size={130}
                backgroundColor={colors.white}
                color={colors.blueSapphire}
                logo={require('../../assets/images/logoApp.png')}
              />
            </View>
            <Download
              size={25}
              color={colors.blueSapphire}
              onPress={() => {
                void handleDownloadQR().catch((e) => {
                  console.error(e)
                })
              }}
            />
          </View>
          <ServiceInfoSection booking={bookingExample} />
        </Card>
      </GradientScrollContainer>

      {
        isNil(selectMethod) ||
        (selectMethod === PaymentMethod.ONLINE &&
          bookingExample.payment_status === 'PENDING')
          ? (renderButtonCheckout())
          : undefined
      }
    </>
  )
}

export default CheckoutTemplate
