import { useRouter } from 'expo-router'
import { isEmpty } from 'lodash'
import React from 'react'
import { useColorScheme } from 'react-native'
import {
  Button,
  Card,
  Image,
  Text,
  View,
  type ViewProps,
  XStack
} from 'tamagui'

import DiscountBadge from '~/components/atoms/DiscountBadge'
import { PositiveButton } from '~/components/atoms/PositiveButton'
import ReviewInfo from '~/components/atoms/ReviewInfo'
import getColors from '~/constants/Colors'
import { RADIUS_BUTTON } from '~/constants/Constants'
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
  const colors = getColors(useColorScheme())
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
      paddingTop={40}
      paddingBottom={28}
      paddingHorizontal={24}
      borderRadius={RADIUS_BUTTON}
      backgroundColor={colors.lightMist}>
      <XStack gap={10}>
        <Image
          source={
            isEmpty(props.comboData.picture)
              ? require('../../assets/images/backGroundDetail.png')
              : { uri: props.comboData.picture }
          }
          height={70}
          width={50}
          flex={1}
          borderRadius={10}
        />
        <View>
          <Text fontSize={20} fontWeight={'bold'} color={colors.text}>
            {props.nameCombo}
          </Text>
          <XStack marginVertical={21} gap={22}>
            <ReviewInfo star={props.star} view={props.view} />
            <DiscountBadge percent={props.percent} quantity={props.quantity} />
          </XStack>
        </View>
      </XStack>
      <PositiveButton
        onPress={() => {
          redirectToComboDetail()
        }}
        title={t('screens.home.bookNow')}
      />
      <Button
        fontWeight={'bold'}
        paddingVertical={8}
        paddingLeft={16}
        paddingRight={24}
        unstyled
        backgroundColor={colors.lightYellow}
        color={colors.deepOrange}
        position="absolute"
        top={24}
        right={0}
        borderTopLeftRadius={50}
        borderBottomLeftRadius={50}
        borderTopRightRadius={0}
        borderBottomRightRadius={0}>
        {t('screens.home.open')}
      </Button>
    </Card>
  )
}

export default SpecialComboCard
