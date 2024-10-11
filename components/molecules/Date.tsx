import React, { useState } from 'react';
import { Input, ScrollView, Text, View, YStack, Button, XStack } from 'tamagui';

const DatePicker = () => {
  const [selectedDay, setSelectedDay] = useState(10);
  const days = [
    { label: 'Wed', day: 9 },
    { label: 'Thu', day: 10 },
    { label: 'Fri', day: 11 },
    { label: 'Sat', day: 12 },
    { label: 'Sun', day: 13 },
    { label: 'Mon', day: 14 },
  ];

  return (
    <YStack space="$4" alignItems="center">
      <Text fontSize="$6" fontWeight="600">March, 2021</Text>
      <XStack space="$2" alignItems="center">

        {days.map((item) => (
          <Button
            key={item.day}
            onPress={() => setSelectedDay(item.day)}
            backgroundColor={selectedDay === item.day ? '$blue7' : '$gray2'}
            borderRadius="$4"
            paddingHorizontal="$3"
            paddingVertical="$2"
          >
            <Text
              fontSize="$6"
              color={selectedDay === item.day ? '$white' : '$black'}
              fontWeight={selectedDay === item.day ? '600' : '400'}
            >
              {item.label} {'\n'} {item.day}
            </Text>
          </Button>
        ))}

      </XStack>
    </YStack>
  );
};

export default DatePicker;
