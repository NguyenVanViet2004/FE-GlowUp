import React from 'react'
import { View, YStack } from 'tamagui'

import LabelTitle from '~/components/atoms/LabelTitle'
import StepList from '~/components/organisms/StepList'
import useTranslation from '~/hooks/useTranslation'

const OurServices = (): React.ReactElement => {
  const { t } = useTranslation()
  return (
    <YStack gap={30}>
      <LabelTitle title={t('screens.details.ourServices')} />

      <View>
        <StepList />
      </View>
    </YStack>
  )
}

export default OurServices
