import { NegativeButton } from '~/components/atoms/NegativeButton'
import { render } from '~/utils/testing'

jest.mock('~/hooks/useColorScheme', () => {
  return {
    useColorScheme: jest.fn(() => ({ colorScheme: 'dark' }))
  }
})

describe('NegativeButton', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<NegativeButton title="hehe boy"/>)

    expect(getByTestId('negative-button')).toHaveTextContent('hehe boy')
    expect(getByTestId('negative-button')).toBeOnTheScreen()
  })
})
