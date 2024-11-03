import React from 'react'
import { StyleSheet, useColorScheme } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView, Text, View, XStack, YStack } from 'tamagui'

import ChooseImage from '~/components/atoms/ChooseImage'
import InputReview from '~/components/atoms/InputReview'
import { PositiveButton } from '~/components/atoms/PositiveButton'
import LinearGradientBackground from '~/components/molecules/LinearGradientBackground'
import PickRating from '~/components/molecules/PickRating'
import getColors from '~/constants/Colors'
import { useAppFonts } from '~/hooks/useAppFonts'
import useTranslation from '~/hooks/useTranslation'

const ReviewTemplate = (): React.ReactElement => {
  const colors = getColors(useColorScheme())
  const { fonts } = useAppFonts()
  const { t } = useTranslation()

  return (
    <LinearGradientBackground>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SafeAreaView style={styles.container}>
          <XStack alignItems="center" justifyContent="space-between">
            <Text
              fontFamily={fonts.JetBrainsMonoBold}
              fontSize={16}
              color={colors.text}
            >
              {t('screens.review.cancel')}
            </Text>
            <PositiveButton title={t('screens.review.post')} />
          </XStack>

          <YStack mt={20} gap={6}>
            <Text>{t('screens.review.score')}</Text>
            <PickRating
              onRatingChange={text => { console.log(text) }}
            />
          </YStack>

          <YStack mt={20} gap={20}>
            <InputReview
              placeholder={t('screens.review.title')}
              onChangeText={(text) => { console.log(text) }}
            />
            <InputReview
              multiline
              height={200}
              textAlignVertical="top"
              placeholder= {t('screens.review.description')}
              onChangeText={(text) => { console.log(text) }}
            />
          </YStack>

          <View mt={20}>
            <ChooseImage />
          </View>
        </SafeAreaView>
      </ScrollView>
    </LinearGradientBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  }
})

export default ReviewTemplate
