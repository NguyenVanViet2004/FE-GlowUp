import React, { useState } from 'react'
import { RadioGroup, Text, View } from 'tamagui'

import RadioGroupItemWithLabel from '~/components/molecules/common/RadioGroupItemWithLabel'
import getColors from '~/constants/Colors'
import { useColorScheme } from '~/hooks/useColorScheme'
import useTranslation from '~/hooks/useTranslation'
import { PaymentMethod } from '~/interfaces/enum/Payment'

const PaymentMethodSection = ({ isLocked }: { isLocked: boolean }) => {
  const colors = getColors(useColorScheme().colorScheme)
  const [selectedMethodID, setSelectedMethodID] = useState<string>(PaymentMethod.CASH)
  const { t } = useTranslation()

  const paymentMethods = [
    {
      descriptions: t('payment.salonDescription'),
      id: PaymentMethod.CASH,
      label: t('payment.payAtSalon')
    },
    {
      descriptions: t('payment.onlineDescription'),
      id: PaymentMethod.ONLINE,
      label: t('payment.payOnlineNow')
    }
  ]

  const renderPaymentMethods = (): React.JSX.Element => {
    return (
      <View width="100%">
        <Text color={colors.text} textAlign="center">{t('payment.title')}</Text>
        <RadioGroup
          value={selectedMethodID}
          onValueChange={isLocked ? () => {} : setSelectedMethodID}
        >
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
