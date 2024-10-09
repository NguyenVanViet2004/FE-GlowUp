import React, { FC } from 'react';
import { useColorScheme } from 'react-native';
import { Input, ScrollView, Text, View, YStack, Avatar, Stack } from 'tamagui';
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Header from '~/components/molecules/Header';
import getColors from '~/constants/Colors';
import useTranslation from '~/hooks/useTranslation';

type User = {
  name: string;
  imageUri: string;
};

const users: User[] = [
  { name: 'Ronald', imageUri: 'https://media.istockphoto.com/id/1332100919/vector/man-icon-black-icon-person-symbol.jpg?s=612x612&w=0&k=20&c=AVVJkvxQQCuBhawHrUhDRTCeNQ3Jgt0K1tXjJsFy1eg=' },
  { name: 'Ronald', imageUri: 'https://media.istockphoto.com/id/1332100919/vector/man-icon-black-icon-person-symbol.jpg?s=612x612&w=0&k=20&c=AVVJkvxQQCuBhawHrUhDRTCeNQ3Jgt0K1tXjJsFy1eg=' },
  { name: 'Ronald', imageUri: 'https://media.istockphoto.com/id/1332100919/vector/man-icon-black-icon-person-symbol.jpg?s=612x612&w=0&k=20&c=AVVJkvxQQCuBhawHrUhDRTCeNQ3Jgt0K1tXjJsFy1eg=' },
  { name: 'Ronald', imageUri: 'https://media.istockphoto.com/id/1332100919/vector/man-icon-black-icon-person-symbol.jpg?s=612x612&w=0&k=20&c=AVVJkvxQQCuBhawHrUhDRTCeNQ3Jgt0K1tXjJsFy1eg=' },
];

const SpecialistTemplate: FC = () => {
  const colorScheme = useColorScheme();
  const colors = getColors(colorScheme);
  const { t } = useTranslation();

  return (
    <View flexGrow={1}>
      <Header
        backIcon={
          <FontAwesome5 name="chevron-left" size={20} color={colors.text} />
        }
        title={t('header.title', 'hehe boy')}
        subtitle={t('header.subtitle', 'bôi')}
      />
      <Stack flexDirection="row" alignItems="center" gap="$2">
        {users.map((user, index) => (
          <Stack key={index} alignItems="center">
            <Avatar circular size={60} borderWidth={index === 0 ? 2 : 0} borderColor={index === 0 ? colors.text : 'transparent'}>
              <Avatar.Image source={{ uri: user.imageUri }} />
            </Avatar>
            <Text>{user.name}</Text>
          </Stack>
        ))}
      </Stack>
    </View>
  );
};

export default SpecialistTemplate;
