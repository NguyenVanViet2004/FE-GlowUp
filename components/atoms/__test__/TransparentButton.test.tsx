import { fireEvent, waitFor } from "@testing-library/react-native"
import { render } from "~/utils/testing"

import TransparentButton from "~/components/atoms/TransparentButton"

jest.mock("~/hooks/useColorScheme", () => {
  return {
    useColorScheme: jest.fn(() => ({ colorScheme: "dark" })),
  }
})

describe("TransparentButton", () => {
  it("renders correctly", () => {
    waitFor(() => {
      const { getByTestId } = render(
        <TransparentButton title='hehe' colorProps='red' />
      )
      expect(getByTestId("transparent-button")).toBeOnTheScreen()
    })
  })

  it("when called onPress", () => {
    const mockFn = jest.fn()
    waitFor(() => {
      const { getByTestId } = render(
        <TransparentButton title='hehe' colorProps='red' onPress={mockFn} />
      )
      fireEvent.press(getByTestId("transparent-button"))
      expect(mockFn).toHaveBeenCalled()
    })
  })
})
