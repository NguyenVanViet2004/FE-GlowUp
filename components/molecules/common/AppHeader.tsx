import { isNil } from 'lodash'
import React from 'react'
import { Text, type TextProps, XStack, type XStackProps } from 'tamagui'

import getColors from '~/constants/Colors'
import { useColorScheme } from '~/hooks/useColorScheme'

export type headerProps = {
  headerTitle?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  isHeaderCenter?: boolean
  titleColor?: string
} & XStackProps &
TextProps

const AppHeader: React.FC<headerProps> = ({
  headerTitle,
  leftIcon,
  rightIcon,
  isHeaderCenter,
  fontFamily,
  onPress,
  titleColor,
  ...props
}) => {
  const { colorScheme } = useColorScheme()
  const colors = getColors(colorScheme)

  return (
    <XStack width="100%" alignItems="center" paddingVertical={10} {...props}>
      {leftIcon}
      <Text
        onPress={isNil(isHeaderCenter) || !isHeaderCenter ? onPress : undefined}
        color={isNil(titleColor) ? colors.text : titleColor}
        textAlign={!isNil(isHeaderCenter) && isHeaderCenter ? 'center' : 'left'}
        marginLeft={!isNil(isHeaderCenter) ? 0 : 10}
        fontSize={18}
        flex={1}
        fontFamily={fontFamily}>
        {headerTitle}
      </Text>
      {rightIcon}
    </XStack>
  )
}

export default AppHeader
