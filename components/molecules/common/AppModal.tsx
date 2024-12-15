import { Check, Info, X } from '@tamagui/lucide-icons'
import { isNil } from 'lodash'
import React from 'react'
import { Modal } from 'react-native'
import { Button, Text, View, XStack, YStack } from 'tamagui'

import getColors from '~/constants/Colors'
import { useAppFonts } from '~/hooks/useAppFonts'
import { useColorScheme } from '~/hooks/useColorScheme'

interface Props {
  visible: boolean
  title: string
  subtitle?: string
  children?: React.ReactNode
  ontClose: () => void
  type?: 'SUCCESS' | 'ERROR' | 'INFO'
  onConfirm?: () => void
  confirmText?: string
  confirmColor?: string
  cancelText?: string
  cancelColor?: string
  confirmButtonType?: 'clear' | 'solid' | 'outline'
  onCancel?: () => void
}

const AppModal = ({
  visible,
  title,
  subtitle,
  children,
  ontClose,
  type = 'INFO',
  onConfirm,
  confirmText = 'Confirm',
  confirmColor = '#007bff',
  cancelText = 'Cancel',
  onCancel
}: Props): React.JSX.Element => {
  const typeStyles = {
    ERROR: { color: '#dc3545', icon: X },
    INFO: { color: '#ff9d00', icon: Info },
    SUCCESS: { color: '#28a745', icon: Check }
  }[type]

  const colors = getColors(useColorScheme().colorScheme)
  const fonts = useAppFonts().fonts

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={ontClose}>
      <View
        flex={1}
        justifyContent="center"
        alignItems="center"
        backgroundColor="rgba(0, 0, 0, 0.703)">
        <View
          width="80%"
          padding={20}
          backgroundColor={colors.inputBackground}
          borderRadius={10}
          borderWidth={1}
          alignItems="center">
          <YStack space="$2">
            <View
              alignSelf="center"
              borderRadius={50}
              backgroundColor={typeStyles.color}>
              <typeStyles.icon size={50} color={colors.white} />
            </View>
            <Text
              fontSize={18}
              fontFamily={fonts.JetBrainsMonoBold}
              mb={15}
              textAlign="center"
              color={colors.text}>
              {title}
            </Text>

            {!isNil(subtitle) && (
              <Text color={colors.text} textAlign="center" mb={15}>
                {subtitle}
              </Text>
            )}
            {!isNil(children) && <View marginVertical={10}>{children}</View>}

            <XStack
              flexDirection="row"
              justifyContent="space-between"
              width="100%"
              gap={10}
              marginTop={10}>
              {!isNil(onConfirm) && !isNil(confirmText) && (
                <Button
                  onPress={onConfirm}
                  color={confirmColor}
                  flex={1}
                  backgroundColor="$colorTransparent"
                  marginHorizontal={5}>
                  {confirmText}
                </Button>
              )}

              {!isNil(onCancel) && !isNil(cancelText) && (
                <Button
                  onPress={onCancel}
                  color={colors.white}
                  flex={1}
                  backgroundColor={colors.blueSapphire}
                  marginHorizontal={5}>
                  {cancelText}
                </Button>
              )}
            </XStack>
          </YStack>
        </View>
      </View>
    </Modal>
  )
}

export default AppModal
