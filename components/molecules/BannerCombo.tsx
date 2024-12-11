// import { isNil } from "lodash"
// import React, { useEffect, useState } from "react"
// import {
//   Dimensions,
//   FlatList,
//   ImageBackground,
//   NativeScrollEvent,
//   StyleSheet,
// } from "react-native"
// import type { ViewProps } from "tamagui"
// import { Button, ScrollView, Text, View } from "tamagui"
// import { LinearGradient } from "tamagui/linear-gradient"

// import getColors from "~/constants/Colors"
// import { RADIUS_BUTTON } from "~/constants/Constants"
// import { useColorScheme } from "~/hooks/useColorScheme"
// import useTranslation from "~/hooks/useTranslation"

// interface Props extends ViewProps {
//   img: string[]
//   nameCombo: string
// }

// const { width } = Dimensions.get("window")

// const BannerCombo = (props: Props): React.ReactElement => {
//   const colors = getColors(useColorScheme().colorScheme)
//   const { t } = useTranslation()
//   const [slideActiveIndex, setSlideActiveIndex] = useState(0)

//   // Function to change slide on scroll
//   const onChangeSlide = (nativeEvent: NativeScrollEvent) => {
//     if (!isNil(nativeEvent)) {
//       const slide = Math.ceil(
//         nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
//       )
//       if (slide !== slideActiveIndex) {
//         setSlideActiveIndex(slide)
//       }
//     }
//   }

//   // Auto change slide every 1.5 seconds
//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setSlideActiveIndex((prevIndex) => (prevIndex + 1) % props.img.length)
//     }, 1500) // 1.5 seconds

//     return () => clearInterval(intervalId)
//   }, [props.img.length, slideActiveIndex])

//   const renderItem = (item: string, index: number) => (
//     <ImageBackground
//       source={{ uri: item }}
//       borderRadius={RADIUS_BUTTON}
//       key={index}
//       resizeMode="stretch"
//       style={styles.banner}>
//       <LinearGradient
//         colors={[
//           "rgba(0, 128, 255, 0.5)",
//           "rgba(0, 128, 255, 0.3)",
//           "transparent",
//         ]}
//         style={{
//           ...StyleSheet.absoluteFillObject,
//           borderRadius: RADIUS_BUTTON,
//         }}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 0 }}
//       />
//       <Text fontSize={16} color={colors.white} fontWeight={"bold"}>
//         {props.nameCombo}
//       </Text>
//       <Text fontSize={12} color={colors.white}>
//         on All Haircuts Between 9-10 AM.
//       </Text>
//       <View alignSelf="flex-start" marginTop={12}>
//         <Button
//           backgroundColor={colors.white}
//           borderRadius={RADIUS_BUTTON}
//           fontSize={12}
//           color={colors.black}>
//           {t("screens.home.bookNow")}
//         </Button>
//       </View>
//     </ImageBackground>
//   )

//   return (
//     <View {...props}>
//       <ScrollView
//         onScroll={({ nativeEvent }) => onChangeSlide(nativeEvent)}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         pagingEnabled>
//         {props.img.map((img, index) => renderItem(img, index))}
//       </ScrollView>

//       {/* <View
//         flexDirection="row"
//         gap={2}
//         alignItems="center"
//         justifyContent="center"
//         mt={2}>
//         {props.img.map((img, index) => (
//           <Text
//             key={img + index}
//             fontSize={25}
//             col={slideActiveIndex === index ? colors.black : colors.text}>
//             •
//           </Text>
//         ))}
//       </View> */}
//     </View>
//   )
// }

// export default BannerCombo

// const styles = StyleSheet.create({
//   banner: {
//     width: width * 0.9 - 20,
//     height: 150,
//     marginHorizontal: 10,
//     padding: 20,
//   },
// })

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
const BannerCombo = (props: Props): React.ReactElement => {
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
          style={{
            ...StyleSheet.absoluteFillObject,
            borderRadius: RADIUS_BUTTON
          }}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }} />
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

export default BannerCombo
const styles = StyleSheet.create({
  banner: {
    padding: 20
  }
})
