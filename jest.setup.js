import '@testing-library/react-native/extend-expect'
import '@testing-library/jest-native/extend-expect'
import { enableFetchMocks } from 'jest-fetch-mock'

global.fetch = require('jest-fetch-mock')

enableFetchMocks()

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
)

jest.mock('react-i18next', () => ({
  initReactI18next: {
    init: () => {},
    type: '3rdParty'
  },
  useTranslation: () => {
    return {
      i18n: {
        changeLanguage: async () => await new Promise(() => {})
      },
      t: (str) => str
    }
  }
}))

jest.mock('tamagui', () => {
  const actual = jest.requireActual('tamagui')
  return {
    ...actual,
  Button: require('~/__mocks__/Button').default,}
})

jest.mock('moti', () => {
  const actual = jest.requireActual('tamagui')
  return {
    ...actual,
    MotiView: require('~/__mocks__/MotiView').default,}
})