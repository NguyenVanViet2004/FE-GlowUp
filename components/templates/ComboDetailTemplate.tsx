import { ChevronLeft, Map } from '@tamagui/lucide-icons'
import { isNil } from 'lodash'
import React from 'react'
import { ImageBackground, StyleSheet, useColorScheme } from 'react-native'
import { Button, ScrollView, Separator, View } from 'tamagui'

import Header from '~/components/molecules/Header'
import LabelWithDescription from '~/components/molecules/LabelWithDescription'
import LinearGradientBackground from '~/components/molecules/LinearGradientBackground'
import OpeningHours from '~/components/molecules/OpeningHours'
import OurServices from '~/components/molecules/OurServices'
import OurSpecialist from '~/components/molecules/OurSpecialist'
import ServiceCardTitle from '~/components/molecules/ServiceCardTitle'
import TotalAmount from '~/components/molecules/TotalAmount'
import UserReviews from '~/components/molecules/UserReviews'
import getColors from '~/constants/Colors'
import { dataComboList } from '~/constants/ComboListData'
import useTranslation from '~/hooks/useTranslation'

const ComboDetailTemplate = (): React.ReactElement => {
  const colors = getColors(useColorScheme())
  const { t } = useTranslation()

  const data = dataComboList[0]

  const renderIconButton = (icon: React.ReactElement): JSX.Element => (
    <Button
      unstyled
      backgroundColor={colors.mistWhite}
      width={48}
      height={48}
      borderRadius={50}
      justifyContent="center"
      alignItems="center"
    >
      {icon}
    </Button>
  )
  return (
    <LinearGradientBackground>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={require('~/assets/images/backGroundDetail.png')}
          style={styles.imageBackground}
        >
          <Header
            leftIcon={renderIconButton(
              <ChevronLeft size={24} color={colors.blueSapphire} />
            )}
            rightIcon={renderIconButton(
              <Map
                size={24}
                fill={colors.blueSapphire}
                color={colors.mistWhite}
              />
            )}
          />
        </ImageBackground>

        <View paddingHorizontal={20} marginTop={35}>
          <View gap={30}>
            <ServiceCardTitle
              comboName={data.name}
              timeOpenToday={
                !isNil(data.comboStepId.duration) &&
                data.comboStepId.duration.trim() !== ''
                  ? `${data.comboStepId.duration} ${t('screens.details.hour')}`
                  : t('screens.details.openToday')
              }
              dealCombo={data.deal}
              rateCombo={data.rate}
              reviewsCombo=" (2.7k)"
              viewsCombo="10k"
            />
            <Separator borderColor={colors.smokeStone} />
          </View>

          <View marginTop={25} gap={25}>
            <LabelWithDescription Description={data.description} />
            <OpeningHours />
            <OurServices />
            <OurSpecialist />
            <UserReviews />
          </View>
        </View>
      </ScrollView>
      <TotalAmount
        price={Number((data.price - data.price * (data.deal / 100)).toFixed(2))}
        deal={data.price}
      />
    </LinearGradientBackground>
  )
}

const styles = StyleSheet.create({
  imageBackground: {
    height: 180,
    justifyContent: 'center',
    width: '100%'
  }
})

export default ComboDetailTemplate
