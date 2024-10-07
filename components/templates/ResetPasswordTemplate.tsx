import { useRouter } from "expo-router";
import { map } from "lodash";
import React from "react";
import { StyleSheet, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View } from "tamagui";

import ContentTitle from "~/components/atoms/ContentTitle";
import InputForm from "~/components/molecules/InputForm";
import LinearGradientBackground from "~/components/molecules/LinearGradientBackground";
import TextWithLink from "~/components/molecules/TextWithLink";
import useTranslation from "~/hooks/useTranslation";
import InputWithIcons from "../atoms/InputWithIcons";
import { LockKeyhole } from "@tamagui/lucide-icons";
import getColors from "~/constants/Colors";
import { PositiveButton } from '~/components/atoms/PositiveButton';

const ResetPasswordTemplate: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const router = useRouter();
  const colors = getColors(useColorScheme());

  const handleSignUp = (): void => {
    router.replace("/(tabs)/home");
  };

  const redirectToLogin = (): void => {
    router.back();
  };

  return (
    <LinearGradientBackground>
        <SafeAreaView style={styles.container}>
          <View marginTop={"13%"}>
            <ContentTitle
              title={t("screens.resetPassword.newPassword")}
              subtitle={t("screens.resetPassword.resetPasswordPrompt")}
            />
          </View>

          <View marginTop={"25%"} gap={20}>
            <InputWithIcons
              iconRight={<LockKeyhole size={16} color={colors.oceanTeal} />}
              placeholder={t("screens.resetPassword.newPassword")}
              onChangeText={() => {}}
            />

            <InputWithIcons
              iconRight={<LockKeyhole size={16} color={colors.oceanTeal} />}
              placeholder={t("screens.resetPassword.confirmNewPassword")}
              onChangeText={() => {}}
            />
          </View>

          <View flex={1} justifyContent="flex-end">
            <PositiveButton
                title={t("screens.resetPassword.confirmNewPassword")}
            />
          </View>
        </SafeAreaView>
 
    </LinearGradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default ResetPasswordTemplate;
