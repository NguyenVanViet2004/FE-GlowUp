import { render } from "~/utils/testing"
import TextWithIcon from "~/components/atoms/TextWithIcon"
import { Code } from "@tamagui/lucide-icons"

describe("TextWithIcon", () => {
  it("renders correctly", () => {
    const { getByTestId } = render(
      <TextWithIcon
        icon={<Code testID='code-icon' />}
        title='hehe boy'
        subTitle='hehe girl'
        subTitleColor='gray'
      />
    )

    expect(getByTestId('code-icon')).toBeOnTheScreen()
    expect(getByTestId('text-with-icon')).toBeOnTheScreen()
    expect(getByTestId('text-with-icon')).toHaveTextContent("hehe boy")
    expect(getByTestId('text-with-icon')).toHaveTextContent("hehe girl")
  })
})
