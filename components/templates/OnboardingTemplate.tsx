import { type Router, useRouter } from 'expo-router'
import { isNil } from 'lodash'
import React, { useRef, useState } from 'react'
import { Animated, FlatList, useColorScheme, type ViewToken } from 'react-native'
import { Spacer, View } from 'tamagui'

import Panagitor from '~/components/atoms/Panagitor'
import PrimaryButton from '~/components/atoms/PrimaryButton'
import TransparentButton from '~/components/atoms/TransparentButton'
import OnboardingItem from '~/components/molecules/OnboardingItem'
import getColors from '~/constants/Colors'
import useDataOnboarding from '~/constants/DataOnboarding'
import useTranslation from '~/hooks/useTranslation'

const scrollToNext = (
  dataOnboading: any[],
  currentIndex: number,
  slideRef: React.RefObject<FlatList<number>>,
  router: Router
): VoidFunction => {
  return () => {
    if (slideRef.current != null) {
      if (currentIndex < dataOnboading.length - 1) {
        slideRef
          .current
          .scrollToIndex({ animated: true, index: currentIndex + 1 })
      } else {
        setTimeout(() => {
          router.replace('/authentication/Login')
        }, 1000)
      }
    }
  }
}

const OnboardingTemplate = (): React.ReactElement => {
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [buttonText, setButtonText] = useState<string>('Get Started')
  const scrollX = useRef(new Animated.Value(0)).current
  const slideRef = useRef<FlatList<number>>(null)
  const { t } = useTranslation()
  const dataOnboading = useDataOnboarding()
  const router = useRouter()
  const colors = getColors(useColorScheme())
  const useHandleLogin = (): void => {
    router.replace('/authentication/Login')
  }

  const viewableItemsChanged = useRef(({ viewableItems }:
  { viewableItems: ViewToken[] }) => {
    setCurrentIndex(viewableItems[0].index ?? 0)
    if (!isNil(viewableItems[0].index)) {
      if (viewableItems[0]?.index >= 1 && viewableItems[0]?.index < 4) {
        setButtonText(t('screens.onboarding.next'))
      } else {
        setButtonText(t('screens.onboarding.getStarted'))
      }
    }
  }).current

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current

  return (
    <View flex={1}>
      <FlatList
        data={dataOnboading}
        renderItem={({ item }) => (
          <OnboardingItem
            content={item.content}
            imgBackground={item.backgroungImg}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        ref={slideRef}
        decelerationRate={'fast'}
      />
      <Panagitor data={dataOnboading} scrollX={scrollX}/>
      <View
        position="absolute"
        bottom={20}
        flexDirection="row"
        paddingHorizontal={16}
        justifyContent="space-between"
      >
        <View flex={1} >
          <TransparentButton
            title={t('screens.onboarding.login')}
            onPress={useHandleLogin}
            colorProps={colors.white}/>

        </View>
        <Spacer height={23} />
        <View flex={1}>
          <PrimaryButton
            title={buttonText}
            onPress={scrollToNext(
              dataOnboading,
              currentIndex,
              slideRef,
              router)} />
        </View>
      </View>

    </View>
  )
}

export default OnboardingTemplate
