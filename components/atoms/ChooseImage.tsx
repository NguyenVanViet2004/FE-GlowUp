import { Plus } from '@tamagui/lucide-icons'
import * as ImagePicker from 'expo-image-picker'
import React, { useState } from 'react'
import { Alert, useColorScheme } from 'react-native'
import { Button, Image, XStack } from 'tamagui'

import getColors from '~/constants/Colors'

const ChooseImage = (): React.ReactElement => {
  const [selectedImages, setSelectedImages] = useState<string[]>([])
  const colors = getColors(useColorScheme())

  const pickImages = async (): Promise<void> => {
    // Yêu cầu quyền truy cập ảnh
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (!permissionResult.granted) {
      Alert.alert('Permission to access camera roll is required!')
      return
    }

    // Mở trình chọn ảnh với giới hạn 3 ảnh
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Cho phép chọn nhiều ảnh
      selectionLimit: 3 // Giới hạn tối đa 3 ảnh
    })

    if (result.assets != null) {
      const uris = result.assets.map((asset) => asset.uri)
      setSelectedImages(uris)
      // Gọi hàm upload cho từng ảnh
      // uris.forEach(uri => uploadImage(uri));
    }
  }

  //   const uploadImage = async (uri: string) => {
  //     const formData = new FormData();
  //     formData.append('photo', {
  //       uri,
  //       name: 'photo.jpg',
  //       type: 'image/jpeg',
  //     });

  //     try {
  //       const response = await fetch('YOUR_API_ENDPOINT', {
  //         method: 'POST',
  //         body: formData,
  //         headers: {
  //           'Content-Type': 'multipart/form-data',
  //         },
  //       });

  //       const data = await response.json();
  //       Alert.alert('Upload successful', data.message);
  //     } catch (error) {
  //       console.error(error);
  //       Alert.alert('Upload failed', 'Please try again.');
  //     }
  //   };

  return (
    <XStack flex={1} gap={10}>
      {selectedImages.map((uri, index) => (
        <Image
          borderRadius={10}
          key={index}
          source={{ uri }}
          width={72}
          height={72} />
      ))}

      <Button
        onPress={() => { pickImages().catch(console.error) }}
        unstyled
        height={72}
        width={72}
        color={colors.smokeStone}
        fontSize={50}
        icon={<Plus size={24} color={colors.smokeStone} />}
        justifyContent="center"
        alignItems="center"
        borderWidth={1}
        borderColor={colors.smokeStone}
        borderRadius={10}
      />
    </XStack>
  )
}

export default ChooseImage
