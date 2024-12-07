import AntDesign from '@expo/vector-icons/AntDesign'
import Entypo from '@expo/vector-icons/Entypo'
import Octicons from '@expo/vector-icons/Octicons'
import DateTimePicker from '@react-native-community/datetimepicker'
import { ChevronLeft } from '@tamagui/lucide-icons'
import * as ImagePicker from 'expo-image-picker'
import { useExpoRouter } from 'expo-router/build/global-state/router-store'
import { isNil } from 'lodash'
import React, { useLayoutEffect, useState } from 'react'
import { Alert } from 'react-native'
import {
  Avatar,
  Button,
  Stack,
  Text,
  View,
  YStack
} from 'tamagui'

import { request } from '~/apis/HttpClient'
import GradientScrollContainer from '~/components/molecules/container/GradientScrollContainer'
import getColors from '~/constants/Colors'
import { useAppFonts } from '~/hooks/useAppFonts'
import { useColorScheme } from '~/hooks/useColorScheme'
import useStorage from '~/hooks/useStorage'
import useTranslation from '~/hooks/useTranslation'
import type User from '~/interfaces/User'

import InputWithIcons from '../atoms/InputWithIcons'
import { PositiveButton } from '../atoms/PositiveButton'
const ProfileSettingTemplate = (): JSX.Element => {
  const fonts = useAppFonts()
  const colors = getColors(useColorScheme().colorScheme)
  const router = useExpoRouter()
  const leftIcon = <ChevronLeft size={25} onPress={() => router.goBack()} />
  const { t } = useTranslation()
  const { getObjectItem } = useStorage()
  const [localUser, setLocalUser] = useState<User | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [avatarUrl, setAvatarUrl] =
  useState<string | null | undefined>(undefined)
  const [birthday, setBirthday] = useState<Date | undefined>(new Date())
  const [showDatePicker, setShowDatePicker] = useState(false)

  const handlePickImage = async (): Promise<void> => {
    const permissionResult =
    await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (!permissionResult.granted) {
      alert('You need to allow access to the photo library.')
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1
    })

    if (!result.canceled) {
      setAvatarUrl(result.assets[0].uri)
    }
  }

  useLayoutEffect(() => {
    const fetchUserLocal = async (): Promise<void> => {
      const userData = await getObjectItem('userData') as User
      if (!isNil(userData)) {
        setLocalUser(userData)
      }
      console.log(userData)
      setBirthday(new Date(userData.result.date_of_birth))
      setAvatarUrl(userData.result.avatar)
    }
    fetchUserLocal().catch((e) => { console.error(e) })
  }, [])

  const pencilIconColor = isEditing ? colors.red : colors.text

  const handleEditPress = (): void => {
    setIsEditing(!isEditing)
  }

  const handleDatePicker = (): void => {
    setShowDatePicker(true)
  }

  const handleSaveChanges = async (userData: any): Promise<void> => {
    try {
      if (userData.result.full_name === undefined ||
          userData.result.phone_number === undefined) {
        Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin!')
        return
      }

      const {
        id,
        role,
        createdAt,
        updatedAt,
        notify_token,
        phone_number,
        ...updatedUserData
      } = userData.result
      const finalUserData = {
        ...updatedUserData,
        avatar: avatarUrl,
        date_of_birth: birthday
      }

      const response =
      await request.patch(`/user/${userData.result.id}`, finalUserData)
      console.log(response)

      if (response?.success === true) {
        setIsEditing(false)
        Alert.alert('Thành công', 'Thông tin đã được cập nhật!')
      } else {
        if (response?.message === 'Invalid access token!') {
          Alert.alert(
            'Hết hạn phiên đăng nhập',
            'Phiên đăng nhập của bạn đã hết hạn. Vui lòng đăng nhập lại.',
            [
              {
                onPress: () => {
                  router.navigate('/authentication/Login')
                },
                text: 'Đăng nhập lại'
              }
            ]
          )
        } else {
          console.error('Lỗi cập nhật:', response.message)
          Alert.alert('Thất bại', response.message ?? 'Đã xảy ra lỗi!')
        }
      }
    } catch (error) {
      console.error('Lỗi khi gửi yêu cầu cập nhật:', error)
      Alert.alert('Lỗi', 'Không thể cập nhật thông tin. Vui lòng thử lại.')
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
      <YStack flex={1} padding="$4">
        <YStack alignItems="center" marginBottom="$6">
          <Avatar
            circular
            size="$12"
            borderWidth={1}
            borderColor="$borderColor">
            <Avatar.Image
              accessibilityLabel="Profile Avatar"
              src={avatarUrl ??
                'https://xsgames.co/randomusers/avatar.php?g=female'}
            />
          </Avatar>
          {isEditing && (
            <Button
              pos="absolute"
              bottom={0}
              right="35%"
              size="$3"
              circular
              backgroundColor={colors.gray}
              icon={<Entypo name="camera" size={24} color="black" />}
              borderWidth={2}
              onPress={handlePickImage}
            />
          )}
        </YStack>

        <View flex={1} flexDirection="column">
          <Text
            fontSize={18}
            fontFamily={fonts.fonts.JetBrainsMonoBold}
            fontWeight="600"
            color={colors.text}
            textAlign="center">
            {localUser?.result.full_name}
          </Text>
        </View>

        <Stack space="$4" marginTop={20}>

          <InputWithIcons
            placeholder= "Họ tên"
            value={localUser?.result.full_name ?? ''}
            editable={isEditing}
            onChangeText={(text) => {
              if (localUser !== null) {
                setLocalUser({
                  ...localUser,
                  result: { ...localUser.result, full_name: text }
                })
              }
            }}/>
          <InputWithIcons
            placeholder= "Quê quán"
            value={localUser?.result.address ?? ''}
            editable={isEditing}
            onChangeText={(text) => {
              if (localUser !== null) {
                setLocalUser({
                  ...localUser,
                  result: { ...localUser.result, address: text }
                })
              }
            }}/>

          <InputWithIcons
            placeholder="Ngày sinh"
            value={birthday !== undefined
              ? birthday.toLocaleDateString()
              : 'Chưa có ngày sinh'}
            editable={false}
            iconLeft={
              isEditing && (
                <AntDesign
                  name="calendar"
                  size={24}
                  color="black"
                  onPress={handleDatePicker}
                />
              )
            }
          />

          {showDatePicker && (
            <DateTimePicker
              value={birthday ?? new Date()}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={(event, selectedDate) => {
                setShowDatePicker(false)
                if (selectedDate) {
                  setBirthday(selectedDate)
                  if (localUser) {
                    setLocalUser({
                      ...localUser,
                      result: {
                        ...localUser.result,
                        date_of_birth: selectedDate.toISOString()
                      }
                    })
                  }
                }
              }}
            />
          )}

        </Stack>

        {isEditing && (
          <PositiveButton marginTop={30} title="Lưu thay đổi"
            onPress={() => {
              handleSaveChanges(localUser)
                .catch((e) => { console.log(e) })
            }}/>
        )}
      </YStack>
    </GradientScrollContainer>

  )
}

export default ProfileSettingTemplate
