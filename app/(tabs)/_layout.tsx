import Ionicons from '@expo/vector-icons/Ionicons'
import { CalendarDays, Home, Search } from '@tamagui/lucide-icons'
import { Tabs } from 'expo-router'
import React from 'react'
import { Platform } from 'react-native'

import Colors from '~/constants/Colors'
import { RADIUS_BUTTON } from '~/constants/Constants'
import { useAppFonts } from '~/hooks/useAppFonts'
import { useColorScheme } from '~/hooks/useColorScheme'
import useTranslation from '~/hooks/useTranslation'

const BottomTab = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { fonts } = useAppFonts()
  const { colorScheme } = useColorScheme()

  return (
    <Tabs screenOptions={{
      headerShown: false,
      lazy: false,
      tabBarActiveTintColor: Colors(colorScheme).blue,
      tabBarInactiveTintColor: Colors(colorScheme).gray,
      tabBarLabelStyle: {
        fontFamily: fonts.JetBrains
      },

      tabBarStyle: {
        borderRadius: RADIUS_BUTTON,
        borderTopWidth: 0,
        bottom: 30,
        left: 20,
        position: 'absolute',
        right: 20,
        ...Platform.select({
          android: {
            elevation: 8
          },
          ios: {
            shadowColor: '#000',
            shadowOffset: { height: 2, width: 0 },
            shadowOpacity: 0.3,
            shadowRadius: 4
          }
        }),
        backgroundColor: Colors(colorScheme).lightMist,
        height: 70,
        paddingBottom: 10
      },
      // keepScreenMounted: true,
      unmountOnBlur: false
    }}>
      <Tabs.Screen name="home" options={{
        freezeOnBlur: true,
        tabBarIcon: ({ color }) => <Home color={color} size={24}/>,
        tabBarLabel: t('screens.home.title'),
        tabBarTestID: 'home-tab'
      }} />

      <Tabs.Screen name="booking" options={{
        freezeOnBlur: true,
        tabBarIcon: ({ color }) => <CalendarDays color={color} size={24}/>,
        tabBarLabel: t('screens.booking.title'),
        tabBarTestID: 'booking-tab'
      }} />

      <Tabs.Screen name="search" options={{
        freezeOnBlur: true,
        tabBarIcon: ({ color }) => <Search color={color} size={24}/>,
        tabBarLabel: t('screens.search.title'),
        tabBarTestID: 'search-tab'
      }} />

      <Tabs.Screen name="profile" options={{
        freezeOnBlur: true,
        tabBarIcon: ({ color }) =>
          <Ionicons name="person-outline" size={24} color={color} />,
        tabBarLabel: t('screens.profile.title'),
        tabBarTestID: 'profile-tab'
      }} />
    </Tabs>
  )
}

export default BottomTab
