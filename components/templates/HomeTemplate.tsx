import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, useColorScheme } from 'react-native'
import { View } from 'tamagui'

import { request } from '~/apis/HttpClient'
import ContentTitle from '~/components/atoms/ContentTitle'
import Banner from '~/components/molecules/Banner'
import LinearGradientBackground from '~/components/molecules/LinearGradientBackground'
import ListCombo from '~/components/molecules/ListCombo'
import SpecialComboCard from '~/components/molecules/SpecialComboCard'
import getColors from '~/constants/Colors'
import { RADIUS_BUTTON } from '~/constants/Constants'
import useTranslation from '~/hooks/useTranslation'
import type Combo from '~/interfaces/Combo'
const MemoizedBanner = React.memo(Banner)
const MemoizedListCombo = React.memo(ListCombo)
const MemoizedSpecialComboCard = React.memo(SpecialComboCard)

const HomeTemplate = (): React.ReactElement => {
  const { t } = useTranslation()
  const colors = getColors(useColorScheme())
  const isDarkMode = useColorScheme() === 'dark'
  const [selectCombo, setSelectCombo] = useState<Combo | null>(null)
  const [combos, setCombos] = useState<Combo[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const backGroundColor = isDarkMode ? 'transparent' : colors.ghostWhite

  const handleSelectCombo = (combo: Combo): void => {
    setSelectCombo(combo)
  }

  useEffect(() => {
    const fetchCombos = async (): Promise<void> => {
      try {
        const response = await request.get<Combo[]>('combo')
        console.log(response.success)
        if (response.success) {
          setCombos(response.result as [])
        } else {
          console.error('Failed to fetch combos:', response.message)
        }
      } catch (error) {
        console.error('Error while fetching combos:', error)
      } finally {
        setIsLoading(false)
      }
      console.log(combos)
    }

    fetchCombos()
      .catch(error => { console.error('Error while fetching combos:', error) })
  }, [])

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
            />
          </View>

          <MemoizedBanner
            marginTop={15}
            img={require('~/assets/images/imgBanner.png')}
            nameCombo="Morning Special!"
            percent="20"
          />

          {isLoading
            ? (
              <View>
                <ContentTitle title={t('screens.home.loading')} />
              </View>)
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
