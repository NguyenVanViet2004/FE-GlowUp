module.exports = {
  preset: 'jest-expo',
  modulePaths: ['<rootDir>'],
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
    '^.+\\.yaml?$': 'jest-transform-yaml',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|react-redux|@react-native|@react-navigation|@expo|@react-native-community|@react-navigation/.*|@unimodules/.*|unimodules|expo|expo-.*|@expo/.*|react-native-.*|@react-native-.*|@react-native-community)',
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    'app/**/*.{ts,tsx}',
    'hooks/**/*.{ts,tsx}',
    'utils/**/*.{ts,tsx}',
    'features/**/*.{ts,tsx}',
    'components/**/*.{ts,tsx}',
    '!app/**/*.d.ts',
    '!app/**/*.test.tsx',
    '!**/coverage/**',
    '!**/node_modules/**',
    '!**/babel.config.js',
    '!**/jest.setup.js',
    '!**/tamagui.config.ts',
    '!**/jest.config.js',
  ],
  setupFilesAfterEnv: ['./jest.setup.js'],
  testEnvironment: 'jsdom'
};
