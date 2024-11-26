import Entypo from '@expo/vector-icons/Entypo'
import Octicons from '@expo/vector-icons/Octicons'
import { ChevronLeft } from '@tamagui/lucide-icons'
import { useExpoRouter } from 'expo-router/build/global-state/router-store'
import { isEmpty, isNil } from 'lodash'
import React, { useLayoutEffect, useState } from 'react'
import { Alert, useColorScheme } from 'react-native'
import {
  Avatar,
  Button,
  Input,
  Stack,
  Text,
  View,
  YStack
} from 'tamagui'

import GradientScrollContainer from '~/components/molecules/container/GradientScrollContainer'
import getColors from '~/constants/Colors'
import { useAppFonts } from '~/hooks/useAppFonts'
import useStorage from '~/hooks/useStorage'
import useTranslation from '~/hooks/useTranslation'
import type User from '~/interfaces/User'

const ProfileSettingTemplate = (): JSX.Element => {
  const fonts = useAppFonts()
  const colors = getColors(useColorScheme())
  const router = useExpoRouter()
  const leftIcon = <ChevronLeft size={25} onPress={() => router.goBack()} />
  const { t } = useTranslation()
  const { getObjectItem } = useStorage()
  const [localUser, setLocalUser] = useState<User | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  // Fetch user data from local storage
  const fetchUserLocal = async (): Promise<void> => {
    const userData = await getObjectItem('userData') as User
    if (!isNil(userData)) {
      setLocalUser(userData)
    }
    console.log(userData)
  }

  useLayoutEffect(() => {
    fetchUserLocal().catch((e) => { console.error(e) })
  }, [])

  const displayName = (localUser)
    ? (isEmpty(localUser.result.full_name)
      ? 'Khách'
      : localUser.result.full_name)
    : 'Loading...'

  const avatarUrl = localUser?.result.avatar || 'https://xsgames.co/randomusers/avatar.php?g=female'

  const pencilIconColor = isEditing ? colors.red : 'black'

  const handleEditPress = () => {
    if (!isEditing) {
      Alert.alert(
        'Xác nhận',
        'Bạn có chắc chắn muốn thay đổi thông tin?',
        [
          {
            onPress: () => { setIsEditing(false) },
            style: 'cancel',
            text: 'Không'
          },
          {
            onPress: () => { setIsEditing(true) },
            style: 'default',
            text: 'Có'
          }
        ]
      )
    } else {
      setIsEditing(false)
    }
  }

  return (
    <GradientScrollContainer
      paddingHorizontal={0}
      edges={['left', 'right', 'bottom']}
      headerTitle={t('Thông tin của bạn')}
      isHeaderCenter={true}
      leftIcon={leftIcon}
      rightIcon={<Octicons
        name="pencil"
        size={24}
        color={pencilIconColor}
        onPress={handleEditPress} />}
      paddingTop={20}
    >
      <YStack flex={1} bg="$background" padding="$4">
        {/* Profile Photo */}
        <YStack alignItems="center" marginBottom="$6">
          <Avatar
            circular
            size="$12"
            borderWidth={1}
            borderColor="$borderColor">
            <Avatar.Image
              accessibilityLabel="Profile Avatar"
              src={avatarUrl}
            />
          </Avatar>
          <Button
            pos="absolute"
            bottom={0}
            right="35%"
            size="$3"
            circular
            bg="$primary"
            icon={<Entypo name="camera" size={24} color="black" />}
            borderWidth={2}
            borderColor="$background"
          />
        </YStack>

        {/* Display Name */}
        <View flex={1} flexDirection="column">
          <Text
            fontSize={18}
            fontFamily={fonts.fonts.JetBrainsMonoBold}
            fontWeight="600"
            color={colors.text}
            textAlign="center">
            {displayName}
          </Text>
        </View>

        {/* Form Fields */}
        <Stack space="$4" marginTop={20}>
          <YStack space="$2">
            <Text
              color="$color"
              fontFamily={fonts.fonts.JetBrainsMonoBold}>Tên của bạn</Text>
            <Input
              f={1}
              value={localUser?.result.full_name || ''} // Set value from localUser
              placeholder="Điền tên đầy đủ"
              placeholderTextColor="$gray9"
              backgroundColor={colors.lightGray}
              borderWidth={0}
              pl="$2"
              color={colors.black}
              editable={isEditing} // Only editable if isEditing is true
            />
          </YStack>

          <YStack space="$2">
            <Text
              color="$color"
              fontFamily={fonts.fonts.JetBrainsMonoBold}>Số điện thoại</Text>
            <Input
              f={1}
              value={localUser?.result.phone_number || ''} // Set value from localUser
              placeholder="Điền số điện thoại"
              placeholderTextColor="$gray9"
              backgroundColor={colors.lightGray}
              borderWidth={0}
              pl="$2"
              color={colors.black}
              editable={isEditing} // Only editable if isEditing is true
            />
          </YStack>
        </Stack>
      </YStack>
    </GradientScrollContainer>
  )
}

export default ProfileSettingTemplate
