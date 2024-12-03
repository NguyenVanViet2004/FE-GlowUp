import { ChevronRight } from '@tamagui/lucide-icons'
import React from 'react'
import { Card, ListItem, Text } from 'tamagui'

import { SettingListData } from '~/constants/SettingListData'
import { type Colors } from '~/interfaces/Colors'

interface props {
  colors: Colors
}

const SettingList = ({ colors }: props): React.JSX.Element[] =>
  SettingListData().map((card, index) => (
    <Card
      key={card.key}
      backgroundColor={colors.lightMist}
      borderRadius={4}
      elevation={8}
      shadowColor="black"
      shadowOffset={{ height: 2, width: 0 }}
      shadowOpacity={0.3}
      shadowRadius={4}
      marginTop={index === 0 ? 20 : 0}
      paddingVertical="$1">
      {card.items.map((item, index) => (
        <ListItem
          backgroundColor={colors.lightMist}
          hoverTheme
          size="$4.5"
          pressTheme
          key={index}
          onPress={item.onPress}
          iconAfter={<ChevronRight color={colors.text} />}
          borderBottomColor="$gray6Light"
          icon={<item.icon size={20} color={colors.text} />}
          title={
            <Text alignSelf="baseline" color={colors.text}>
              {item.title}
            </Text>
          }
          borderBottomWidth={index !== card.items.length - 1 ? 0.2 : 0}
          borderColor="gray"
        />
      ))}
    </Card>
  ))

export default SettingList
