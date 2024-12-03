import { waitFor } from '@testing-library/react-native'

import LabelTitle from '~/components/atoms/LabelTitle'
import { render } from '~/utils/testing'

jest.mock('~/hooks/useColorScheme', () => {
  return {
    useColorScheme: jest.fn(() => ({ colorScheme: 'dark' }))
  }
})

describe('LabelTitle', () => {
  it('renders correctly', () => {
    waitFor(() => {
      const { getByTestId } = render(
        <LabelTitle title="hehe boy" subTitle="hehe girl" />
      )

      expect(getByTestId('title')).toHaveTextContent('hehe boy')
      expect(getByTestId('subtitle')).toHaveTextContent('hehe girl')

      expect(getByTestId('title')).toBeOnTheScreen()
      expect(getByTestId('subtitle')).toBeOnTheScreen()
      expect(getByTestId('label-title')).toBeOnTheScreen()
    })
  })
})
