import { Bell } from '@tamagui/lucide-icons'
import React, { useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, useColorScheme } from 'react-native'
import { View } from 'tamagui'

import ContentTitle from '~/components/atoms/ContentTitle'
import Banner from '~/components/molecules/Banner'
import LinearGradientBackground from '~/components/molecules/LinearGradientBackground'
import ListCombo from '~/components/molecules/ListCombo'
import SpecialComboCard from '~/components/molecules/SpecialComboCard'
import getColors from '~/constants/Colors'
import { RADIUS_BUTTON } from '~/constants/Constants'
import useTranslation from '~/hooks/useTranslation'
import type Combo from '~/interfaces/Combo'

const comboDemo: Combo[] = [
  {
    _id: 'combo1',
    comboStepId: {
      _id: 'step1',
      duration: '30 phút',
      stepId: ['stepA', 'stepB']
    },
    description: 'Combo này bao gồm các món ăn ngon nhất của chúng tôi.',
    imageUrl: 'https://example.com/image1.jpg',
    name: 'Combo Đặc Biệt 1',
    price: 199.99
  },
  {
    _id: 'combo2',
    comboStepId: {
      _id: 'step2',
      duration: '45 phút',
      stepId: ['stepC', 'stepD']
    },
    description: 'Combo bao gồm một bữa ăn cho 2 người với giá ưu đãi.',
    imageUrl: 'https://example.com/image2.jpg',
    name: 'Combo Đặc Biệt 2',
    price: 249.99
  },
  {
    _id: 'combo3',
    comboStepId: {
      _id: 'step3',
      duration: null,
      stepId: ['stepE', 'stepF']
    },
    description: 'Combo này được thiết kế để tiết kiệm chi phí cho bạn.',
    imageUrl: 'https://example.com/image3.jpg',
    name: 'Combo Tiết Kiệm',
    price: 149.99
  }
]

const MemoizedBanner = React.memo(Banner)
const MemoizedListCombo = React.memo(ListCombo)
const MemoizedSpecialComboCard = React.memo(SpecialComboCard)

const HomeTemplate = (): React.ReactElement => {
  const { t } = useTranslation()
  const colors = getColors(useColorScheme())
  const isDarkMode = useColorScheme() === 'dark'
  const [selectCombo, setSelectCombo] = useState<Combo | null>(null)

  const backGroundColor = isDarkMode ? 'transparent' : colors.ghostWhite

  const handleSelectCombo = (combo: Combo): void => {
    setSelectCombo(combo)
  }

  return (
    <LinearGradientBackground>
      <SafeAreaView
        style={[styles.container, { backgroundColor: backGroundColor }]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            flexDirection="row"
            alignItems="center"
            width={'100%'}>

            <View flex={5}>
              <ContentTitle title={t('screens.home.yourBeautyIsOurPride')} />
            </View>
            <View flex={2} />
            <View
              borderRadius={RADIUS_BUTTON}
              borderColor={isDarkMode ? colors.white : colors.gray}
              borderWidth={1}
              padding={10}
              alignItems="flex-end"

            >
              <Bell color={isDarkMode ? colors.white : colors.black} />
            </View>
          </View>

          <MemoizedBanner
            marginTop={15}
            img={require('~/assets/images/imgBanner.png')}
            nameCombo="Morning Special!"
            percent="20" />

          <MemoizedListCombo
            onSelectCombo={(combo) => { handleSelectCombo(combo) }}
            title={t('screens.home.combo')}
            combo={comboDemo}
            marginTop={32} />

          {selectCombo !== undefined && <MemoizedSpecialComboCard
            marginTop={32}
            nameCombo={selectCombo?.name ?? 'Default Combo Name'}
            percent="58"
            quantity="6"
            star="4.7"
            view="20" />}

        </ScrollView>
      </SafeAreaView>
    </LinearGradientBackground >
  )
}

export default HomeTemplate
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 120,
    paddingHorizontal: 15,
    paddingTop: 30
  }
})
