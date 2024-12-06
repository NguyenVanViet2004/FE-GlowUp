import { ChevronLeft, ChevronRight } from '@tamagui/lucide-icons'
import { useRouter } from 'expo-router'
import { isEmpty, isNil } from 'lodash'
import React from 'react'
import { Card, Image, Text, View, XStack } from 'tamagui'

import Loading from '~/components/atoms/Loading'
import GradientScrollContainer from '~/components/molecules/container/GradientScrollContainer'
import getColors from '~/constants/Colors'
import { RADIUS_BUTTON } from '~/constants/Constants'
import { useAppFonts } from '~/hooks/useAppFonts'
import { useColorScheme } from '~/hooks/useColorScheme'
import useFetchCombo from '~/hooks/useFetchCombo'
import type Combo from '~/interfaces/Combo'

const ShowAllComboTemplate = (): React.ReactElement => {
  const { combos, isLoading } = useFetchCombo()
  const router = useRouter()
  const { fonts } = useAppFonts()
  const colors = getColors(useColorScheme().colorScheme)
  const leftIcon = (
    <ChevronLeft
      size={25}
      color={colors.text}
      onPress={() => { router.back() }}
      hitSlop={{
        bottom: 100,
        left: 100,
        right: 100,
        top: 100
      }}
    />
  )
  const rightIcon = <ChevronRight size={25} opacity={0} />

  const redirectToComboDetail = (data: Combo): void => {
    router.push({
      params: { item: JSON.stringify(data) },
      pathname: '/combo/ComboDetails'
    })
  }

  return (
    <GradientScrollContainer
      headerTitle={'Dịch vụ của chúng tôi'}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      isHeaderCenter={true}>
      {isLoading ? <Loading /> : null}

      {!isLoading &&
        combos.map((item, index) => (
          <Card
            key={`${item.id} - ${index}`}
            backgroundColor={colors.lightMist}
            borderWidth={0.2}
            borderColor={colors.gray}
            mb={15}
            onPress={() => { redirectToComboDetail(item) }}
            p={10}>
            <XStack gap={10}>
              <Image
                width={100}
                height={100}
                borderRadius={RADIUS_BUTTON}
                source={
                  !isEmpty(item.picture) && !isNil(item.picture)
                    ? { uri: item.picture }
                    : require('../../assets/images/backGroundDetail.png')
                }
              />
              <View flex={1}>
                <Text
                  textAlign="center"
                  color={colors.text}
                  mb={20}
                  fontFamily={fonts.JetBrainsMonoBold}>
                  {item.name}
                </Text>

                <Text
                  numberOfLines={3}
                  ellipsizeMode="tail"
                  color={colors.text}>
                  {item.description}
                </Text>
              </View>
            </XStack>
          </Card>
        ))}
    </GradientScrollContainer>
  )
}

export default ShowAllComboTemplate
