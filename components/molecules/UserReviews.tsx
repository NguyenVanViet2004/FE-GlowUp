import React from 'react'
import { StyleSheet } from 'react-native'
import { YStack } from 'tamagui'

import LabelTitle from '~/components/atoms/LabelTitle'
import ReviewsList from '~/components/organisms/ReviewsList'
import { dataReviews } from '~/constants/ReviewData'
import useTranslation from '~/hooks/useTranslation';

const UserReviews = () => {
    const {t} = useTranslation()
  return (
    <YStack gap={25}>
      <LabelTitle
        title={t("screens.details.reviews")}
        subTitle={t("screens.details.viewAll")}
      />

      <ReviewsList
        dataReview={dataReviews.slice(0, 3)}
      />

    </YStack>
  )
}

const styles = StyleSheet.create({})

export default UserReviews
