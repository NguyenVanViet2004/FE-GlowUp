import { type ColorSchemeName } from 'react-native'

import { type Colors } from '~/interfaces/Colors'

const colors: Record<'light' | 'dark', Colors> = {
  dark: {
    bgDate: '#007B83',
    bgInput: '#E1F5FA',
    bgSearch: '#E1F5FA',
    black: '#000000',
    blue: '#235AFF',
    blueOTP: '#898A8D',
    blueSapphire: '#156778',

    bookingDetailsBackgroundCard: '#E1F5FA',
    borderInputaOTP: '#21A7C3',
    deepOrange: '#F98600',
    ghostWhite: '#f2f2f2',

    gray: '#979797',
    green: '#00EE00',
    inputBackground: '#1C2655',
    labelButton: '#000000',
    lightGray: '#1C2655',
    lightGreen: '#58D68D',
    lightMist: '#1C2655',
    lightRed: '#A33737',
    lightSilver: '#D1D5DB',
    lightSunset: '#FFF9E5',
    lightTransparentBlack: 'rgba(0, 0, 0, 0.3)',
    lightYellow: '#FFF9E5',
    midnightBlue: '#28293D',
    midnightGlow: '#141B3D',
    mistWhite: '#F9FAFA',
    oceanMist: '#F4E5E5',
    oceanTeal: '#21A7C3',
    placeholderColor: '#ADB3BC',
    radioColor: '#FFFFFF',
    red: '#FF0000',
    skyLight: '#3548A3',
    smokeStone: '#F4E5E5',
    spaceCadet: '#1C2655',
    sunsetOrange: '#F98600',
    tealGreen: '#0FEC82',
    text: '#fff',
    textDate: '#979797',
    white: '#FFFFFF',
    yellow: '#ffff00'
  },
  light: {
    bgDate: '#007B83',
    bgInput: '#E1F5FA',
    bgSearch: '#F0F3F6',
    black: '#000000',
    blue: '#235AFF',
    blueOTP: '#235AFF',
    blueSapphire: '#156778',
    bookingDetailsBackgroundCard: '#E1F5FA',
    borderInputaOTP: '#F3F7EF',
    deepOrange: '#F98600',
    ghostWhite: '#f2f2f2',
    gray: '#979797',
    green: '#00EE00',
    inputBackground: '#FFFFFF',
    labelButton: '#156778',
    lightGray: '#F3F7EF',
    lightGreen: '#58D68D',
    lightMist: '#F0F3F6',
    lightRed: '#FFF5F5',
    lightSilver: '#D1D5DB',
    lightSunset: '#FFF9E5',
    lightTransparentBlack: 'rgba(0, 0, 0, 0.3)',
    lightYellow: '#FFF9E5',
    midnightBlue: '#28293D',
    midnightGlow: '#FFFFFF',
    mistWhite: '#F9FAFA',
    oceanMist: '#50555C',
    oceanTeal: '#156778',
    placeholderColor: '#ADB3BC',
    radioColor: 'blue',
    red: '#FF0000',
    skyLight: '#FFFFFF',
    smokeStone: '#D1D5DB',
    spaceCadet: '#1C2655',
    sunsetOrange: '#F98600',
    tealGreen: '#156778',
    text: '#000',
    textDate: '#000',
    white: '#FFFFFF',
    yellow: '#ffff00'
  }
}

const getColors = (colorScheme: ColorSchemeName): Colors => {
  return colors[colorScheme ?? 'light']
}

export default getColors
