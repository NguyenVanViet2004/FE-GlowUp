// FIXME https://github.com/tamagui/tamagui/issues/1828
import React from 'react'
import { Button } from 'react-native'
import { View } from 'tamagui'

const MockButton: React.FC<any> = ({ children, ...props }) => {
  return <View {...props}>
    <Button onPress={props.onPress} title="some title"/>
    {children}
  </View>
}

export default MockButton
