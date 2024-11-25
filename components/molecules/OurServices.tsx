import React from 'react'
import { YStack } from 'tamagui'

import LabelTitle from '~/components/atoms/LabelTitle'
import StepList from '~/components/organisms/StepList'
import useTranslation from '~/hooks/useTranslation'

interface Props {
  data: any
}

const OurServices = (props: Props): React.ReactElement => {
  const { t } = useTranslation()
  return (
    <YStack gap={30}>
      <LabelTitle title={t('screens.details.ourServices')} />

      <StepList
        dataStep={props.data}
      />
    </YStack>
  )
}

export default OurServices
