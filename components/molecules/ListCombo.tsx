import React, { useState } from 'react'
import { FlatList, useColorScheme } from 'react-native'
import type { ViewProps } from 'tamagui'
import { Text, View } from 'tamagui'

import getColors from '~/constants/Colors'
import { RADIUS_BUTTON } from '~/constants/Constants'
import { useAppFonts } from '~/hooks/useAppFonts'
import type Combo from '~/interfaces/Combo'

interface Props extends ViewProps {
  title: string
  combo: Combo[]
  onSelectCombo: (combo: Combo) => void
}

const ListCombo = (props: Props): React.ReactElement => {
  const { fonts } = useAppFonts()
  const colors = getColors(useColorScheme())
  const isDarkMode = useColorScheme() === 'dark'
  const [selectedCombo, setSelectedCombo] = useState<Combo | null>(null)

  const renderItem = ({ item }: { item: Combo }): React.ReactElement => {
    const isSelected = item.id === selectedCombo?.id

    const backgroundColor = isDarkMode
      ? colors.lightMist
      : (isSelected ? colors.blueSapphire : colors.white)
    return (
      <View
        key={item.id}
        borderWidth={isDarkMode && isSelected
          ? 1
          : 0}
        borderColor={isDarkMode && isSelected
          ? colors.blueSapphire
          : colors.midnightGlow}
        borderRadius={RADIUS_BUTTON}
        backgroundColor={backgroundColor}
        paddingVertical={12}
        paddingHorizontal={10}
        onPress={() => {
          setSelectedCombo(item)
          props.onSelectCombo(item)
        }}
      >
        <Text
          fontSize={12}
          fontFamily={fonts.JetBrainsMonoBold}
          color={isSelected ? colors.white : colors.gray}
        >
          {item.name}
        </Text>
      </View>
    )
  }

  return (
    <View {...props}>
      <Text
        fontSize={18}
        fontFamily={fonts.JetBrainsMonoBold}
        color={colors.text}
        marginBottom={24}
      >
        {props.title}
      </Text>
      <FlatList
        data={props.combo}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View width={8} />}
      />
    </View>
  )
}

export default ListCombo