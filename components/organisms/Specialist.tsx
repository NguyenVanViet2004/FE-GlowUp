import Feather from '@expo/vector-icons/Feather'
import { fonts } from '@tamagui/config/v3'
import React, { useState } from 'react'
import { StyleSheet, useColorScheme } from 'react-native'
import { Avatar, Stack, Text, View } from 'tamagui'

import getColors from '~/constants/Colors'

interface User {
  name: string
  image: string
}

const users: User[] = [
  { image: require('~/assets/images/Ellipse13.png'), name: 'Ronald' },
  { image: require('~/assets/images/Ellipse13.png'), name: 'Ronald' },
  { image: require('~/assets/images/Ellipse13.png'), name: 'Ronald' },
  { image: require('~/assets/images/Ellipse13.png'), name: 'Ronald' }
]

const Specialist: React.FC = () => {
  const colorScheme = useColorScheme()
  const colors = getColors(colorScheme)
  const [selectedUserIndex, setSelectedUserIndex] =
   useState<number | null>(null)

  const handleAvatarPress = (index: number): void => {
    setSelectedUserIndex(index === selectedUserIndex ? null : index)
  }

  return (
    <View padding={10}>
      <Text >Special list</Text>
      <Stack flexDirection="row" alignItems="center" gap="$2" marginTop="$3.5">
        {users.map((user, index) => (
          <Stack
            key={index}
            alignItems="center"
            onPress={() => { handleAvatarPress(index) }}
          >
            <Avatar
              circular
              size={80}
              borderWidth={index === selectedUserIndex ? 3 : 0}
              borderColor= {colors.labelButton}
              style={index === selectedUserIndex && styles.avatarSelected}
            >
              <Avatar.Image source={{ uri: user.image }} />
              {index === selectedUserIndex && (
                <Feather
                  name="check"
                  size={24}
                  color={colors.labelButton}
                  style={styles.checkIcon}
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

const styles = StyleSheet.create({
  avatarSelected: {
    opacity: 0.5
  },
  checkIcon: {
    left: '50%',
    position: 'absolute',
    top: '50%',
    transform: [{ translateX: -12 }, { translateY: -12 }]
  }
})

export default Specialist
