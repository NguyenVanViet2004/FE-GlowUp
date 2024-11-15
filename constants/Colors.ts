import { type ColorSchemeName } from 'react-native'

import { type Colors } from '~/interfaces/Colors'

const colors: Record<'light' | 'dark', Colors> = {
  dark: {
    black: '#000000',
    blue: '#235AFF',
    blueOTP: '#898A8D',
    blueSapphire: '#156778',
    bookingDetailsBackgroundCard: '',
    gray: '#979797',
    borderInputaOTP: '#21A7C3',
    green: '#00EE00',
    inputBackground: '#1C2655',
    labelButton: '#000000',
    lightGray: '#1C2655',
    lightGreen: '#58D68D',
    lightMist: '#1C2655',
    lightRed: '#A33737',
    lightSilver: '#D1D5DB',
    lightTransparentBlack: 'rgba(0, 0, 0, 0.3)',
    midnightGlow: '#141B3D',
    oceanMist: '#F4E5E5',
    oceanTeal: '#21A7C3',
    placeholderColor: '#ADB3BC',
    radioColor: '#FFFFFF',
    red: '#FF0000',
    skyLight: '#3548A3',
    spaceCadet: '#1C2655',
    text: '#fff',
    white: '#FFFFFF',
    yellow: '#ffff00'
  },
  light: {
    black: '#000000',
    blue: '#235AFF',
    blueOTP: '#235AFF',
    blueSapphire: '#156778',
    bookingDetailsBackgroundCard: '#E1F5FA',
    gray: '#979797',
    borderInputaOTP: '#F3F7EF',
    green: '#00EE00',
    inputBackground: '#FFFFFF',
    labelButton: '#156778',
    lightGray: '#F3F7EF',
    lightGreen: '#58D68D',
    lightMist: '#F0F3F6',
    lightSilver: '#D1D5DB',
    lightRed: '#FFF5F5',
    lightTransparentBlack: 'rgba(0, 0, 0, 0.3)',
    midnightGlow: '#FFFFFF',
    oceanMist: '#50555C',
    oceanTeal: '#156778',
    placeholderColor: '#ADB3BC',
    radioColor: 'blue',
    red: '#FF0000',
    skyLight: '#FFFFFF',
    spaceCadet: '#1C2655',
    text: '#000',
    white: '#FFFFFF',
    yellow: '#ffff00'
  }
}

const getColors = (colorScheme: ColorSchemeName): Colors => {
  return colors[colorScheme ?? 'light']
}

export default getColors
