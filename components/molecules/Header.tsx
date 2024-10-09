import { isNil, isUndefined } from 'lodash'
import React from 'react'
import { useColorScheme } from 'react-native'
import { Button, H3, Text, View, XStack } from 'tamagui'

import getColors from '~/constants/Colors'

interface Props {
  backIcon?: React.ReactElement
  title?: string
  subtitle?: string
  leftIcon?: React.ReactElement
  rightIcon?: React.ReactElement
}

export default function Header ({
  backIcon,
  title,
  subtitle,
  leftIcon,
  rightIcon
}: Props): React.ReactElement {
  const colors = getColors(useColorScheme())

  const renderIcon = (
    icon: React.ReactElement | undefined,
    position: 'left' | 'right'
  ): React.ReactElement | null => {
    if (isNil(icon)) return null
    const style = position === 'left' ? { left: 10 } : { right: 10 }
    return (
      <View position="absolute" {...style} testID={`${position}-icon`}>
        {icon}
      </View>
    )
  }

  return (
    <View testID="Header">
      {!isNil(backIcon) && (
        <Button
          unstyled
          padding={10}
          borderRadius={50}
          marginBottom={20}
          alignSelf="baseline"
          testID="back-icon"
        >
          {backIcon}
        </Button>
      )}
      <XStack marginTop={30} gap={5} alignItems="center">
        {renderIcon(leftIcon, 'left')}
        <View flex={1} alignItems="center">
          {!isUndefined(title) && (
            <H3
              fontWeight="bold"
              textAlign="center"
              alignSelf="center"
              testID="title"
            >
              {title}
            </H3>
          )}
          {!isUndefined(subtitle) && (
            <Text color={colors.oceanTeal} testID="subtitle">
              {subtitle}
            </Text>
          )}
        </View>
        {renderIcon(rightIcon, 'right')}
      </XStack>
    </View>
  )
}
