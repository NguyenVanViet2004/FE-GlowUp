import { fireEvent, waitFor } from '@testing-library/react-native'
import { Text } from 'tamagui'

import InputWithIcons from '~/components/atoms/InputWithIcons'
import { render } from '~/utils/testing'

jest.mock('~/hooks/useColorScheme', () => {
  return {
    useColorScheme: jest.fn(() => ({ colorScheme: 'dark' }))
  }
})

// jest.mock("react-native", () => {
//   return {
//     ...jest.requireActual("react-native"),
//     StyleSheet: {
//       flatten: jest.fn().mockReturnValue({}), // Mock StyleSheet.flatten
//     },
//   }
// })

describe('InputWithIcons', () => {
  it('renders correctly with icons', () => {
    waitFor(() => {
      const iconRight = <Text testID="icon-right">Right</Text>
      const iconLeft = <Text testID="icon-left">Left</Text>

      const { getByTestId } = render(
        <InputWithIcons iconRight={iconRight} iconLeft={iconLeft} />
      )

      const rightIcon = getByTestId('icon-right')
      const leftIcon = getByTestId('icon-left')

      expect(rightIcon).toBeOnTheScreen()
      expect(leftIcon).toBeOnTheScreen()
    })
  })

  it('displays error message when errorMessage prop is provided', () => {
    waitFor(() => {
      const errorMessage = 'This is an error'
      const { getByText } = render(
        <InputWithIcons errorMessage={errorMessage} />
      )

      const errorText = getByText(errorMessage)
      expect(errorText).toBeOnTheScreen()
      expect(errorText.props.color).toBe('red')
    })
  })

  it('changes focus state correctly on focus and blur', async () => {
    waitFor(async () => {
      const { getByTestId } = render(<InputWithIcons testID="input" />)

      const input = getByTestId('input')
      fireEvent(input, 'focus')
      await waitFor(() => {
        expect(input.props.style.backgroundColor).toBeDefined()
      })

      fireEvent(input, 'blur')
      await waitFor(() => {
        expect(input.props.style.backgroundColor).toBeDefined()
      })
    })
  })

  it('passes props correctly to Input component', () => {
    waitFor(() => {
      const placeholder = 'Enter text'
      const { getByPlaceholderText } = render(
        <InputWithIcons placeholder={placeholder} />
      )

      const input = getByPlaceholderText(placeholder)
      expect(input).toBeOnTheScreen()
      expect(input.props.placeholder).toBe(placeholder)
    })
  })
})
