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
      <XStack
        marginTop={30}
        gap={5}
        alignItems="center"
        justifyContent="center"
      >
        {!isNil(backIcon) && (
          <Button
            unstyled
            padding={10}
            borderRadius={50}
            marginBottom={20}
            testID="back-icon"
          >
            {backIcon}
          </Button>
        )}
        {!isUndefined(title) && (
          <H3
            fontWeight="bold"
            textAlign="center"
            alignSelf="center"
            testID="title"
            flex={1}
            top={-9}
            color={colors.text}
          >
            {title}
          </H3>
        )}
      </XStack>
      <XStack marginTop={10} gap={5} alignItems="center">
        {renderIcon(leftIcon, 'left')}
        <View flex={1} alignItems="center">
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
