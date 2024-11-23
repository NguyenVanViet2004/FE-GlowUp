import React from 'react'
import { useColorScheme } from 'react-native'
import { Separator, Text, View, XStack } from 'tamagui'

import getColors from '~/constants/Colors'
import { useAppFonts } from '~/hooks/useAppFonts'
import useTranslation from '~/hooks/useTranslation'
import type Combo from '~/interfaces/Combo'

import Summary from './Summary'

interface props {
  combo: Combo
}

const ServiceInfoSection: React.FC<props> = ({ combo }) => {
  const colors = getColors(useColorScheme())
  const fonts = useAppFonts()
  const { t } = useTranslation()

  return (
    <View width="100%" marginTop={40}>
      <Text textAlign="center">{t('booking.service')}</Text>

      {combo.steps.map((step, index) => (
        <XStack marginTop={20} key={`${step._id}-${index}`}>
          <Text flex={1} fontFamily={fonts.fonts.JetBrainsMonoBold}>
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
        marginVertical={20} />

      <Summary colors={colors} combo={combo} fonts={fonts} t={t}/>
    </View>
  )
}

export default ServiceInfoSection
