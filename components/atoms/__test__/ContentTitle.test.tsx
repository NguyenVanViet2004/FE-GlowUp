import { waitFor } from '@testing-library/react-native'

import ContentTitle from '~/components/atoms/ContentTitle'
import { render } from '~/utils/testing'

jest.mock('~/hooks/useColorScheme', () => {
  return {
    useColorScheme: jest.fn(() => ({ colorScheme: 'dark' }))
  }
})

describe('ContentTitle', () => {
  it('renders correctly', () => {
    waitFor(() => {
      const { getByTestId } = render(
        <ContentTitle title="hehe boy" subtitle="hehe girl" />
      )

      expect(getByTestId('title')).toHaveTextContent('hehe boy')
      expect(getByTestId('subtitle')).toHaveTextContent('hehe girl')
    })
  })
})
