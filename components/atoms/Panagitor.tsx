import React from 'react'
import { Animated, StyleSheet, useColorScheme, useWindowDimensions } from 'react-native'
import { View } from 'tamagui'

import getColors from '~/constants/Colors'

const Panagitor = (
  { data, scrollX }:
  { data: any, scrollX: Animated.Value }
): React.ReactElement => {
  const { width } = useWindowDimensions()
  const colors = getColors(useColorScheme())
  return (
    <View
      flexDirection="row"
      position="absolute"
      bottom={100}
      width={'100%'}
      testID="panagitor"
      justifyContent="center">
      {
        data.map((_: any, i: number) => {
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width]

          const dotWidth = scrollX.interpolate({
            extrapolate: 'clamp',
            inputRange,
            outputRange: [7, 7, 7]
          })

          const opacity = scrollX.interpolate({
            extrapolate: 'clamp',
            inputRange,
            outputRange: [0.3, 1, 0.3]
          })
          return (
            <Animated.View
              style={[
                styles.dot,
                {
                  backgroundColor: colors.white,
                  opacity,
                  width: dotWidth
                }
              ]}
              key={i.toString()}
            >
            </Animated.View>
          )
        })
      }

    </View>
  )
}

export default Panagitor

const styles = StyleSheet.create({
  dot: {
    borderRadius: 14,
    height: 7,
    marginRight: 5
  }
})
