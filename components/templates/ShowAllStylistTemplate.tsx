import { ChevronLeft, ChevronRight } from '@tamagui/lucide-icons'
import { useRouter } from 'expo-router'
import { isEmpty, isNil } from 'lodash'
import React from 'react'
import { useSelector } from 'react-redux'
import { Card, Image, Text, View, XStack } from 'tamagui'

import GradientScrollContainer from '~/components/molecules/container/GradientScrollContainer'
import getColors from '~/constants/Colors'
import { RADIUS_BUTTON } from '~/constants/Constants'
import { useAppFonts } from '~/hooks/useAppFonts'
import { useColorScheme } from '~/hooks/useColorScheme'
import { GenderEnum } from '~/interfaces/enum/Gender'
import { type RootState } from '~/redux/store'

const ShowAllStylistTemplate = (): React.ReactElement => {
  const stylist = useSelector((state: RootState) => state.stylists)
  const router = useRouter()
  const { fonts } = useAppFonts()
  const colors = getColors(useColorScheme().colorScheme)
  const leftIcon = (
    <ChevronLeft
      size={25}
      color={colors.text}
      onPress={() => {
        router.back()
      }}
      hitSlop={{
        bottom: 100,
        left: 100,
        right: 100,
        top: 100
      }}
    />
  )
  const rightIcon = <ChevronRight size={25} opacity={0} />

  return (
    <GradientScrollContainer
      headerTitle={'Nhân viên của chúng tôi'}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      isHeaderCenter={true}>
      {stylist.map((item, index) => (
        <Card
          key={`${item.id} - ${index}`}
          backgroundColor={colors.lightMist}
          borderWidth={0.2}
          borderColor={colors.gray}
          opacity={
            isNil(item.profile?.stylist?.isWorking) ||
            (!isNil(item.profile?.stylist?.isWorking) &&
              !item.profile?.stylist?.isWorking)
              ? 0.5
              : 1
          }
          mb={15}
          // onPress={() => redirectToComboDetail(item)}
          p={10}>
          <XStack gap={10}>
            <Image
              width={100}
              height={100}
              borderRadius={RADIUS_BUTTON}
              source={
                !isEmpty(item.avatar) && !isNil(item.avatar)
                  ? { uri: item.avatar }
                  : require('../../assets/images/backGroundDetail.png')
              }
            />
            <View flex={1}>
              <Text
                textAlign="center"
                color={colors.text}
                mb={20}
                fontFamily={fonts.JetBrainsMonoBold}>
                {item.full_name}
              </Text>

              <Text numberOfLines={3} ellipsizeMode="tail" color={colors.text}>
                {item.gender === GenderEnum.MALE
                  ? 'Giới tính: Nam'
                  : 'Giới tính: Nữ'}
              </Text>

              <Text numberOfLines={3} ellipsizeMode="tail" color={colors.text}>
                {`Chức vụ: ${item.role}`}
              </Text>

              <Text numberOfLines={3} ellipsizeMode="tail" color={colors.text}>
                {`Kinh nghiệm: ${
                  !isNil(item.profile?.stylist?.experience)
                    ? item.profile?.stylist?.experience
                    : '1 tháng'
                }`}
              </Text>
            </View>
          </XStack>
        </Card>
      ))}
    </GradientScrollContainer>
  )
}

export default ShowAllStylistTemplate
