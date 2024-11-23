import { ChevronLeft, Map } from '@tamagui/lucide-icons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { isNil } from 'lodash'
import React from 'react'
import { ImageBackground, StyleSheet, useColorScheme } from 'react-native'
import { Button, ScrollView, Separator, View } from 'tamagui'

import AppHeader from '~/components/molecules/common/AppHeader'
import LabelWithDescription from '~/components/molecules/LabelWithDescription'
import LinearGradientBackground from '~/components/molecules/LinearGradientBackground'
import OpeningHours from '~/components/molecules/OpeningHours'
import OurServices from '~/components/molecules/OurServices'
import OurSpecialist from '~/components/molecules/OurSpecialist'
import ServiceCardTitle from '~/components/molecules/ServiceCardTitle'
import TotalAmount from '~/components/molecules/TotalAmount'
// import UserReviews from '~/components/molecules/UserReviews'
import getColors from '~/constants/Colors'
import useTranslation from '~/hooks/useTranslation'

const ComboDetailTemplate = (): React.ReactElement => {
  const colors = getColors(useColorScheme())
  const { t } = useTranslation()
  const router = useRouter()

  const dataCombo = useLocalSearchParams()
  const parsedItem =
    typeof dataCombo.item === 'string' ? JSON.parse(dataCombo.item) : null

  const renderIconButton = (
    icon: React.ReactElement,
    onPress: VoidFunction
  ): JSX.Element => (
    <Button
      unstyled
      backgroundColor={colors.mistWhite}
      width={48}
      height={48}
      borderRadius={50}
      justifyContent="center"
      onPress={onPress}
      alignItems="center">
      {icon}
    </Button>
  )

  return (
    <LinearGradientBackground>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={
            !isNil(parsedItem.picture) && parsedItem.picture !== ''
              ? { uri: parsedItem.picture }
              : require('~/assets/images/backGroundDetail.png')
          }
          style={styles.imageBackground}>
          <AppHeader
            paddingHorizontal={20}
            leftIcon={renderIconButton(
              <ChevronLeft size={24} color={colors.blueSapphire} />,
              () => { router.back() }
            )}
            rightIcon={renderIconButton(
              <Map
                size={24}
                fill={colors.blueSapphire}
                color={colors.mistWhite}
              />,
              () => { router.push('/map/Map') }
            )}
          />
        </ImageBackground>

        <View paddingHorizontal={20} marginTop={35}>
          <View gap={30}>
            <ServiceCardTitle
              comboName={parsedItem.name}
              timeOpenToday={t('screens.details.openToday')}
              dealCombo={23}
              rateCombo={4}
              reviewsCombo="(2.7k)"
              viewsCombo="10k"
            />
            <Separator borderColor={colors.smokeStone} />
          </View>

          <View marginTop={25} gap={25}>
            <LabelWithDescription Description={parsedItem.description} />
            <OpeningHours />
            <OurServices data={parsedItem} />
            <OurSpecialist />
            {/* <UserReviews /> */}
          </View>
        </View>
      </ScrollView>
      <TotalAmount
        price={Number(
          (parsedItem.price - parsedItem.price * (10 / 100)).toFixed(2)
        )}
        deal={parsedItem.price}
      />
    </LinearGradientBackground>
  )
}

const styles = StyleSheet.create({
  imageBackground: {
    height: 200,
    justifyContent: 'center',
    width: '100%'
  }
})

export default ComboDetailTemplate
