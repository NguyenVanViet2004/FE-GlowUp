import { ChevronLeft, ChevronRight } from '@tamagui/lucide-icons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Alert, useColorScheme } from 'react-native'
import { Card } from 'tamagui'
import { request } from '~/apis/HttpClient'

import BookingInfoSection from '~/components/molecules/Checkout/BookingInfoSection'
import ServiceInfoSection from '~/components/molecules/Checkout/ServiceInfoSection'
import GradientScrollContainer from '~/components/molecules/container/GradientScrollContainer'
import getColors from '~/constants/Colors'
import { useAppFonts } from '~/hooks/useAppFonts'
import useTranslation from '~/hooks/useTranslation'

const ViewReceiptTemplate = (): React.ReactElement => {
  const fonts = useAppFonts()
  const colors = getColors(useColorScheme())
  const router = useRouter()
  const leftIcon = <ChevronLeft size={25} onPress={() => { router.back() }} />
  const rightIcon = <ChevronRight size={25} opacity={0} />
  const { t } = useTranslation()
  const { id } = useLocalSearchParams()
  const [bookingData, setBookingData] = useState<any>(null)

  const services = bookingData?.combo?.services ?? []
  const stylist = bookingData?.stylist ?? {}

  useEffect(() => {
    const getReceipt = async (): Promise<void> => {
      try {
        const response = await request.get(`/booking/${id as string}`)
        if (response.result !== undefined) {
          setBookingData(response.result)
          console.log(bookingData)
        } else {
          Alert.alert('Error', 'Failed to fetch booking details.')
        }
      } catch (error) {

      }
    }
    getReceipt().catch(error => { console.error(error) })
  }, [])

  const formattedBookingData = bookingData !== null && [
    {
      flex: 2,
      label: t('booking.date'),
      value: new Date(bookingData?.start_time).toLocaleDateString(),
      valueProps: {
        color: colors.blueSapphire,
        fontFamily: fonts.fonts.JetBrainsMonoBold
      }
    },
    {
      flex: undefined,
      label: t('booking.startTime'),
      value: new Date(bookingData?.start_time).toISOString().slice(11, 19),
      valueProps: {
        color: colors.blueSapphire,
        fontFamily: fonts.fonts.JetBrainsMonoBold
      }
    },
    {
      flex: 2,
      label: t('booking.speciaList'),
      value: stylist.full_name ?? 'N/A',
      valueProps: {
        color: colors.blueSapphire,
        fontFamily: fonts.fonts.JetBrainsMonoBold
      }
    },
    {
      flex: undefined,
      label: t('booking.duration'),
      value: `${services.reduce((totalTime, service) =>
        totalTime + (service.time ?? 0), 0)} minutes`,
      valueProps: {
        color: colors.blueSapphire,
        fontFamily: fonts.fonts.JetBrainsMonoBold
      }
    }
  ]

  return (
    <>
      <GradientScrollContainer
        paddingHorizontal={0}
        edges={['left', 'right', 'bottom']}
        headerTitle={t('booking.orderInformation')}
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
          <BookingInfoSection data={formattedBookingData} />
          <ServiceInfoSection combo={bookingData} />
        </Card>
      </GradientScrollContainer>

    </>
  )
}

export default ViewReceiptTemplate
