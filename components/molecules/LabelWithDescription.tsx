import React, { useState } from 'react'
import { Text, type TextProps, YStack } from 'tamagui'

import LabelTitle from '~/components/atoms/LabelTitle'
import getColors from '~/constants/Colors'
import { useAppFonts } from '~/hooks/useAppFonts'
import { useColorScheme } from '~/hooks/useColorScheme'
import useTranslation from '~/hooks/useTranslation'

type Props = {
  Description: string
} & TextProps

const LabelWithDescription = (props: Props): JSX.Element => {
  const { t } = useTranslation()
  const { fonts } = useAppFonts()
  const colors = getColors(useColorScheme().colorScheme)

  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  const toggleDescription = (): void => {
    setIsExpanded(!isExpanded)
  }

  return (
    <YStack gap={30}>
      <LabelTitle title={t('screens.details.about')} />

      <Text fontSize={12} color={colors.text}>
        {isExpanded
          ? props.Description
          : `${props.Description.slice(0, 100)}...`}{' '}
        <Text
          fontSize={12}
          color={colors.gray}
          onPress={toggleDescription}
          fontFamily={fonts.JetBrainsMonoBold}>
          {isExpanded ? '' : t('screens.details.readMore')}
        </Text>
      </Text>
    </YStack>
  )
}

export default LabelWithDescription
