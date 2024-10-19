import React, { useState } from 'react'
import { RadioGroup, Text, View } from 'tamagui'

import RadioGroupItemWithLabel from '~/components/molecules/common/RadioGroupItemWithLabel'
import useTranslation from '~/hooks/useTranslation'
import { PaymentMethod } from '~/interfaces/enum/Payment'

const paymentMethods = [
  { descriptions: 'Secure your booking instantly', id: PaymentMethod.CASH, label: 'Pay at salon' },
  { descriptions: 'Settle payment after your appointment', id: PaymentMethod.ONLINE, label: 'Pay online now' }
]

const PaymentMethodSection = (): {
  renderPaymentMethods: () => JSX.Element
  selectedMethodID: string
} => {
  const [selectedMethodID, setSelectedMethodID] = useState<string>(PaymentMethod.CASH)
  const { t } = useTranslation()

  const renderPaymentMethods = () => {
    return (
      <View width="100%">
        <Text textAlign="center">{t('payment.title')}</Text>
        <RadioGroup
          value={selectedMethodID}
          onValueChange={setSelectedMethodID}>
          {paymentMethods.map((method) => (
            <RadioGroupItemWithLabel
              key={method.id}
              value={method.id}
              label={method.label}
              descriptions={method.descriptions}
            />
          ))}
        </RadioGroup>
      </View>
    )
  }

  return {
    renderPaymentMethods,
    selectedMethodID
  }
}

export default PaymentMethodSection
