import dayjs from 'dayjs'
import { isNil } from 'lodash'
import React from 'react'
import { FlatList } from 'react-native'
import { Image, Sheet, Text, View, XStack, YStack } from 'tamagui'

import getColors from '~/constants/Colors'
import { useColorScheme } from '~/hooks/useColorScheme'
import useFetchStylist from '~/hooks/useFetchStylist'
import { GenderEnum } from '~/interfaces/enum/Gender'
import type Stylist from '~/interfaces/Stylist'

export const overlayStyles = {
  enterStyle: { opacity: 0 },
  exitStyle: { opacity: 0 }
}

const StylistList = (): JSX.Element => {
  const { colorScheme } = useColorScheme()
  const colors = getColors(colorScheme)
  const { stylist } = useFetchStylist()
  const [isOpenBottomSheet, setIsOpenBottomSheet] = React.useState(false)
  const [selectedStylist, setSelectedStylist] = React.useState<Stylist | null>(
    null
  )

  const renderStylistItem = ({
    item
  }: {
    item: Stylist
  }): React.ReactElement => (
    <YStack
      alignItems="center"
      marginBottom={20}
      paddingRight={14}
      onPress={() => {
        setSelectedStylist(item)
        setIsOpenBottomSheet(true)
      }}>
      <Image
        source={
          !isNil(item.avatar) && item.avatar !== ''
            ? { uri: item.avatar }
            : require('~/assets/images/avataDefault.jpg')
        }
        width={72}
        height={72}
        borderRadius={50}
        marginBottom={5}
      />
      <Text fontSize={14} color={colors.text}>
        {item.full_name}
      </Text>
    </YStack>
  )

  return (
    <>
      <FlatList
        data={stylist}
        renderItem={renderStylistItem}
        keyExtractor={(item) => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />

      <Sheet
        forceRemoveScrollEnabled={isOpenBottomSheet}
        modal={true}
        open={isOpenBottomSheet}
        onOpenChange={setIsOpenBottomSheet}
        // snapPoints={snapPoints}
        snapPointsMode="fit"
        dismissOnSnapToBottom
        // position={position}
        // onPositionChange={setPosition}
        zIndex={100_000}
        animation="medium">
        <Sheet.Overlay
          animation="lazy"
          enterStyle={overlayStyles.enterStyle}
          exitStyle={overlayStyles.exitStyle}
        />
        <Sheet.Handle />
        {!isNil(selectedStylist) && (
          <View
            padding={16}
            backgroundColor={colors.inputBackground}
            borderRadius={12}>
            {/* Header Section */}
            <XStack
              justifyContent="space-between"
              alignItems="center"
              marginBottom={16}>
              <Image
                source={
                  !isNil(selectedStylist.avatar) &&
                  selectedStylist.avatar !== ''
                    ? { uri: selectedStylist.avatar }
                    : require('~/assets/images/avataDefault.jpg')
                }
                width={100}
                height={100}
                borderRadius={50}
              />
              <View flex={1} marginLeft={10}>
                <Text
                  fontSize={20}
                  fontWeight="bold"
                  color={colors.text}
                  numberOfLines={1}>
                  {selectedStylist.full_name}
                </Text>
                <XStack>
                  <Text
                    flex={1}
                    fontSize={14}
                    color={colors.text}
                    marginTop={5}>
                    {selectedStylist.role}
                  </Text>
                  <Text
                    flex={1}
                    fontSize={14}
                    color={colors.text}
                    marginTop={5}>
                    <Text color={colors.text} fontWeight="bold">
                      Giới tính:{' '}
                    </Text>
                    {selectedStylist.gender === GenderEnum.MALE ? 'Nam' : 'Nữ'}
                  </Text>
                </XStack>
              </View>
            </XStack>

            {/* Detail Section */}
            <View marginBottom={16}>
              <Text fontSize={16} fontWeight="500" color={colors.text}>
                <Text color={colors.text} fontWeight="bold">
                  Số điện thoại:{' '}
                </Text>
                {selectedStylist.phone_number}
              </Text>
            </View>

            <View marginBottom={16}>
              <Text color={colors.text}>
                Trạng thái:
                <Text
                  fontSize={16}
                  color={
                    isNil(selectedStylist.profile?.stylist?.isWorking) ||
                    selectedStylist.profile?.stylist?.isWorking
                      ? colors.red
                      : colors.green
                  }>
                  {isNil(selectedStylist.profile?.stylist?.isWorking) ||
                  selectedStylist.profile?.stylist?.isWorking
                    ? ' Đang bận'
                    : ' Đang rảnh'}
                </Text>
              </Text>
            </View>

            <View marginBottom={16}>
              <Text fontSize={16} fontWeight="500" color={colors.text}>
                <Text color={colors.text} fontWeight="bold">
                  Ngày sinh:{' '}
                </Text>
                {isNil(selectedStylist.date_of_birth)
                  ? null
                  : dayjs(selectedStylist.date_of_birth).format('DD/MM/YYYY')}
              </Text>
            </View>

            <View marginBottom={16}>
              <Text fontSize={16} fontWeight="500" color={colors.text}>
                <Text color={colors.text} fontWeight="bold">
                  Địa chỉ:{' '}
                </Text>
                {selectedStylist.address}
              </Text>
            </View>
          </View>
        )}
      </Sheet>
    </>
  )
}

export default StylistList
