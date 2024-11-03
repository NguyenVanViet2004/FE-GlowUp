import { ChevronLeft, ChevronRight } from '@tamagui/lucide-icons'
import { useExpoRouter } from 'expo-router/build/global-state/router-store'
import React from 'react'
import { useColorScheme } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Card } from 'tamagui'

import { PositiveButton } from '~/components/atoms/PositiveButton'
import BookingInfoSection from '~/components/molecules/Checkout/BookingInfoSection'
import PaymentMethodSection from '~/components/molecules/Checkout/PaymentMethodSection'
import ServiceInfoSection from '~/components/molecules/Checkout/ServiceInfoSection'
import GradientScrollContainer from '~/components/molecules/container/GradientScrollContainer'
import getColors from '~/constants/Colors'
import { useAppFonts } from '~/hooks/useAppFonts'
import useTranslation from '~/hooks/useTranslation'
import type Combo from '~/interfaces/Combo'
import type Step from '~/interfaces/Step'
import type Voucher from '~/interfaces/voucher'

const CheckoutTemplate = (): React.ReactElement => {
  const fonts = useAppFonts()
  const colors = getColors(useColorScheme())
  const router = useExpoRouter()
  const leftIcon = <ChevronLeft size={25} onPress={() => router.goBack()}/>
  const rightIcon = <ChevronRight size={25} opacity={0} />
  const { t } = useTranslation()

  const bookingData = [
    {
      flex: 2,
      label: t('booking.date'),
      value: 'March, 10th 2021',
      valueProps: {
        color: colors.blueSapphire,
        fontFamily: fonts.fonts.JetBrainsMonoBold
      }
    },
    {
      flex: undefined,
      label: t('booking.startTime'),
      value: '10:00 AM',
      valueProps: {
        color: colors.blueSapphire,
        fontFamily: fonts.fonts.JetBrainsMonoBold
      }
    },
    {
      flex: 2,
      label: t('booking.speciaList'),
      value: 'Random',
      valueProps: {
        color: colors.blueSapphire,
        fontFamily: fonts.fonts.JetBrainsMonoBold
      }
    },
    {
      flex: undefined,
      label: t('booking.duration'),
      value: '5 hours',
      valueProps: {
        color: colors.blueSapphire,
        fontFamily: fonts.fonts.JetBrainsMonoBold
      }
    }
  ]
  const { renderPaymentMethods, selectedMethodID } = PaymentMethodSection()
  const insets = useSafeAreaInsets()

  const steps: Step[] = [
    {
      _id: '1',
      description:
        'Discuss your desired look and style with our expert stylist.',
      duration: '15 minutes',
      imageUrl: 'https://example.com/images/consultation.jpg',
      name: 'Consultation',
      price: 10
    },
    {
      _id: '2',
      description: 'A relaxing wash with a hydrating shampoo and conditioner.',
      duration: '10 minutes',
      imageUrl: 'https://example.com/images/hair_washing.jpg',
      name: 'Hair Washing',
      price: 10
    },
    {
      _id: '3',
      description:
        'Precision cutting tailored to your face shape and style preferences.',
      duration: '10 minutes',
      imageUrl: 'https://example.com/images/hair_cutting.jpg',
      name: 'Hair Cutting',
      price: 10
    },
    {
      _id: '4',
      description:
        'Finishing touches with styling products to achieve your desired look.',
      duration: '10 minutes',
      imageUrl: 'https://example.com/images/styling.jpg',
      name: 'Styling',
      price: 10
    }
  ]

  const voucher: Voucher = {
    _id: '',
    expirationDate: new Date(),
    isActive: false,
    name: 'hehe boy',
    percent: 30
  }

  const comboExample: Combo = {
    _id: 'combo1',
    description:
      `Transform your look with our Ultimate Hair Makeover 
      package, including consultation, wash, cut, and styling.`,
    imageUrl: 'https://example.com/images/salon_combo.jpg',
    name: 'Ultimate Hair Makeover',
    price: 35,
    steps,
    voucher
  }

  const handleSubmitPress = (): void => {
    console.log(selectedMethodID)
  }

  return (
    <>
      <GradientScrollContainer
        paddingHorizontal={0}
        edges={['left', 'right', 'bottom']}
        headerTitle={t('booking.bookingCheckout')}
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
          alignItems="center"
          backgroundColor={colors.bookingDetailsBackgroundCard} >
          <BookingInfoSection data={bookingData} />
          {renderPaymentMethods()}
          <ServiceInfoSection combo={comboExample} />
        </Card>
      </GradientScrollContainer>

      <PositiveButton
        title={t('booking.checkout')}
        marginHorizontal={20}
        position="absolute"
        left={0}
        right={0}
        bottom={insets.bottom === 0 ? 20 : insets.bottom}
        onPress={handleSubmitPress}
      />
    </>
  )
}

export default CheckoutTemplate
