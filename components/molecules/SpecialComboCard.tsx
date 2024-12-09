import { useRouter } from 'expo-router'
import { isEmpty } from 'lodash'
import React from 'react'
import {
  Card,
  Image,
  Text,
  View,
  type ViewProps,
  XStack
} from 'tamagui'

import { PositiveButton } from '~/components/atoms/PositiveButton'
import getColors from '~/constants/Colors'
import { RADIUS_BUTTON } from '~/constants/Constants'
import { useColorScheme } from '~/hooks/useColorScheme'
import useTranslation from '~/hooks/useTranslation'
import type Combo from '~/interfaces/Combo'

interface Props extends ViewProps {
  nameCombo: string
  star: string
  view: string
  percent: string
  quantity: string
  comboData: Combo
}
const SpecialComboCard = (props: Props): React.ReactElement => {
  const { colorScheme } = useColorScheme()
  const colors = getColors(colorScheme)
  const { t } = useTranslation()

  const router = useRouter()
  const redirectToComboDetail = (): void => {
    router.push({
      params: { item: JSON.stringify(props.comboData) },
      pathname: '/combo/ComboDetails'
    })
  }

  return (
    <Card
      {...props}
      paddingTop={30}
      paddingBottom={30}
      paddingHorizontal={24}
      borderRadius={RADIUS_BUTTON}
      backgroundColor={colors.lightMist}>
      <XStack gap={10} mb={10}>
        <Image
          source={
            isEmpty(props.comboData.picture)
              ? require('../../assets/images/backGroundDetail.png')
              : { uri: props.comboData.picture }
          }
          height={100}
          width={100}
          borderRadius={10}
        />
        <View flex={1}>
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            fontSize={20}
            flex={1}
            fontWeight={'bold'}
            color={colors.text}>
            {props.nameCombo}
          </Text>

          <Text numberOfLines={2} ellipsizeMode="tail" color={colors.text}>
            {props.comboData.description}
          </Text>
        </View>
      </XStack>
      <PositiveButton
        onPress={() => {
          redirectToComboDetail()
        }}
        title={t('screens.home.bookNow')}
      />
    </Card>
  )
}

export default SpecialComboCard
