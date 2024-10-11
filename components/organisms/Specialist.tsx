import React, { FC, useState } from 'react';
import { useColorScheme } from 'react-native';
import { Input, ScrollView, Text, View, YStack, Avatar, Stack } from 'tamagui';
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Header from '~/components/molecules/Header';
import getColors from '~/constants/Colors';
import useTranslation from '~/hooks/useTranslation';
import Feather from '@expo/vector-icons/Feather';
type User = {
  name: string;
  image: string;
};

const users: User[] = [
  { name: 'Ronald', image: require('~/assets/images/Ellipse13.png') },
  { name: 'Ronald', image: require('~/assets/images/Ellipse13.png') },
  { name: 'Ronald', image: require('~/assets/images/Ellipse13.png') },
  { name: 'Ronald', image: require('~/assets/images/Ellipse13.png') },
];
const Specialist = () => {
    const colorScheme = useColorScheme();
    const colors = getColors(colorScheme);
    const { t } = useTranslation();
    const [selectedUserIndex, setSelectedUserIndex] = useState<number | null>(null);
  
    const handleAvatarPress = (index: number) => {
      setSelectedUserIndex(index === selectedUserIndex ? null : index);
    };
  
  return (
    <View>
       <Text>Special list</Text>
      <Stack flexDirection="row" alignItems="center" gap="$2" marginTop='$3.5'>
        {users.map((user, index) => (
          <Stack
            key={index}
            alignItems="center"
            onPress={() => handleAvatarPress(index)}
          >
            <Avatar
              circular
              size={80}
              borderWidth={index === selectedUserIndex ? 3 : 0} // Viền dày khi được chọn, không viền khi không được chọn
              borderColor="black" // Viền màu đen khi được chọn
              style={{
                opacity: index === selectedUserIndex ? 0.5 : 1, // Làm mờ ảnh khi được chọn
              }}
            >
              <Avatar.Image source={{ uri: user.image }} />
              {index === selectedUserIndex && (
                <Feather
                  name="check"
                  size={24}
                  color={colors.text}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: [{ translateX: -12 }, { translateY: -12 }], // Căn giữa biểu tượng
                  }}
                />
              )}
            </Avatar>
            <Text>{user.name}</Text>
          </Stack>
        ))}
      </Stack>
    </View>
  )
}

export default Specialist