import React from 'react'
import { useTranslation } from 'react-i18next'
import { XStack, YStack } from 'tamagui'

import LabelTitle from '~/components/atoms/LabelTitle'
import TimeHours from '~/components/atoms/TimeHours'

const OpeningHours = (): JSX.Element => {
  const { t } = useTranslation()
  return (
    <YStack gap={25}>
      <LabelTitle title={t('screens.details.openingHours')} />
      <XStack justifyContent="space-between">
        <TimeHours
          days={t('screens.details.mondayFriday')}
          times={t('screens.details.time1')} />
        <TimeHours
          days={t('screens.details.saturdaySunday')}
          times={t('screens.details.time2')} />
      </XStack>
    </YStack>
  )
}
export default OpeningHours
