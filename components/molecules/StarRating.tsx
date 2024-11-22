import { StarFull } from '@tamagui/lucide-icons'
import React from 'react'
import { useColorScheme } from 'react-native'
import { XStack } from 'tamagui'

import getColors from '~/constants/Colors'

interface StarRatingProps {
  rating: number // Property to represent the number of stars
  maxStars?: number // Maximum number of stars, default is 5
}

const StarRating: React.FC<StarRatingProps> = ({ rating, maxStars = 5 }) => {
  const fullStars = Math.floor(rating) // Get the whole number of stars
  const halfStar = rating % 1 >= 0.5 // Determine if a half-star should be shown
  const emptyStars = maxStars - fullStars - (halfStar ? 1 : 0) // Remaining empty stars

  const colors = getColors(useColorScheme())
  return (
    <XStack >
      {/* Render full stars */}
      {[...Array(fullStars)].map((_, index) => (
        <StarFull key={`full-${index}`} size={12} color={colors.sunsetOrange} />
      ))}
      {/* Render half star if applicable */}
      {halfStar && <StarFull key="half" size={12} color={colors.smokeStone} />}
      {/* Render empty stars */}
      {[...Array(emptyStars)].map((_, index) => (
        <StarFull key={`empty-${index}`} size={12} color={colors.smokeStone} />
      ))}
    </XStack>
  )
}

export default StarRating
