import { isNil } from 'lodash'
import React from 'react'
import { View } from 'tamagui'

import SummaryRow from '~/components/molecules/Checkout/SummaryRow'
import { type Colors } from '~/interfaces/Colors'
import type Combo from '~/interfaces/Combo'

interface SummaryProps {
  combo: Combo
  colors: Colors
  fonts: any
  t: (key: string) => string
}

const Summary: React.FC<SummaryProps> = ({ combo, colors, fonts, t }) => {
  const discountAmount = !isNil(combo.voucher?.percent)
    ? (combo.price * combo.voucher.percent) / 100
    : 0
  const total = combo.price - discountAmount

  const summaryData = [
    { label: t('booking.subTotal'), value: `$${combo.price}` },
    { label: t('booking.discount'), value: `${combo.voucher?.percent ?? 0}%` },
    { label: t('booking.total'), value: `$${total}` }
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
