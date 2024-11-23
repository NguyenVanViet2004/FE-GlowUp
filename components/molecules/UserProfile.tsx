import { MoonStar, Sun, User2 } from '@tamagui/lucide-icons'
import { isEmpty } from 'lodash'
import React from 'react'
import { useColorScheme } from 'react-native'
import { Avatar, Button, Card, Text, View } from 'tamagui'

import getColors from '~/constants/Colors'
import { RADIUS_BUTTON } from '~/constants/Constants'
import { type Colors } from '~/interfaces/Colors'
import type User from '~/interfaces/User'

interface props {
  user: User
}

const UserProfile = ({ user }: props): JSX.Element => {
  const isDarkMode = useColorScheme() === 'dark'
  const colors: Colors = getColors(useColorScheme())

  return (
    <Card
      gap="$4"
      backgroundColor={colors.lightMist}
      paddingHorizontal="$4"
      paddingVertical="$4"
      flexDirection="row"
      alignItems="center"
      borderRadius={RADIUS_BUTTON}
      elevation={8}
      shadowColor="black"
      shadowOffset={{ height: 2, width: 0 }}
      shadowOpacity={0.3}
      shadowRadius={4}
      justifyContent="flex-start">
      <Avatar
        circular
        size="$4"
        borderWidth={1}
        borderColor="$borderColor" >
        <Avatar.Image
          accessibilityLabel="Cam"
          src={user.result.avatar ??
            'https://xsgames.co/randomusers/avatar.php?g=female'
          }
        />
        <Avatar.Fallback alignItems="center" justifyContent="center">
          <User2 size="$3" color={colors.gray} />
        </Avatar.Fallback>
      </Avatar>
      <View flex={1} flexDirection="column">
        <Text fontSize={18} fontWeight="600" color={colors.text}>
          {isEmpty(user.result.full_name) ? 'Khách' : user.result.full_name}
        </Text>
        <Text color={colors.text}>{isEmpty(user.result.phone_number)
          ? 'Bạn chưa đăng nhập'
          : user.result.phone_number}</Text>
      </View>
      <Button
        icon={isDarkMode
          ? <Sun size={26} fill={colors.yellow} color={colors.yellow} />
          : <MoonStar size={26}
            fill={colors.spaceCadet} color={colors.spaceCadet} />}
        circular
        backgroundColor="$colorTransparent"
        borderWidth={0}
        size={40}
      />
    </Card>
  )
}

export default UserProfile
