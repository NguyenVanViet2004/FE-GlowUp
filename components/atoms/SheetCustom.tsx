import React from 'react'
import { useColorScheme } from 'react-native'
import { Frame, Sheet, View } from 'tamagui'

import getColors from '~/constants/Colors'

interface Props {
  open: boolean
  onDismiss: () => void
  children: React.ReactNode
  modal: boolean
  snapPoint?: Array<number | string>
}

const SheetCustom:
React.FC<Props> =
({ open, onDismiss, children, modal, snapPoint = [90, 60, 40] }) => {
  const colorScheme = useColorScheme()
  const colors = getColors(colorScheme)

  return (
    <Sheet
      modal={modal}
      open={open}
      onOpenChange={onDismiss}
      dismissOnSnapToBottom
      snapPoints={snapPoint}
      zIndex={1000}
    >
      <Frame
        borderTopLeftRadius={30}
        borderTopRightRadius={30}
        overflow="hidden"
        backgroundColor={colorScheme === 'dark'
          ? colors.midnightBlue
          : colors.white}
      >
        <View height="100%">
          {children}
        </View>
      </Frame>
    </Sheet>
  )
}

export default SheetCustom
