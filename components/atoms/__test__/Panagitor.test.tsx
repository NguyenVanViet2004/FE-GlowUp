import { Animated } from 'react-native'

import Panagitor from '~/components/atoms/Panagitor'
import { render } from '~/utils/testing'

describe('Panagitor', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<Panagitor data={[]} scrollX={new Animated.Value(0)} />)

    expect(getByTestId('panagitor')).toBeOnTheScreen()
  })
})
