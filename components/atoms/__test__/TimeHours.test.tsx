import { render } from "~/utils/testing"
import TimeHours from "../TimeHours"
import { waitFor } from "@testing-library/react-native"

jest.mock("~/hooks/useColorScheme", () => {
  return {
    useColorScheme: jest.fn(() => ({ colorScheme: "dark" })),
  }
})

describe("TimeHours", () => {
  it("renders correctly", () => {
    waitFor(() => {
      const { getByTestId } = render(<TimeHours days='15' times='22' />)

      expect(getByTestId("time-hours")).toHaveTextContent("1522")
      expect(getByTestId("time-hours")).toBeOnTheScreen()
    })
  })
})
