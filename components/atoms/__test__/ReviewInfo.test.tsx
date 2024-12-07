import ReviewInfo from '~/components/atoms/ReviewInfo'
import { render } from '~/utils/testing'

jest.mock('~/hooks/useColorScheme', () => {
  return {
    useColorScheme: jest.fn(() => ({ colorScheme: 'dark' }))
  }
})

describe('ReviewInfo', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<ReviewInfo star="5" view="hehe boy"/>)

    expect(getByTestId('review-info')).toBeOnTheScreen()
    expect(getByTestId('review-info')).toHaveTextContent('5')
    expect(getByTestId('review-info')).toHaveTextContent('(hehe boy)')
  })
})
