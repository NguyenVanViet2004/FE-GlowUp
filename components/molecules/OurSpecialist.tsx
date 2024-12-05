import { useRouter } from 'expo-router'
import React from 'react'
import { YStack } from 'tamagui'

import LabelTitle from '~/components/atoms/LabelTitle'
import StylistList from '~/components/organisms/StylistList'
import useTranslation from '~/hooks/useTranslation'

const OurSpecialist = (): JSX.Element => {
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <YStack gap={25}>
      <LabelTitle
        title={t('screens.details.ourSpecialist')}
        subTitle={t('screens.details.viewAll')}
        onPress={() => { router.push('/combo/viewAll/ShowAllStylist') }}
      />
      <StylistList/>
    </YStack>
  )
}

export default OurSpecialist
