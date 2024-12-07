import NotesComponent from '~/components/atoms/Note'
import { render } from '~/utils/testing'

describe('Note', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<NotesComponent />)

    expect(getByTestId('note')).toBeOnTheScreen()
  })
})
