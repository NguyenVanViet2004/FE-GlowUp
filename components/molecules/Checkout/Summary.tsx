// import { isNil } from 'lodash'
import React from 'react'
import { View } from 'tamagui'

import SummaryRow from '~/components/molecules/Checkout/SummaryRow'
import type Appointment from '~/interfaces/Appointment'
import { type Colors } from '~/interfaces/Colors'

interface SummaryProps {
  booking: Appointment
  colors: Colors
  fonts: any
  t: (key: string) => string
}

const Summary: React.FC<SummaryProps> = ({ booking, colors, fonts, t }) => {
  // const discountAmount = !isNil(combo.voucher?.percent)
  //   ? (combo.price * combo.voucher.percent) / 100
  //   : 0
  // const total = combo.price - discountAmount

  const summaryData = [
    // { label: t('booking.subTotal'), value: `$${combo.price}` },
    // { label: t('booking.discount'), value: `${combo.voucher?.percent ?? 0}%` },
    // { label: t('booking.total'), value: `$${total}` }
    { label: t('booking.total'), value: `$${booking.total_price}` }
  ]

  return (
    <View gap={20}>
      {summaryData.map((item, index) => (
        <SummaryRow
          key={index}
          label={item.label}
          value={item.value}
          fonts={fonts}
          color={colors.blueSapphire}
        />
      ))}
    </View>
  )
}

export default Summary
