import { isNil } from 'lodash'
import React, { useEffect, useState } from 'react'
import { FlatList, useColorScheme } from 'react-native'
import { Image, Text, View, XStack, YStack } from 'tamagui'

import { request } from '~/apis/HttpClient'
import TransparentButton from '~/components/atoms/TransparentButton'
import StepDetailsTemplate from '~/components/templates/StepDetailsTemplate'
import getColors from '~/constants/Colors'
import { useAppFonts } from '~/hooks/useAppFonts'
import useTranslation from '~/hooks/useTranslation'
import type Step from '~/interfaces/Step'

interface Props {
  dataStep: any
}

const StepList = (props: Props): JSX.Element => {
  const colors = getColors(useColorScheme())
  const { fonts } = useAppFonts()
  const { t } = useTranslation()
  const [showAllSteps, setShowAllSteps] = useState<boolean>(false)
  const [dataService, setDataService] = useState<Step[]>([])
  const [isOpenBottomSheet, setIsOpenBottomSheet] = useState(false)
  const [currentDetailStep, setCurrentDetailStep] = useState<Step>()

  const handleViewAllServices = (): void => {
    setShowAllSteps((prev) => !prev)
  }

  useEffect(() => {
    const getData = async (): Promise<void> => {
      try {
        const res = await request.get<Step[]>('/service')
        setDataService(res.result as [])
      } catch (e: any) {
        console.error(e)
      }
    }
    void getData()
  }, [])

  const servicesList = !isNil(dataService) ? dataService : []
  const serviceIds = !isNil(props.dataStep?.services)
    ? props.dataStep.services
    : []

  const detailedServices = Array.isArray(servicesList) &&
    servicesList.length > 0
    ? serviceIds.map((id: string) => servicesList.find(
      (service: { id: string }) => service.id === id
    ) ?? null)
    : []

  const displayedServices = showAllSteps
    ? detailedServices
    : detailedServices.slice(0, 3)

  const displayDetailsStep = (step: Step): void => {
    setCurrentDetailStep(step)
    setIsOpenBottomSheet(true)
  }

  return (
    <View>
      <FlatList
        scrollEnabled={false}
        data={displayedServices}
        renderItem={({ item }: { item: Step }) => (
          <YStack>
            {!isNil(item) && (
              <XStack
                marginBottom={10}
                pressStyle={{ backgroundColor: colors.smokeStone }}
                borderRadius={8}>
                <Image
                  source={{ uri: item.picture }}
                  width={114}
                  height={114}
                  borderTopLeftRadius={8}
                  borderBottomLeftRadius={8}
                />
                <YStack
                  marginLeft={16}
                  flex={1}
                  onPress={() => { displayDetailsStep(item) }}
                  justifyContent="center"
                  gap={6}>
                  <Text
                    color={colors.text}
                    fontSize={14}
                    fontFamily={fonts.JetBrainsMonoBold}>
                    {item.name}
                  </Text>
                  <Text color={colors.text} fontSize={12}>
                    {item.price}$
                  </Text>
                  <Text color={colors.text} fontSize={14}>
                    {item.description.length > 40
                      ? `${item.description.slice(0, 40)}...`
                      : item.description}
                  </Text>
                </YStack>
              </XStack>
            )}
          </YStack>
        )}
        keyExtractor={(item) => item.id.toString()}
      />

      {!isNil(currentDetailStep) && <StepDetailsTemplate
        isOpen={isOpenBottomSheet}
        setIsOpen={setIsOpenBottomSheet}
        t={t}
        step={currentDetailStep} />}

      <TransparentButton
        onPress={handleViewAllServices}
        title={
          showAllSteps
            ? t('screens.details.showLess')
            : t('screens.details.viewAllServices')
        }
        colorProps={colors.blueSapphire}
      />
    </View>
  )
}

export default StepList
