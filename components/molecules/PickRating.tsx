import { StarFull } from '@tamagui/lucide-icons' // Icon mới bạn muốn sử dụng
import React, { useState } from 'react'
import { useColorScheme } from 'react-native'
import { Button, View } from 'tamagui'

import getColors from '~/constants/Colors'

interface PickRatingProps {
  maxRating?: number
  size?: number
  defaultRating?: number
  onRatingChange?: (rating: number) => void
}

const PickRating: React.FC<PickRatingProps> = ({
  maxRating = 5,
  size = 24,
  defaultRating = 1,
  onRatingChange
}) => {
  const colors = getColors(useColorScheme())
  const [rating, setRating] = useState<number>(defaultRating)

  const handleRating = (star: number): void => {
    setRating(star)
    if (onRatingChange != null) {
      onRatingChange(star)
    }
  }

  return (
    <View flexDirection="row" gap={8}>
      {Array.from({ length: maxRating }, (_, index) => (
        <Button
          unstyled
          key={index}
          onPress={() => { handleRating(index + 1) }}
          icon={
            <StarFull
              size={size}
              color={index < rating ? colors.sunsetOrange : colors.smokeStone}
              fill={index < rating ? colors.sunsetOrange : 'rgba(0, 0, 0, 0)'}
              strokeWidth={1}
            />
          }
        />
      ))}
    </View>
  )
}

export default PickRating
