import { Clock } from '@tamagui/lucide-icons'
import { type TFunction } from 'i18next'
import { isEmpty, isNil } from 'lodash'
import React from 'react'
import { StatusBar, useColorScheme } from 'react-native'
import { Button, Image, Separator, Text, View, XStack } from 'tamagui'

import SheetCustom from '~/components/atoms/SheetCustom'
import getColors from '~/constants/Colors'
import { useAppFonts } from '~/hooks/useAppFonts'
import type Step from '~/interfaces/Step'

interface props {
  step: Step
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  t: TFunction<'translation', undefined>
}

const StepDetailsTemplate = ({
  step,
  isOpen,
  setIsOpen,
  t
}: props): React.ReactElement => {
  const { fonts } = useAppFonts()
  const colorScheme = useColorScheme()
  const colors = getColors(colorScheme)

  return (
    <>
      <SheetCustom
        modal={true}
        open={isOpen}
        snapPoint={[90, 40]}
        onDismiss={() => {
          setIsOpen(false)
        }}>
        <View>
          <Image
            src={
              !isNil(step.picture) && !isEmpty(step.picture)
                ? step.picture
                : require('../../assets/images/backGroundDetail.png')
            }
            height={376}
            width={'100%'}
            resizeMethod="resize"
            borderTopLeftRadius={30}
            borderTopRightRadius={30}
          />
          <View
            paddingHorizontal={16}
            backgroundColor={
              colorScheme === 'dark' ? colors.midnightBlue : colors.white
            }
            height={'100%'}>
            <Text
              marginTop={24}
              fontSize={24}
              fontFamily={fonts.JetBrainsMonoBold}
              color={colors.text}>
              {step.name}
            </Text>
            <XStack gap={8} alignItems="center" marginTop={10}>
              <Clock color={colors.text} size={17} />
              <Text fontFamily={fonts.JetBrains} color={colors.text}>
                {step.total_time} {t('serviceDetail.hoursService')}
              </Text>
            </XStack>
            <Separator my="$4" borderColor={colors.gray} />
            <Text
              fontSize={16}
              color={colors.text}
              fontFamily={fonts.JetBrainsMonoBold}>
              {t('serviceDetail.aboutService')}
            </Text>
            <Text
              fontSize={14}
              marginTop={14}
              color={colors.gray}
              fontFamily={fonts.JetBrainsMonoBold}>
              {step.description}
            </Text>
            <Button disabled marginTop={27} backgroundColor={colors.gray}>
              {t('serviceDetail.select&Continue')}
            </Button>
          </View>
        </View>
      </SheetCustom>
      <StatusBar hidden={true} />
    </>
  )
}

export default StepDetailsTemplate
