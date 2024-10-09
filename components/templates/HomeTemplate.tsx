import { Bell, Search } from '@tamagui/lucide-icons'
import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet, useColorScheme } from 'react-native'
import { View } from 'tamagui'

import ContentTitle from '~/components/atoms/ContentTitle'
import InputWithIcons from '~/components/atoms/InputWithIcons'
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

const HomeTemplate = (): React.ReactElement => {
  const { t } = useTranslation()
  const colors = getColors(useColorScheme())
  const isDarkMode = useColorScheme() === 'dark'

  const backGroundColor = isDarkMode ? 'transparent' : colors.ghostWhite
  return (
    <LinearGradientBackground>
      <SafeAreaView
        style={[styles.container, { backgroundColor: backGroundColor }]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between">
            <ContentTitle title={t('screens.home.yourBeautyIsOurPride')} />
            <View
              borderRadius={RADIUS_BUTTON}
              borderWidth={1}
              borderColor={isDarkMode ? colors.white : colors.lightMist}
              padding={10}>
              <Bell color={isDarkMode ? colors.white : colors.black} />
            </View>
          </View>
          <InputWithIcons
            iconRight={<Search color={colors.placeholderColor} />}
            placeholder={t('screens.home.enterAddressOrCityName')} />

          <Banner
            marginTop={24}
            img={require('~/assets/images/imgBanner.png')}
            nameCombo="Morning Special!"
            percent="20" />
          <ListCombo
            title={t('screens.home.combo')}
            combo={comboDemo}
            marginTop={32} />
          <SpecialComboCard
            marginTop={32}
            nameCombo="Plush Beauty Lounge"
            percent="58"
            quantity="6"
            star="4.7"
            view="20" />
        </ScrollView>
      </SafeAreaView>
    </LinearGradientBackground>
  )
}

export default HomeTemplate
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 120,
    paddingHorizontal: 10,
    paddingTop: 30
  }
})
