import { ChevronLeft, ChevronRight } from '@tamagui/lucide-icons'
import { useLocalSearchParams } from 'expo-router'
import { useExpoRouter } from 'expo-router/build/global-state/router-store'
import { isNil } from 'lodash'
import React, { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Card, Text, XStack } from 'tamagui'

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
  const [isLocked, setIsLocked] = useState<boolean>(false);
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
    if (boking[0].status === Status.COMPLETED || boking[0].status === Status.CANCELLED || boking[0].payment_status === Status.PAID ) {
      setIsLocked(true)
    }

  }, []);


  const { renderPaymentMethods, selectedMethodID } = PaymentMethodSection({ isLocked: isLocked })



  const handleSubmitPress = (): void => {
    console.log(selectedMethodID)
  }

  const isPendingBooking = (boking: unknown): boking is Array<
  { payment_status: Status.PENDING }> => {
    return (
      Array.isArray(boking) &&
      boking.length > 0 &&
      boking[0]?.status === Status.PENDING
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

  // const renderStautsPayment = (): JSX.Element => {
  //   return <XStack>
  //     <Text
  //       color={colors.text}
  //       fontFamily={fonts.fonts.JetBrainsMonoBold}
  //       fontSize={14}>Trạng Thái: </Text>
  //     <Text
  //       color={colors.text}
  //       fontSize={14}>đã thanh toán</Text>
  //   </XStack>
  // }


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
            // boking[0].payment_status === Status.PAID
            //   ? renderStautsPayment()
              // : 
              renderPaymentMethods()
          }
          <ServiceInfoSection booking={bookingExample} />
        </Card>
      </GradientScrollContainer>

      {renderButtonCheckout()}
    </>
  )
}

export default CheckoutTemplate
