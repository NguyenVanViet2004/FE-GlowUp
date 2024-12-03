import { Button, type ButtonProps, Text } from 'tamagui'

import getColors from '~/constants/Colors'
import { RADIUS_BUTTON } from '~/constants/Constants'
import { useAppFonts } from '~/hooks/useAppFonts'
import { useColorScheme } from '~/hooks/useColorScheme'

type Props = {
  title: string
} & ButtonProps
const PrimaryButton = (props: Props): React.ReactElement => {
  const { fonts } = useAppFonts()
  const colors = getColors(useColorScheme().colorScheme)
  return (
    <Button
      backgroundColor={colors.white}
      borderRadius={RADIUS_BUTTON}
      alignItems="center"
      pressStyle={{ backgroundColor: colors.gray }}
      testID="primary-button"
      onPress={props.onPress}>
      <Text
        color={colors.blueSapphire}
        fontFamily={fonts.JetBrainsMonoBold}
        fontSize={16}>
        {props.title}
      </Text>
    </Button>
  )
}

export default PrimaryButton
