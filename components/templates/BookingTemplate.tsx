import React from "react"
import { StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Text, View } from "tamagui"

import LinearGradientBackground from "~/components/molecules/LinearGradientBackground"
import BookingMenuTabList from "~/components/organisms/BookingMenuTabList"
import getColors from "~/constants/Colors"
import { useAppFonts } from "~/hooks/useAppFonts"
import { useColorScheme } from "~/hooks/useColorScheme"
import useFetchAppointment from "~/hooks/useFetchAppointment"
import useTranslation from "~/hooks/useTranslation"

const BookingTemplate = (): React.ReactElement => {
  const { fonts } = useAppFonts()
  const colors = getColors(useColorScheme().colorScheme)
  const { t } = useTranslation()
  const { appointments, isLoading, removeLocalAppointment } =
    useFetchAppointment()

  return (
    <LinearGradientBackground>
      <SafeAreaView style={styles.container}>
        <View alignItems='center'>
          <Text
            fontSize={16}
            color={colors.text}
            fontFamily={fonts.JetBrainsMonoBold}>
            {t("screens.booking.title")}
          </Text>
        </View>

        <View flex={1}>
          <BookingMenuTabList
            appointments={appointments}
            isLoading={isLoading}
            removeLocalAppointment={removeLocalAppointment}
          />
        </View>
      </SafeAreaView>
    </LinearGradientBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
})

export default BookingTemplate
