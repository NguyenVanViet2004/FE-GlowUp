import React from 'react'
import { FlatList, type LayoutChangeEvent, useColorScheme } from 'react-native'
import { Separator, type TextProps, XStack } from 'tamagui'

import LabelValueRow from '~/components/molecules/LabelValueColumn'
import getColors from '~/constants/Colors'

interface BookingInfo {
  label: string
  value: string
  labelProps?: TextProps
  valueProps?: TextProps
  flex?: number
}

interface BookingInfoSectionProps {
  data: BookingInfo[]
}

const BookingInfoSection: React.FC<BookingInfoSectionProps> = ({ data }) => {
  const [oddIndexWidth, setOddIndexWidth] = React.useState<number | null>(null)
  const colors = getColors(useColorScheme())

  const renderItem = ({
    item,
    index
  }: {
    item: BookingInfo
    index: number
  }): React.ReactElement => (
    <LabelValueRow
      label={item.label}
      value={item.value}
      valueProps={item.valueProps}
      labelProps={item.labelProps}
      flex={item.flex}
      marginBottom={20}
      onLayout={(event: LayoutChangeEvent) => {
        if (index % 2 === 1 && oddIndexWidth === null) {
          const { width } = event.nativeEvent.layout
          setOddIndexWidth(width)
        }
      }}
      width={index % 2 === 1 ? oddIndexWidth : undefined}
    />
  )

  return (
    <>
      <XStack space={20}>
        <FlatList
          data={data}
          numColumns={2}
          renderItem={renderItem}
          scrollEnabled={false}
        />
      </XStack>
      <Separator
        borderColor={colors.lightSilver}
        width="100%" marginTop={10} marginBottom={30} />
    </>
  )
}

export default BookingInfoSection
