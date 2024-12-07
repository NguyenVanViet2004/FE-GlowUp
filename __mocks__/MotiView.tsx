// FIXME https://github.com/tamagui/tamagui/issues/1828
import React from 'react'
import { View as MotiView } from 'react-native'

const MockButton: React.FC<any> = ({ children, ...props }) => {
  return <MotiView {...props}>{children}</MotiView>
}

export default MockButton
