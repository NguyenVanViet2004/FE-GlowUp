import React, { FC, useState } from 'react';
import { useColorScheme } from 'react-native';
import { Input, ScrollView, Text, View, YStack, Avatar, Stack } from 'tamagui';
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Header from '~/components/molecules/Header';
import getColors from '~/constants/Colors';
import useTranslation from '~/hooks/useTranslation';

import Specialist from '../organisms/Specialist';
import DatePicker from '../molecules/Date';
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

const SpecialistTemplate: FC = () => {
  const colorScheme = useColorScheme();
  const colors = getColors(colorScheme);
  const { t } = useTranslation();
  

  return (
    <View padding={20}>
      <Header
        backIcon={
          <FontAwesome5 name="chevron-left" size={20} color={colors.text} />
        }
        title={t('header.title', 'hehe boy')}
        subtitle={t('header.subtitle', 'bôi')}
      />
      <Specialist/>
      {/* <DatePicker/> */}
    </View>
  );
};

export default SpecialistTemplate;  