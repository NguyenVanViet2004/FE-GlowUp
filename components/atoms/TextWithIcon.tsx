import React from 'react'
import { Text, type TextProps, XStack } from 'tamagui'

type Props = {
  icon?: React.ReactElement
  title?: string
  subTitle?: string
  subTitleColor?: string
} & TextProps

const TextWithIcon = (props: Props): JSX.Element => {
  return (
    <XStack gap={8}>
      {props.icon}
      <Text {...props} fontSize={14}>
        {props.title}
        <Text fontSize={13} color={props.subTitleColor}>
          {props.subTitle}
        </Text>
      </Text>
    </XStack>
  )
}

export default TextWithIcon
