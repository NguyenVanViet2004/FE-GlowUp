import { type ColorSchemeName } from 'react-native'

import { type Colors } from '~/interfaces/Colors'

const colors: Record<'light' | 'dark', Colors> = {
  dark: {
    black: '#000000',
    blue: '#235AFF',
    blueSapphire: '#156778',
    gray: '#979797',
    inputBackground: '#1C2655',
    labelButton: '#000000',
    lightMist: '#1C2655',
    lightSunset: '#FFF9E5',
    lightTransparentBlack: 'rgba(0, 0, 0, 0.3)',
    midnightGlow: '#141B3D',
    mistWhite: '#F9FAFA',
    oceanMist: '#F4E5E5',
    oceanTeal: '#21A7C3',
    placeholderColor: '#ADB3BC',
    skyLight: '#3548A3',
    smokeStone: '#F4E5E5',
    spaceCadet: '#1C2655',
    sunsetOrange: '#F98600',
    tealGreen: '#0FEC82',
    text: '#fff',
    white: '#FFFFFF',
    yellow: '#ffff00'

  },
  light: {
    black: '#000000',
    blue: '#235AFF',
    blueSapphire: '#156778',
    gray: '#979797',
    inputBackground: '#FFFFFF',
    labelButton: '#156778',
    lightMist: '#F0F3F6',
    lightSunset: '#FFF9E5',
    lightTransparentBlack: 'rgba(0, 0, 0, 0.3)',
    midnightGlow: '#FFFFFF',
    mistWhite: '#F9FAFA',
    oceanMist: '#50555C',
    oceanTeal: '#156778',
    placeholderColor: '#ADB3BC',
    skyLight: '#FFFFFF',
    smokeStone: '#D1D5DB',
    spaceCadet: '#1C2655',
    sunsetOrange: '#F98600',
    tealGreen: '#156778',
    text: '#000',
    white: '#FFFFFF',
    yellow: '#ffff00'
  }
}

const getColors = (colorScheme: ColorSchemeName): Colors => {
  return colors[colorScheme ?? 'light']
}

export default getColors
