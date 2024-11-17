import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { isNil } from 'lodash'
import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, useColorScheme } from 'react-native'
import { View } from 'tamagui'

import ContentTitle from '~/components/atoms/ContentTitle'
import Loading from '~/components/atoms/Loading'
import LinearGradientBackground from '~/components/molecules/LinearGradientBackground'
import ListCombo from '~/components/molecules/ListCombo'
import SpecialComboCard from '~/components/molecules/SpecialComboCard'
import getColors from '~/constants/Colors'
import { RADIUS_BUTTON } from '~/constants/Constants'
import useFetchBanner from '~/hooks/useFetchBanner'
import useFetchCombo from '~/hooks/useFetchCombo'
import useTranslation from '~/hooks/useTranslation'
import type Banner from '~/interfaces/Banner'
import type Combo from '~/interfaces/Combo'

import BannerCombo from '../molecules/BannerCombo'

const MemoizedBanner = React.memo(BannerCombo)
const MemoizedListCombo = React.memo(ListCombo)
const MemoizedSpecialComboCard = React.memo(SpecialComboCard)

const HomeTemplate = (): React.ReactElement => {
  const { t } = useTranslation()
  const colors = getColors(useColorScheme())
  const isDarkMode = useColorScheme() === 'dark'

  const [selectCombo, setSelectCombo] = useState<Combo | null>(null)

  const backGroundColor = isDarkMode ? 'transparent' : colors.ghostWhite
  const { combos, isLoading } = useFetchCombo()
  const { banner } = useFetchBanner()
  const [bannerData, setBannerData] = useState<Banner | null>(null)
  const handleSelectCombo = (combo: Combo): void => {
    setSelectCombo(combo)
  }
  useEffect(() => {
    if (!isNil(banner) && banner.length > 0) {
      setBannerData(banner[0])
    }
    console.log(bannerData?.banner[0])
  }, [banner])
  return (
    <LinearGradientBackground>
      <SafeAreaView
        style={[styles.container, { backgroundColor: backGroundColor }]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View flexDirection="row" alignItems="center" width={'100%'}>
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
              <MaterialCommunityIcons
                name="bell-ring-outline"
                size={24}
                color={isDarkMode ? colors.white : colors.black} />
            </View>
          </View>

          <MemoizedBanner
            marginTop={15}
            img={bannerData?.banner[0] ??
              require('~/assets/images/imgBanner.png')}
            nameCombo={bannerData?.name ?? ''}
            percent="20"
          />

          {isLoading === true
            ? (
              <Loading />)
            : (
              <MemoizedListCombo
                onSelectCombo={(combo) => { handleSelectCombo(combo) }}
                title={t('screens.home.combo')}
                combo={combos}
                marginTop={32}
              />)}

          {selectCombo !== null && (
            <MemoizedSpecialComboCard
              marginTop={32}
              nameCombo={selectCombo.name ?? 'Default Combo Name'}
              percent="58"
              quantity="6"
              star="4.7"
              view="20"
            />
          )}
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
    paddingHorizontal: 15,
    paddingTop: 30
  }
})
