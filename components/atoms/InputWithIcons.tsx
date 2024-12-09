import { isNil, isUndefined } from 'lodash'
import React, { useState } from 'react'
import { Input, type InputProps, Text, XStack, YStack } from 'tamagui'

import getColors from '~/constants/Colors'
import { HEIGHT_BUTTON, RADIUS_BUTTON } from '~/constants/Constants'
import { useAppFonts } from '~/hooks/useAppFonts'
import { useColorScheme } from '~/hooks/useColorScheme'

type Props = {
  iconRight?: JSX.Element
  iconLeft?: JSX.Element
  errorMessage?: string
  label?: string
} & InputProps

const InputWithIcons: React.FC<Props> = (props: Props) => {
  const colors = getColors(useColorScheme().colorScheme)
  const { fonts } = useAppFonts()
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const inputContainerStyle = {
    backgroundColor: isFocused ? colors.inputBackground : colors.lightMist,
    borderColor: isFocused ? colors.oceanTeal : colors.lightMist,
    borderWidth: isFocused ? 1 : 0
  }

  return (
    <YStack gap={10}>
      {!isNil(props.label) && (
        <Text fontSize={16} color={colors.text}>
          {props.label}
        </Text>
      )}
      <XStack
        alignItems="center"
        borderRadius={RADIUS_BUTTON}
        paddingHorizontal={24}
        style={inputContainerStyle}>
        {!isNil(props.iconRight) && props.iconRight}

        <Input
          {...props}
          unstyled
          marginHorizontal={!isNil(props.iconRight) && 18}
          height={HEIGHT_BUTTON}
          fontFamily={fonts.JetBrainsMonoRegular}
          fontSize={16}
          color={colors.oceanTeal}
          placeholderTextColor={colors.placeholderColor}
          flex={1}
          onFocus={() => {
            setIsFocused(true)
          }}
          onBlur={() => {
            setIsFocused(false)
          }}
        />

        {!isNil(props.iconLeft) && props.iconLeft}
      </XStack>
      {!isUndefined(props.errorMessage) && props.errorMessage !== '' && (
        <Text color={'red'} fontSize={12} left={20} top={3}>
          {props.errorMessage}
        </Text>
      )}
    </YStack>
  )
}

export default InputWithIcons
