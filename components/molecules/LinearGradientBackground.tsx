import React, { type PropsWithChildren } from 'react'
import { LinearGradient } from 'tamagui/linear-gradient'

import getColors from '~/constants/Colors'
import { useColorScheme } from '~/hooks/useColorScheme'

type GradientBackgroundProps = PropsWithChildren<Record<string, unknown>>

const LinearGradientBackground: React.FC<GradientBackgroundProps> = ({
  children
}) => {
  const { colorScheme } = useColorScheme()
  const colors = getColors(colorScheme)

  return (
    <LinearGradient colors={[colors.midnightGlow, colors.skyLight]} flex={1}>
      {children}
    </LinearGradient>
  )
}

export default LinearGradientBackground
