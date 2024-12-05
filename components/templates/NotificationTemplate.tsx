import { ChevronLeft, ChevronRight } from '@tamagui/lucide-icons'
import { useRouter } from 'expo-router'
import React from 'react'
import { View } from 'tamagui'

import GradientScrollContainer from '~/components/molecules/container/GradientScrollContainer'
import LabelNotification from '~/components/molecules/LabelNotification'
import getColors from '~/constants/Colors'
import { useColorScheme } from '~/hooks/useColorScheme'
import useTranslation from '~/hooks/useTranslation'

const NotificationTemplate = (): React.ReactElement => {
  const colors = getColors(useColorScheme().colorScheme)
  const router = useRouter()
  const leftIcon =
    <ChevronLeft
      color={colors.text}
      size={25} onPress={() => { router.back() }}/>
  const rightIcon = <ChevronRight size={25} opacity={0} />
  const { t } = useTranslation()
  return (
    <GradientScrollContainer
      paddingHorizontal={0}
      edges={['left', 'right', 'bottom']}
      headerTitle={t('Thông báo')}
      isHeaderCenter={true}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      paddingTop={20}>
      <View>
        <LabelNotification
          label="Reminder! . Get ready for your appointment at 9am"
          time="11.32 PM"
        />
        <LabelNotification
          label="Reminder! . Get ready for your appointment at 9am"
          time="11.32 PM"
        />
        <LabelNotification
          label="Reminder! . Get ready for your appointment at 9am"
          time="11.32 PM"
        />
        <LabelNotification
          label="Reminder! . Get ready for your appointment at 9am"
          time="11.32 PM"
        />
        <LabelNotification
          label="Reminder! . Get ready for your appointment at 9am"
          time="11.32 PM"
        />
      </View>

    </GradientScrollContainer>
  )
}

export default NotificationTemplate
