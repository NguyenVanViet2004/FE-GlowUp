// import { AntDesign, FontAwesome5 } from '@expo/vector-icons'
// import { Clock, Star } from '@tamagui/lucide-icons'
// import TextWithIcon from 'components/atoms/TextWithIcon'
import React from 'react'
import { useColorScheme } from 'react-native'
import { Text, type TextProps, YStack } from 'tamagui'

import getColors from '~/constants/Colors'
import { useAppFonts } from '~/hooks/useAppFonts'
// import useTranslation from '~/hooks/useTranslation'

type Props = {
  comboName: string
  timeOpenToday: string
  dealCombo: number
  rateCombo: number
  reviewsCombo: string
  viewsCombo: string
} & TextProps

const ServiceCardTitle = (props: Props): JSX.Element => {
  const colors = getColors(useColorScheme())
  const { fonts } = useAppFonts()
  // const { t } = useTranslation()
  return (
    <YStack gap={50}>
      <Text
        fontFamily={fonts.JetBrainsMonoBold}
        fontSize={24}
        color={colors.text}
      >
        {props.comboName}
      </Text>

      {/* <XStack gap={20}>
        <YStack gap={20}>
          <TextWithIcon
            icon={<Clock size={20} color={colors.blueSapphire} />}
            title={props.timeOpenToday.toString()}
          />

          <TextWithIcon
            fontFamily={fonts.JetBrainsMonoBold}
            icon={
              <Star
                size={20}
                color={colors.sunsetOrange}
                fill={colors.sunsetOrange}
              />
            }
            title={props.rateCombo.toString()}
            subTitle={props.reviewsCombo}
          />
        </YStack>

        <YStack gap={20}>
          <TextWithIcon
            color={colors.blueSapphire}
            fontFamily={fonts.JetBrainsMonoBold}
            icon={
              <FontAwesome5 name="tag" size={16} color={colors.blueSapphire} />
            }
            title={props.dealCombo.toString() + '%'}
            subTitle={t('screens.details.paxAvailable')}
            subTitleColor="$gray10Dark"
          />

          <TextWithIcon
            color={colors.text}
            icon={
              <AntDesign name="eye" size={20} color={colors.placeholderColor} />
            }
            title={`${props.viewsCombo} ${t('screens.details.views')}`}
          />
        </YStack>
      </XStack> */}

    </YStack>
  )
}
export default ServiceCardTitle
