import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { isNil } from 'lodash'
import React, { useEffect, useState } from 'react'
import { useColorScheme } from 'react-native'
import { View } from 'tamagui'

import ContentTitle from '~/components/atoms/ContentTitle'
import Loading from '~/components/atoms/Loading'
import BannerCombo from '~/components/molecules/BannerCombo'
import GradientScrollContainer from '~/components/molecules/container/GradientScrollContainer'
import ListCombo from '~/components/molecules/ListCombo'
import OurSpecialist from '~/components/molecules/OurSpecialist'
import SpecialComboCard from '~/components/molecules/SpecialComboCard'
import getColors from '~/constants/Colors'
import { RADIUS_BUTTON } from '~/constants/Constants'
import useFetchBanner from '~/hooks/useFetchBanner'
import useFetchCombo from '~/hooks/useFetchCombo'
import useTranslation from '~/hooks/useTranslation'
import type Banner from '~/interfaces/Banner'
import type Combo from '~/interfaces/Combo'

const MemoizedBanner = React.memo(BannerCombo)
const MemoizedListCombo = React.memo(ListCombo)
const MemoizedSpecialComboCard = React.memo(SpecialComboCard)

const HomeTemplate = (): React.ReactElement => {
  const { t } = useTranslation()
  const colors = getColors(useColorScheme())
  const isDarkMode = useColorScheme() === 'dark'

  const [selectCombo, setSelectCombo] = useState<Combo | null>(null)
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

    if (isNil(selectCombo) && !isLoading && combos.length > 0) {
      setSelectCombo(combos[0])
    }
  }, [banner, isLoading])

  return (
    <GradientScrollContainer>
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
          alignItems="flex-end">
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

      {isLoading || isNil(selectCombo)
        ? (
          <Loading />)
        : (<>
          <MemoizedListCombo
            onSelectCombo={(combo) => { handleSelectCombo(combo) }}
            title={t('screens.home.combo')}
            combo={combos}
            marginTop={32}
            comboIdSelected={selectCombo?.id ?? combos[0].id}
          />

          <MemoizedSpecialComboCard
            comboData={selectCombo}
            marginTop={32}
            nameCombo={selectCombo.name ?? 'Default Combo Name'}
            percent="58"
            quantity="6"
            star="4.7"
            view="20"
          />

          <View marginTop={30}>
            <OurSpecialist />
          </View>
        </>)}
    </GradientScrollContainer>

  )
}

export default HomeTemplate
