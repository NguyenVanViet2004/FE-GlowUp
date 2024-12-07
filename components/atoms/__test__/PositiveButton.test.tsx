import { render } from '~/utils/testing'

import { PositiveButton } from '../PositiveButton'

jest.mock('~/hooks/useColorScheme', () => {
  return {
    useColorScheme: jest.fn(() => ({ colorScheme: 'dark' }))
  }
})

describe('PositiveButton', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<PositiveButton title="hehe boy" />)

    expect(getByTestId('positive-button')).toHaveTextContent('hehe boy')
    expect(getByTestId('positive-button')).toBeOnTheScreen()
  })
})
