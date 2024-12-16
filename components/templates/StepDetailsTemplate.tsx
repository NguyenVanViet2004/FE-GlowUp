import { Clock } from "@tamagui/lucide-icons"
import { type TFunction } from "i18next"
import { isEmpty, isNil } from "lodash"
import React from "react"
import { StatusBar } from "react-native"
import { Image, Separator, Sheet, Text, View, XStack } from "tamagui"

import getColors from "~/constants/Colors"
import { useAppFonts } from "~/hooks/useAppFonts"
import { useColorScheme } from "~/hooks/useColorScheme"
import type Step from "~/interfaces/Step"

interface props {
  step: Step
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  t: TFunction<"translation", undefined>
}

const StepDetailsTemplate = ({
  step,
  isOpen,
  setIsOpen,
  t,
}: props): React.ReactElement => {
  const { fonts } = useAppFonts()
  const { colorScheme } = useColorScheme()
  const colors = getColors(colorScheme)

  const overlayStyles = {
    enterStyle: { opacity: 0 },
    exitStyle: { opacity: 0 },
  }

  return (
    <>
      <Sheet
        forceRemoveScrollEnabled={isOpen}
        modal={true}
        open={isOpen}
        onOpenChange={setIsOpen}
        // snapPoints={snapPoints}
        snapPointsMode='fit'
        dismissOnSnapToBottom
        // position={position}
        // onPositionChange={setPosition}
        zIndex={100_000}
        animation='medium'>
        <Sheet.Overlay
          animation='lazy'
          enterStyle={overlayStyles.enterStyle}
          exitStyle={overlayStyles.exitStyle}
        />
        <Sheet.Handle />
        <View marginBottom={100}>
          <Image
            src={
              !isNil(step.picture) && !isEmpty(step.picture)
                ? step.picture
                : require("../../assets/images/backGroundDetail.png")
            }
            height={376}
            width={"100%"}
            resizeMethod='resize'
            borderTopLeftRadius={30}
            borderTopRightRadius={30}
          />
          <View
            paddingHorizontal={16}
            backgroundColor={
              colorScheme === "dark" ? colors.midnightBlue : colors.white
            }
            height={"100%"}>
            <Text
              marginTop={24}
              fontSize={24}
              fontFamily={fonts.JetBrainsMonoBold}
              color={colors.text}>
              {step.name}
            </Text>
            <XStack>
              <XStack flex={1} gap={8} alignItems='center' marginTop={10}>
                <Clock color={colors.text} size={17} />
                <Text fontFamily={fonts.JetBrains} color={colors.text}>
                  {step.time} phút
                </Text>
              </XStack>
              <XStack gap={8} alignItems='center' marginTop={10}>
                <Text fontFamily={fonts.JetBrains} color={colors.text}>
                  {step.price}{" "}VND
                </Text>
              </XStack>
            </XStack>
            <Separator my='$4' borderColor={colors.gray} />
            <Text
              fontSize={16}
              color={colors.text}
              fontFamily={fonts.JetBrainsMonoBold}>
              {t("serviceDetail.aboutService")}
            </Text>
            <Text
              fontSize={14}
              marginTop={14}
              color={colors.gray}
              fontFamily={fonts.JetBrainsMonoBold}>
              {step.description}
            </Text>
          </View>
        </View>
      </Sheet>
      <StatusBar hidden={true} />
    </>
  )
}

export default StepDetailsTemplate
