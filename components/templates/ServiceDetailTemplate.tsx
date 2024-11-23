import { Clock } from '@tamagui/lucide-icons'
import React, { useState } from 'react'
import { useColorScheme } from 'react-native'
import { Button, Image, Separator, Text, View, XStack } from 'tamagui'

import SheetCustom from '~/components/atoms/SheetCustom'
import getColors from '~/constants/Colors'
import { useAppFonts } from '~/hooks/useAppFonts'
import useTranslation from '~/hooks/useTranslation'

const ServiceDetailTemplate = (): React.ReactElement => {
  const [isOpen, setIsOpen] = useState(false)
  const { fonts } = useAppFonts()
  const { t } = useTranslation()
  const colorScheme = useColorScheme()
  const colors = getColors(colorScheme)
  const service = {
    createdAt: '2024-11-20T10:00:00Z',
    deleted: false,
    description: 'A basic cleaning service for your home or office.',
    id: '1',
    name: 'Basic Cleaning',
    picture: require('../../assets/images/imgBanner.png'),
    price: '25.00',
    total_time: 120,
    updatedAt: null
  }

  return (
    <>
      <Button
        marginTop={40}
        onPress={() => { setIsOpen(true) }}>Open Service Details</Button>
      <SheetCustom
        modal={true}
        open={isOpen}
        snapPoint={[90, 40]}
        onDismiss={() => { setIsOpen(false) }}>
        <View>
          <Image
            source={service.picture}
            height={376}
            width={'100%'}
            resizeMethod="resize"
            borderTopLeftRadius={30}
            borderTopRightRadius={30} />
          <View paddingHorizontal={16}
            backgroundColor={colorScheme === 'dark'
              ? colors.midnightBlue
              : colors.white} height={'100%'}>
            <Text
              marginTop={24}
              fontSize={24}
              fontFamily={fonts.JetBrainsMonoBold}
              color={colors.text}>
              {service.name}
            </Text>
            <XStack gap={8} alignItems="center" marginTop={10}>
              <Clock color={colors.text} size={17} />
              <Text fontFamily={fonts.JetBrains} color={colors.text}>
                {service.total_time} {t('serviceDetail.hoursService')}
              </Text>
            </XStack>
            <Separator my="$4" borderColor={colors.gray} />
            <Text
              fontSize={16}
              color={colors.text}
              fontFamily={fonts.JetBrainsMonoBold}>
              {t('serviceDetail.aboutService')}</Text>
            <Text fontSize={14}
              marginTop={14}
              color={colors.gray}
              fontFamily={fonts.JetBrainsMonoBold}>
              {service.description}
            </Text>
            <Button
              disabled
              marginTop={27}
              backgroundColor={colors.gray}>
              {t('serviceDetail.select&Continue')}</Button>
          </View>
        </View>
      </SheetCustom>
    </>
  )
}

export default ServiceDetailTemplate
