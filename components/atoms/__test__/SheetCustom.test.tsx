import SheetCustom from '~/components/atoms/SheetCustom'
import { render } from '~/utils/testing'

jest.mock('~/hooks/useColorScheme', () => ({
  useColorScheme: jest.fn()
}))

describe('SheetCustom', () => {
  it('renders correctly', () => {
    // eslint-disable-next-line
    require("~/hooks/useColorScheme").useColorScheme.mockReturnValue({
      colorScheme: 'dark'
    })

    const { getByTestId } = render(
      <SheetCustom open onDismiss={() => {}} modal snapPoint={[50]}>
        <></>
      </SheetCustom>
    )

    expect(getByTestId('sheet-frame')).toBeOnTheScreen()
    expect(getByTestId('sheet-children')).toBeOnTheScreen()
  })

  it('renders without snapPoint and useColorScheme equals light', () => {
    // eslint-disable-next-line
    require("~/hooks/useColorScheme").useColorScheme.mockReturnValue({
      colorScheme: 'light'
    })

    const { getByTestId } = render(
      <SheetCustom open onDismiss={() => {}} modal>
        <></>
      </SheetCustom>
    )

    expect(getByTestId('sheet-frame')).toBeOnTheScreen()
    expect(getByTestId('sheet-children')).toBeOnTheScreen()
  })
})
