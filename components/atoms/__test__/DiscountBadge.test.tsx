import DiscountBadge from '~/components/atoms/DiscountBadge'
import { render } from '~/utils/testing'

jest.mock('~/hooks/useColorScheme', () => {
  return {
    useColorScheme: jest.fn(() => ({ colorScheme: 'dark' }))
  }
})

describe('DiscountBadge', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(
      <DiscountBadge percent="50%" quantity="10" />
    )

    const badge = getByTestId('discount-badge')
    const icon = getByTestId('discount-badge-icon')
    const percent = getByTestId('discount-badge-percent')
    const quantity = getByTestId('discount-badge-quantity')

    expect(badge).toBeOnTheScreen()
    expect(icon).toBeOnTheScreen()
    expect(percent).toBeOnTheScreen()
    expect(quantity).toBeOnTheScreen()

    expect(percent.props.children[1]).toBe('50%')
    expect(quantity.props.children[1]).toBe('10')
  })
})
