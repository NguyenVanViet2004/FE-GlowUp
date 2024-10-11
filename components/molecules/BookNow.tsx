import React from "react";

import { useColorScheme } from "react-native";
import { Text, type TextProps, XStack, YStack } from "tamagui";

import { PositiveButton } from "~/components/atoms/PositiveButton";
import getColors from "~/constants/Colors";
import { useAppFonts } from "~/hooks/useAppFonts";
import useTranslation from "~/hooks/useTranslation";

type Props = {
  price: number;
  deal: number;
} & TextProps;

const BookNow = (props: Props): JSX.Element => {
  const colors = getColors(useColorScheme());
  const { fonts } = useAppFonts();
  const { t } = useTranslation();
  return (
    <XStack paddingVertical={16} paddingHorizontal={20} alignItems="center">
      <YStack paddingRight={20} gap={6}>
        <Text color={colors.text} fontFamily={fonts.JetBrainsMonoBold}>
          {t("screens.details.total")}
        </Text>
        <XStack alignItems="center" gap={10}>
          <Text fontSize={20}>${props.price}</Text>
          <Text textDecorationLine="line-through" color={colors.text}>
            ${props.deal}
          </Text>
        </XStack>
      </YStack>
      <PositiveButton flex={1} title={t("screens.details.bookNow")} />
    </XStack>
  );
};

export default BookNow;
