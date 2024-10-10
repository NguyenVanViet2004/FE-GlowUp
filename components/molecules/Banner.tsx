import React from 'react'
import { ImageBackground, StyleSheet, useColorScheme } from 'react-native'
import type { ViewProps } from 'tamagui'
import { Button, Text, View } from 'tamagui'
import { LinearGradient } from 'tamagui/linear-gradient'

import getColors from '~/constants/Colors'
import { RADIUS_BUTTON } from '~/constants/Constants'
import useTranslation from '~/hooks/useTranslation'

interface Props extends ViewProps {
  img: number
  nameCombo: string
  percent: string
}
const Banner = (props: Props): React.ReactElement => {
  const colors = getColors(useColorScheme())
  const { t } = useTranslation()

  return (
    <View {...props}>
      <ImageBackground
        source={props.img}
        borderRadius={RADIUS_BUTTON}
        style={styles.banner}>
        <LinearGradient
          colors={['rgba(0, 128, 255, 0.5)',
            'rgba(0, 128, 255, 0.3)',
            'transparent']}
          style={{ ...StyleSheet.absoluteFillObject }}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}/>
        <Text fontSize={16} color={colors.white} fontWeight={'bold'}>
          {props.nameCombo}
        </Text>
        <Text fontSize={28} color={colors.white} fontWeight={'bold'}>
          Get {props.percent}% Off
        </Text>
        <Text fontSize={12} color={colors.white} >
          on All Haircuts Between 9-10 AM.
        </Text>
        <View alignSelf="flex-start" marginTop={12}>
          <Button
            backgroundColor={colors.white}
            borderRadius={RADIUS_BUTTON}
            fontSize={12}
            color={colors.black}>{t('screens.home.bookNow')}</Button>
        </View>
      </ImageBackground>
    </View>
  )
}

export default Banner
const styles = StyleSheet.create({
  banner: {
    padding: 20
  }
})
