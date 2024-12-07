import React from 'react'
import { Separator, Text, View, XStack } from 'tamagui'

import getColors from '~/constants/Colors'
import { useAppFonts } from '~/hooks/useAppFonts'
import { useColorScheme } from '~/hooks/useColorScheme'
import useTranslation from '~/hooks/useTranslation'

import Summary from './Summary'

interface props {
  booking: any
}

const ServiceInfoSection: React.FC<props> = ({ booking }) => {
  const colors = getColors(useColorScheme().colorScheme)
  const fonts = useAppFonts()
  const { t } = useTranslation()

  return (
    <View width="100%" marginTop={40}>
      <Text
        textAlign="center"
        color={colors.text}
        fontFamily={fonts.fonts.JetBrainsMonoBold}>
        {t('booking.service')}
      </Text>

      {booking.combo.services.map((step, index) => (
        <XStack marginTop={20} key={`${step.id}-${index}`}>
          <Text
            color={colors.text}
            flex={1}
            fontFamily={fonts.fonts.JetBrainsMonoBold}>
            {step.name}
          </Text>
          <Text
            color={colors.blueSapphire}
            fontFamily={fonts.fonts.JetBrainsMonoBold}>
            ${step.price}
          </Text>
        </XStack>
      ))}
      <Separator
        borderColor={colors.lightSilver}
        width="100%"
        marginVertical={20}
      />

      <Summary colors={colors} booking={booking} fonts={fonts} t={t} />
    </View>
  )
}

export default ServiceInfoSection
