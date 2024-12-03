import { waitFor } from '@testing-library/react-native'

import PrimaryButton from '~/components/atoms/PrimaryButton'
import { render } from '~/utils/testing'

jest.mock('~/hooks/useColorScheme', () => {
  return {
    useColorScheme: jest.fn(() => ({ colorScheme: 'dark' }))
  }
})

describe('PrimaryButton', () => {
  it('renders correctly', () => {
    waitFor(() => {
      const { getByTestId } = render(<PrimaryButton title="Nguyen Van Viet" />)

      expect(getByTestId('primary-button')).toBeOnTheScreen()
      expect(getByTestId('primary-button')).toHaveTextContent('Nguyen Van Viet')
    })
  })
})
