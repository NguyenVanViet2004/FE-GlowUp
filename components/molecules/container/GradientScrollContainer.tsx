import { isNil } from 'lodash'
import React from 'react'
import { StyleSheet } from 'react-native'
import { type SafeAreaProviderProps, SafeAreaView, type SafeAreaViewProps, useSafeAreaInsets } from 'react-native-safe-area-context'
import { ScrollView, Separator, View, type ViewProps } from 'tamagui'

import AppHeader, { type headerProps } from '~/components/molecules/common/AppHeader'
import LinearGradientBackground from '~/components/molecules/LinearGradientBackground'
import { useAppFonts } from '~/hooks/useAppFonts'

type GradientScrollContainerProps = {
  children: React.ReactNode
  header?: React.ReactNode
  edges?: Array<'top' | 'bottom' | 'left' | 'right'>
} & ViewProps & SafeAreaProviderProps & headerProps

const GradientScrollContainer: React.FC<GradientScrollContainerProps> = ({
  children,
  edges = ['top', 'bottom', 'left', 'right'],
  headerTitle,
  leftIcon,
  rightIcon,
  isHeaderCenter,
  fontFamily,
  ...props
}) => {
  const fonts = useAppFonts()
  const [headerHeight, setHeaderHeight] = React.useState(0)
  const insets = useSafeAreaInsets()

  const header = (): React.JSX.Element => {
    return (
      <View onLayout={(event) => {
        setHeaderHeight(event.nativeEvent.layout.height)
      }}>
        <AppHeader
          headerTitle={headerTitle ?? ''}
          leftIcon={leftIcon}
          fontFamily={fonts.fonts.JetBrainsMonoBold}
          isHeaderCenter={isHeaderCenter}
          rightIcon={rightIcon}
          paddingHorizontal={20}
          zIndex={1000}
          backgroundColor="$colorTransparent"
          marginTop={insets.top} />
        <Separator marginVertical={0} />
      </View>
    )
  }

  return (
    <LinearGradientBackground>
      {!isNil(headerTitle) && header()}
      <ScrollView fullscreen
        marginTop={isNil(headerTitle) ? undefined : headerHeight}
        showsVerticalScrollIndicator={false}>
        <SafeAreaView style={{
          ...styles.container,
          ...props as SafeAreaViewProps
        }}
        edges={edges}>
          {children}
        </SafeAreaView>
      </ScrollView>
    </LinearGradientBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 150,
    paddingHorizontal: 20
  }
})

export default GradientScrollContainer
