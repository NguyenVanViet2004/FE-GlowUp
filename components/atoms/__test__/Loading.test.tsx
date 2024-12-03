import Loading from '~/components/atoms/Loading'
import { render } from '~/utils/testing'

describe('Loading', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<Loading />)

    expect(getByTestId('loading')).toBeOnTheScreen()
  })
})
