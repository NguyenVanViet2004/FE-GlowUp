import { render } from "~/utils/testing"
import { TextTitle } from "~/components/atoms/TextTitle"
import { waitFor } from "@testing-library/react-native"

jest.mock("~/hooks/useColorScheme", () => {
  return {
    useColorScheme: jest.fn(() => ({ colorScheme: "dark" })),
  }
})

describe("TextTitle", () => {
  it("renders correctly", () => {
    waitFor(() => {
      const { getByTestId } = render(<TextTitle text='hehe boy' />)

      expect(getByTestId("text-title")).toHaveTextContent("hehe boy")
      expect(getByTestId("text-title")).toBeOnTheScreen()
    })
  })
})
