import React, { useState } from "react";
import { FlatList, useColorScheme } from "react-native";
import { Image, Text, View, XStack, YStack } from "tamagui";
import getColors from "~/constants/Colors";
import { dataComboList } from "~/constants/ComboListData";
import { dataSteps } from "~/constants/StepData";
import { useAppFonts } from "~/hooks/useAppFonts";
import type Combo from "~/interfaces/Combo";
import TransparentButton from "~/components/atoms/TransparentButton";
import { isNil } from "lodash";
import useTranslation from '~/hooks/useTranslation';


const StepList = (): JSX.Element => {
  const colors = getColors(useColorScheme());
  const { fonts } = useAppFonts();
  const {t} = useTranslation()
  const [showAllSteps, setShowAllSteps] = useState<boolean>(false);


  const handleViewAllServices = () => {
    setShowAllSteps((prev) => !prev); 
  };

  const renderStepItem = ({ item }: { item: Combo }) => {
    const steps = item.comboStepId.stepId.map((stepId) =>
      dataSteps.find((step) => step._id === stepId)
    );

    return (
      <YStack>
        {(showAllSteps ? steps : steps.slice(0, 3)).map((step) =>
          !isNil(step) ? (
            <XStack
              key={step._id}
              marginBottom={10}
              pressStyle={{ backgroundColor: "gray" }}
              borderRadius={8}
            >
              <Image
                source={{ uri: step.imageUrl }}
                width={114}
                height={114}
                borderTopLeftRadius={8}
                borderBottomLeftRadius={8}
              />
              <YStack marginLeft={16} flex={1} justifyContent="center" gap={6}>
                <Text
                  color={colors.text}
                  fontSize={14}
                  fontFamily={fonts.JetBrainsMonoBold}
                >
                  {step.name}
                </Text>
                <Text color={colors.text} fontSize={12}>
                  {step.duration}
                </Text>
                <Text color={colors.text} fontSize={14}>
                  {step.description.length > 40
                    ? `${step.description.slice(0, 40)}...`
                    : step.description}
                </Text>
              </YStack>
            </XStack>
          ) : null
        )}
      </YStack>
    );
  };

  return (
    <View>
      <FlatList
        scrollEnabled={false}
        data={dataComboList}
        renderItem={renderStepItem}
        keyExtractor={(item) => item._id}
      />
      <TransparentButton
        onPress={handleViewAllServices}
        title={showAllSteps ? t("screens.details.showLess") : t("screens.details.viewAllServices")}
        colorProps={colors.blueSapphire}
      />
    </View>
  );
};

export default StepList;
