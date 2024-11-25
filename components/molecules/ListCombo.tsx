import React from 'react'
import { FlatList, StyleSheet, useColorScheme } from 'react-native'
import type { ViewProps } from 'tamagui'
import { Text, View } from 'tamagui'

import getColors from '~/constants/Colors'
import { RADIUS_BUTTON } from '~/constants/Constants'
import { useAppFonts } from '~/hooks/useAppFonts'
import type Combo from '~/interfaces/Combo'

import LabelTitle from '../atoms/LabelTitle'

interface Props extends ViewProps {
  title: string
  combo: Combo[]
  onSelectCombo: (combo: Combo) => void
  comboIdSelected: string
}

const ListCombo = (props: Props): React.ReactElement => {
  const { fonts } = useAppFonts()
  const colors = getColors(useColorScheme())
  const isDarkMode = useColorScheme() === 'dark'

  const renderItem = ({ item }: { item: Combo }): React.ReactElement => {
    const isSelected = item.id === props.comboIdSelected

    const backgroundColor = isDarkMode
      ? colors.lightMist
      : (isSelected ? colors.blueSapphire : colors.white)
    return (
      <View
        key={item.id}
        borderWidth={1}
        borderColor={isSelected
          ? colors.blueSapphire
          : colors.gray}
        borderRadius={RADIUS_BUTTON}
        backgroundColor={backgroundColor}
        paddingVertical={12}
        paddingHorizontal={10}
        onPress={() => { props.onSelectCombo(item) }}>
        <Text
          fontSize={12}
          fontFamily={fonts.JetBrainsMonoBold}
          color={isSelected ? colors.white : colors.gray}>
          {item.name}
        </Text>
      </View>
    )
  }

  return (
    <View {...props}>
      <LabelTitle
        title={'Gói dịch vụ'}
        subTitle={'Xem tất cả'}
      />
      <FlatList
        data={props.combo}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        contentContainerStyle={styles.flatList}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View width={8} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  flatList: {
    marginTop: 24
  }
})

export default ListCombo
