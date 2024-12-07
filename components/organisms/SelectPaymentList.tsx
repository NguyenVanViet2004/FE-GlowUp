import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { RadioGroup } from 'tamagui'

import Loading from '~/components/atoms/Loading'
import PaymentMethodItem from '~/components/molecules/payment/SelectPaymentItem'
import useFetchBank from '~/hooks/useFetchBank'

interface PaymentMethodListProps {
  onMethodChange: (method: string | null) => void
}
const PaymentMethodList = ({ onMethodChange }:
PaymentMethodListProps): React.ReactElement => {
  const { bank = [], isLoading } = useFetchBank()
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null)

  useEffect(() => {
    if (Array.isArray(bank) && bank.length > 0) {
      setSelectedMethod(bank[0]?.bank_code)
      onMethodChange(selectedMethod)
    }
  }, [bank])

  const handleMethodChange = (method: string | null): void => {
    setSelectedMethod(method)
    onMethodChange(method)
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <ScrollView>
      <RadioGroup
        value={selectedMethod ?? bank[0].bank_code}
        onValueChange={handleMethodChange}
        style={styles.container}
      >
        {bank.map((item) => (
          <PaymentMethodItem
            key={item.bank_code}
            value={item.bank_code}
            bankName={item.bank_name}
            bankImage={item.logo_link}
          />
        ))}
      </RadioGroup>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16
  }
})

export default PaymentMethodList
